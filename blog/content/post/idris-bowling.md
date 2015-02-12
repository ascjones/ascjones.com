+++
categories = []
date = "2015-02-10T22:41:42Z"
description = ""
tags = []
title = "Beginners' Bowling with Idris"
+++

Recently a group of us (led by the formidable [@ToJans](http://tojans.me/)) have been spending our Sunday evenings learning all about [Idris](http://www.idris-lang.org/) and dependent typing. Such is the rock 'n' roll lifestyle we lead. It all kicked off at the excellent [Build Stuff](http://buildstuff.lt/) last year during a hungover coding session in the hotel lobby. The [goal](http://tojans.me/blog/2014/11/27/about-dependent-typing-idris-and-the-road-to-valhalla/) is to get a dependently typed implementation of the [Bowling Kata](http://codingdojo.org/cgi-bin/index.pl?KataBowling) working in Idris in time for Build Stuff 2015.

## Taking a step back

After the first exercise, doing the '99 Bottles of Beer' Kata (Tom submitted his [solution](https://github.com/ToJans/idris101/blob/master/katas/001/tojans/99bottles.idr) to [Rosetta Code](http://rosettacode.org/wiki/99_Bottles_of_Beer#Idris)) we thought we knew enough to get cracking with the actual implementation...

But after getting a tied up in knots with the dependent typing, we thought it might be a good idea to step back a bit and get it working *without* the dependent types. I don't know me much Haskell (Idris has similar syntax), so it was good to take a minute and actually get to grips with the basic language constructs before getting to the advanced stuff.

Here's my implementation of the bowling kata with plain old Ints and Lists but none of the dependent typing goodness:

```
scoreGame : List Int -> Int
scoreGame xs = score xs where
  score : List Int -> Int
  score []                =   0
  score (x::y::[])        =   x + y
  score (x::y::z::[])     =   x + y + z
  score (x::y::z::xs)     =
    if x == 10 then           x + y + z + (score (y::z::xs))
    else if x + y == 10 then  x + y + z + (score (z::xs))
    else                      x + y +     (score (z::xs))
```
So for my sake, and others to whom this syntax is entirely new:
```
scoreGame : List Int -> Int
```
Define a function `scoreGame` that takes a `List` of `Int` as an argument (the number of pins knocked down per roll) and returns an `Int` (the total score for the rolls).
```
scoreGame xs = score xs where
```
Matches the first argument with a label `xs` and applies it to the recursive inner function `score` (defined inline using the `where` keyword).
```
score : List Int -> Int
```
Type signature for the definition of the *local* recursive function that will calculate the score for each frame. It takes the rolls as a list of Ints and returns an Int which is the total score for the current frame plus the rest of the game.
```
score [] = 0
```
Pattern match for the end condition: an empty list so no more rolls to score.
```
score (x::y::[])        =   x + y
score (x::y::z::[])     =   x + y + z
```
Here we deal with the final frame which can consist of either 2 or 3 rolls. In either case we just return the sum of the total pins knocked down in each of the final throws.
```
score (x::y::z::xs) f   =
```
Matches a sequence of 3 rolls for any frame but the final one (which was matched in the previous pattern), assigning the values of the rolls into the `x`, `y` and `z` labels, and `xs` for the remaining rolls after that.
```
if x == 10 then x + y + z + (score (y::z::xs))
```
This is a strike, so we take the subsequent 2 rolls as bonuses and add them to the 10 pins from the strike to get the score for this frame. Now we recurse to score the rest of the game including the two bonus rolls `y::z::xs`.
```
else if x + y == 10 then  x + y + z + (score (z::xs)
```
This is a spare, so we take the next roll as a bonus and add it to the 10 pins knocked down for the spare to get the score for this frame. Again we recurse including the next roll to score the remaining frames.
```
else x + y + (score (z::xs))
```
Here we didn't manage to knock down all the pins so our score is just the total pins we knocked down in the 2 throws, and again we add that to the recursive score for the remaining frames.

And there we have it! I tested 3 cases:

```
-- 300 : Int
perfect : Int
perfect = scoreGame [10,10,10,10,10,10,10,10,10,10,10,10]

-- 90 : Int
nines : Int
nines = scoreGame [9,0,9,0,9,0,9,0,9,0,9,0,9,0,9,0,9,0,9,0]

-- 150 : Int
spares : Int
spares = scoreGame [5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5]
```

## Next steps

So obviously this is nothing ground-breaking, this is easy enough in other languages. But now I'm started to get the hang of the syntax I can hopefully move forwards a bit faster.

The next step is to start to use Idris' dependent typing to make illegal states unrepresentable. So: 

- Exactly 10 frames in a game
- A maximum of 10 total pins for 2 rolls within a frame.

*I actually went bowling today, and for the first time ever actually understood the scoring system! Didn't help my game though.*

