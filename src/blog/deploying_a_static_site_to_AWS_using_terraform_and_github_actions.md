---
title: Deploying a Static Site to AWS using Terraform and Github Actions
author: Sean McLeaish
description: "How to deploy a static site using repeatable, version-controlled infrastructure as code (IaC), stay within Amazon Web Services’ free tier, and leverage global caching with Amazon CloudFront."
image:
  url: "../assets/aws-tf-gh.png"
  alt: "The AWS, Terraform, and GitHub actions logos on a green to orange gradient arc."
pubDate: 2025-9-29
tags: ["github actions", "terraform", "aws", "devops", "IaC"]
---

<br/>

### Why to use Terraform

[Terraform](https://developer.hashicorp.com/terraform) is an infrastructure as code (IaC) tool for managing your cloud resources.
You write Hashicorp Configuration Language files to describe a state that your infrastructure should exist in.

For example:
* I want one AWS s3 bucket
* One domain registered through Amazon Route 53
* A AWS CloudFront distribution that caches my s3 bucket and exposes it to the internet

You write *declarative code*, meaning it describes the end-state, and Terraform will try to run in the background and execute that state.
That's different from *imperative* code, where you describe a series of steps to get to the end-state (think a bash script.) Terraform will store a
state file, and when you make changes and run `terraform plan` Terraform will check your declared end-state against the state as it currently
exists in your state file, and let you know what all changes are going to be made when you run `terraform apply`.

There's a bit of a learning curve! It's led to a bit of a stereotype that Terraform can take a little struggle to get going,
but once you do, it's easy to keep running and maintain. I'm going to walk through the infrastructure that backs this site, which allows me to automate updates
when I push commits to the main branch of the blog's repository.

### Managing the Terraform state

To use Github Actions to push 
```hcl
resource "aws_iam_openid_connect_provider" "github" {
  url = "https://token.actions.githubusercontent.com"

  client_id_list = [
    "sts.amazonaws.com"
  ]

  thumbprint_list = [
    "6938fd4d98bab03faadb97b34396831e3780aea1"
  ]
  tags = {
    Name = "GitHub-Actions-OIDC-Provider"
  }
}
```
```hcl
resource "aws_iam_role" "github_actions" {
  name = "github-actions-deploy"

  assume_role_policy = jsonencode({
    Version = "2012-10-17",
    Statement = [
      {
        Effect = "Allow",
        Principal = {
          Federated = aws_iam_openid_connect_provider.github.arn
        },
        Action = "sts:AssumeRoleWithWebIdentity",
        Condition = {
          StringEquals = {
            "token.actions.githubusercontent.com:sub" = "repo:SMcLeaish/astro-blog:ref:refs/heads/main",
            "token.actions.githubusercontent.com:aud": "sts.amazonaws.com"
          }
        }
      }
    ]
  })
}
```
```hcl
data "aws_iam_policy_document" "github_actions_policy" {
  statement {
    actions = [
      "s3:PutObject",
      "s3:PutObjectAcl",
      "s3:DeleteObject",
      "s3:ListBucket"
    ]

    resources = [
      "arn:aws:s3:::${local.seanmcleaish_bucket}",         
      "arn:aws:s3:::${local.seanmcleaish_bucket}/*"       
    ]
  }
  statement {
    sid = "CloudFrontInvalidationAccess"
    actions = [
      "cloudfront:CreateInvalidation",
      "cloudfront:GetInvalidation"
    ]

    resources = [
      module.cdn.cloudfront_distribution_arn
    ]
  }
}
```
```hcl
resource "aws_iam_policy" "github_actions_policy" {
  name   = "github-actions-policy"
  policy = data.aws_iam_policy_document.github_actions_policy.json
}

resource "aws_iam_role_policy_attachment" "attach_github_actions_policy" {
  role       = aws_iam_role.github_actions.name
  policy_arn = aws_iam_policy.github_actions_policy.arn
}

output "github_actions_role_arn" {
  value = aws_iam_role.github_actions.arn
}
```
