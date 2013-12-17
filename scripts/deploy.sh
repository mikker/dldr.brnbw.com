#!/bin/sh -x
DIR="w/apps/dldr.brnbw.com/current"
UPDATE="git pull"
BUNDLE="zsh --login -c 'bundle --deployment'"
RESTART="touch tmp/restart.txt"
ssh brnbw.com "cd $DIR && $UPDATE && $BUNDLE && $RESTART"
