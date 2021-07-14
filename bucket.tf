resource "aws_s3_bucket" "demobucket" {
  bucket = var.s3bcuket
  acl = "public-read"

  versioning {
    enabled = true
  }
  website {
    index_document = "index.html"
  }

  policy = jsonencode({
       "Id" : "Policy1626177586878",
    "Version" : "2012-10-17",
    "Statement" : [
      {
        "Sid" : "Stmt1626177585820",
        "Action" : [
          "s3:GetObject"
        ],
        "Effect" : "Allow",
        "Resource" : "arn:aws:s3:::${var.s3bcuket}/*",
        "Principal" : "*"
      }
    ]
  })

  provisioner "local-exec" {
    command = "aws s3 cp App50/. s3://${var.s3bcuket} --recursive" 
  }
}