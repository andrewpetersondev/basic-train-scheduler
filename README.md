# basic-train-scheduler

## Overview

This is a train schedule application that incorporates Firebase to host arrival and departure data. The app will retrieve and manipulate this information with Moment.js. This website will provide up-to-date information about various trains, namely their arrival times and how many minutes remain until they arrive at their station.

## Instructions

### Make sure that your app suits this basic spec:

1. When adding trains, administrators should be able to submit the following:
    1. Train Name
    1. Destination
    1. First Train Time -- in military time
    1. Frequency -- in minutes

1. Code this app to calculate when the next train will arrive; this should be relative to the current time.

1. Users from many different machines must be able to view same train times.

1. Styling and theme are completely up to you. Get Creative!

## Bonus

1. Consider updating your "minutes to arrival" and "next train time" text once every minute. This is significantly more challenging; only attempt this if you've completed the actual activity and committed it somewhere on GitHub for safekeeping (and maybe create a second GitHub repo).

1. Try adding update and remove buttons for each train. Let the user edit the row's elements-- allow them to change a train's Name, Destination and Arrival Time (and then, by relation, minutes to arrival).

1. As a final challenge, make it so that only users who log into the site with their Google or GitHub accounts can use your site. You'll need to read up on Firebase authentication for this bonus exercise.
