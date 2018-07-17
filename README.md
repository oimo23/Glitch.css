## Overview
Glitch.css adds glitch effect to your text.
This library need only pure css file, no js.

Currently, Work in progress.

## Usage
Download "glitch.css" and link in <link> tag.
or install via npm.

npm install glitch-css

<div class="glitch gl-1">
	<p data-text="InputYourText">InputYourText</p>
</div>

Make div section and add class "glitch".
And If you want to atatch gl-1 effect, add one more class "gl-1".

## Don't do this

<div class="glitch gl-1">
	<p data-text="InputYourText">InputYourText</p>
	<p data-text="InputYourText">InputYourText</p>	
</div>

## Do like this

<div class="glitch gl-1">
	<p data-text="InputYourText">InputYourText</p>
</div>
<div class="glitch gl-1">
	<p data-text="InputYourText">InputYourText</p>
</div>

## Browser sopport

Almost of all modern browser without "IE/EDGE".
When you using IE/EDGE browser, nothing happen.