# CPE 490: Traceroute Visualization Final Project 

![](https://img.shields.io/badge/Release-V1.1-blue.svg) <br>

## Description 
Traceroute is a utility that records the route (specific gateway computers at each hop) through the internet between your computer and a specified destination computer. In addition, it also calculates and displays the amount of time each hop took. This is a useful tool to understand internet network and any network connectivity issues.<br>

 The command to see the route a packet takes is traceroute [website]. This returns a table in the terminal showing the IP addresses of the router and three values of round-trip delay time (RTT). While it is interesting to see where the packet hops to and the corresponding RTT to those routers, it is difficult for the user to see, in a visual sense, where the packets are hopping to. This project attempts to give users a better insight on traceroutes to several websites. <br>


## Requirements
- HTML, CSS, JS
- D3.js library
- Google Maps API Credentials <br> 

## Bugs and Limitations 
1. Cap of 5000 calls to google maps every day. Please do not exceed this amount. <br> 

## Authors 
[Amanda Ly](https://github.com/amandal3) <br>
[Chloe Quinto](https://github.com/chloequinto)  <br>


## Description 
Traceroute is a utility that records the route (specific gateway computers at each hop) through the internet between your computer and a specified destination computer. <br>

While it's interesting to see how many hops a packet takes and its location, it is difficult to see, in a visual sense, where the packets are hopping. <br>

The purpose of this project is to generate a nice visualization of how indirect packet routes can. This visualization will then be further analyzed in terms of packet locations and RTT.  <br>
