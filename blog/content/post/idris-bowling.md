+++
categories = []
date = "2015-02-10T22:41:42Z"
description = ""
draft = true
tags = []
title = "Beginners' Bowling with Idris"
+++

Recently a group of us (led by the formidable [@ToJans](http://tojans.me/)) have been spending our Sunday evenings learning all about [Idris](http://www.idris-lang.org/) and dependent typing. Such is the rock 'n' roll lifestyle we lead. It all kicked off at the excellent [Build Stuff](http://buildstuff.lt/) last year during a hungover coding session in the hotel lobby. The goal is to get a dependently typed implementation of the [Bowling Kata](http://codingdojo.org/cgi-bin/index.pl?KataBowling) working in Idris in time for Build Stuff 2015.

## Taking a step back

After the first exercise, doing the '99 Bottles of Beer' Kata (Tom submitted his [solution](https://github.com/ToJans/idris101/blob/master/katas/001/tojans/99bottles.idr) to [Rosetta Code](http://rosettacode.org/wiki/99_Bottles_of_Beer#Idris)) we thought we knew enough to get cracking with the actual implementation...

But after getting a tied up in knots with the dependent typing, we thought it might be a good idea to step back a bit and get it working *without* the dependent types. I don't know me much Haskell (Idris has similar syntax), so it was good to take a minute and actually get to grips with the basic language constructs before getting to the advanced stuff.

Here's my implementation of the bowling kata with plain old Ints and Lists and none of the dependent typing goodness.

```
scoreGame : List Int -> Int
scoreGame xs = score xs 0 where
  score : List Int -> Int -> Int
  score _             10  =   0
  score (x::y::z::xs) f   =
    if x == 10 then           x + y + z + (score (x::y::xs) (f + 1))
    else if x + y == 10 then  x + y + z + (score (z::xs)    (f + 1))
    else                      x + y +     (score (z::xs)    (f + 1))
  score (x::y::xs) f      =   x + y +     (score xs         (f + 1))
```
