---
title: Deploying a Static Site to AWS using Terraform and Github Actions
author: Sean McLeaish
description: "How to deploy a static site using repeatable, version-controlled infrastructure as code (IaC), stay within Amazon Web Services’ free tier, and leverage global caching with Amazon CloudFront."
image:
  url: "../assets/aws-tf-gh.png"
  alt: "The AWS, Terraform, and GitHub actions logos on a green to orange gradient arc."
pubDate: 2025-08-25
tags: ["github actions", "terraform", "aws", "devops", "IaC"]
---

<br/>

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
