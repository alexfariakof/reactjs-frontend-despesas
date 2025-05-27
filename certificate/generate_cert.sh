#!/bin/bash

openssl req -new -newkey rsa:2048 -days 365 -nodes -x509 -keyout ssl_certificate.key -out ssl_certificate.crt -config openssl.cnf
