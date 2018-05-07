# Optimal-Art
Code to answer an optimisation challenge on _primers.xyz_

## What is the challenge ?

The problem is actually pretty simple to understand, but as many of the simplest problems, it is really hard to give an answer.
You are given a black and white image, how can you efficiently draw it with a minimum number of operation ?

You have access to 2 operations :
- `FILL, x, y, c` => this operation will draw a square of size c with its top left corner pixel at (x, y)
- `ERASE, x, y` => this operation will erase a pixel at (x, y)

The top left corner pixel of the image is (0, 0).

Here is the picture the challenge is using:
![Alan Turing](http://primers.xyz/problems/0/turing.bmp)

To make it even simpler the challenge's website provides a text file as input.
The first line contains the dimension of the picture `800,600`, and the others lines are the image itself.

The symbols '*' indicates a white pixel and '#' is a black one.

Knowing all of this you "just" have to read the file and output an new file with all the operations you would use 
to re-create the image (one by line).

Here is a link to the challenge (*in French*): http://primers.xyz/0

## What did I do ?

I have attempted twice at this challenge so far (with more or less success) and here is a quick presentation of what I did.
Keep in mind that there is exactly 84,784 black pixels on the picture.

### Dichotomy

Dichotomy was actually my first thought, the idea behind is that I can reduce the size of the problem to something simpler.

I took in consideration the whole picture and then I asked myself : "Are all the pixel the same ?".
Obliviously the answer was no, so I split the picture into 4 sub-pictures. And I recursively asked the same question until I got
A sub square of the picture full of black pixel.

In doing so I ended up with squares of sizes : 1, 2, 4, 8, 16, and 32 pixel (powers of 2).

This solution allowed me to get this :
![Dichotomy](http://primers.xyz/problems/0/img/343258991124717361524089387826.png)

This is a 10,585 operations solution. Definitely not the best but it works, beside there is originally 84,784 pixels 
so it is approximately 8 times better !

### Greedy Squares

The principe behind a greedy algorithm is that by taking the optimum choice at each step of the process you are more
Likely to get an optimum solution at the end of the day.
This of course hardly outputs _the best solution_ but it can still be very good to get a great solution without too much work.

The principle here is pretty straightforward : find the biggest square on the picture and save it, 
then erase it from the picture and go look for the second biggest...

This returns a better solution than Dichotomy but also takes a little bit longer (you have to check the whole picture at each step for the squares).

Here is what I got:
![Greedy Squares](http://primers.xyz/problems/0/img/5214209496802891525707146705.png)

This time this is a 6,861 operations solution ! So it is about 12 times better than drawing the pixels one by one !

## What's next ?

Well I hope my work can help few in their struggle, or inspire some to solve other challenges (or even to try this one !).
I will post my updates and breakthroughs here when I will get some.
