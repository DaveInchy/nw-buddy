#!/bin/bash
sudo rm -rf ./*/**.LIST \
&& sudo rm -rf ./*/**.CACHE \
&& sudo rm -rf ./*/**.JS \
&& sudo rm -rf ./*/**.2D;
exit $?;