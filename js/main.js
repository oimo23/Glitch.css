$(document).ready(function(){
	$('select').formSelect();
});
     

/*-----------------------------------------------
// スマホではtouchend,PCではclickを取得するようにする    
-------------------------------------------------*/
let isTouchDevice = (('ontouchstart' in window) || window.DocumentTouch && document instanceof DocumentTouch);

//デバイス判定によるイベントの決定
let eventType = (isTouchDevice) ? 'touchend' : 'click';

/*-----------------------------------------------
// 低い音の準備
-------------------------------------------------*/
const context = new AudioContext();
const osc = context.createOscillator();
const gain = context.createGain();

// 音程
osc.frequency.value = 1200;
// 音量を0にしておく
gain.gain.value = 0;
// 設定を適用
osc.connect(gain).connect(context.destination);
// 裏で鳴らしておく
osc.start();

/*-----------------------------------------------
// 高い音の準備
-------------------------------------------------*/
const context2 = new AudioContext();
const osc2 = context2.createOscillator();
const gain2 = context2.createGain();

// 音程
osc2.frequency.value = 1400;
// 音量を0にしておく
gain2.gain.value = 0;
// 設定を適用
osc2.connect(gain2).connect(context2.destination);
// 裏で鳴らしておく
osc2.start();

// テンポ設定
let tempo = 120;

/*-----------------------------------------------
// 再生処理 
-------------------------------------------------*/
$('.play').on(eventType, function(){
	isPlaying = true;
	$('.play').hide();
	$('.stop').show();
	playOn(tempo);
});


/*-----------------------------------------------
// 停止処理   
-------------------------------------------------*/
$('.stop').on(eventType, function(){
	$('.stop').hide();
	$('.play').show();
	isPlaying = false;
	clearInterval(timer1);
	gain.gain.cancelScheduledValues(context.currentTime);
	gain2.gain.cancelScheduledValues(context.currentTime);
	$('.anime1 .frame1').hide();
	$('.anime1 .frame2').hide();
	$('.anime1 .frame0').show();
});

/*-----------------------------------------------
// テンポ操作
-------------------------------------------------*/
$('.tempo1_up').on(eventType, function(){
	tempo = tempo + 1;
	$('.tempo').text(tempo);
});

$('.tempo1_down').on(eventType, function(){
	tempo = tempo - 1;
	$('.tempo').text(tempo);
});

$('.tempo5_up').on(eventType, function(){
	tempo = tempo + 5;
	$('.tempo').text(tempo);
});

$('.tempo5_down').on(eventType, function(){
	tempo = tempo - 5;
	$('.tempo').text(tempo);
});

/*-----------------------------------------------
// クロックの設定
-------------------------------------------------*/
// Memorize AudioContext start time in DOMHighResTimeStamp
const base_time = performance.now() - context.currentTime * 1000;

// Function to return context's currentTime in DOMHighResTimeStamp
function current_time() {
  return base_time + context.currentTime * 1000;
}

// Function to convert DOMHighResTimeStamp to AudioContext currenTime
function timestamp_to_audioctx(timeStamp) {
  return (timeStamp - base_time) / 1000;
}

/*-----------------------------------------------
// スケジューリング
-------------------------------------------------*/
function playOn(tempo) {
	let count = 0;
	let silent_stock = 0;

	// The last scheduled click's time in DOMHighResTimeStamp
	let lastClickTimeStamp = performance.now();

	timer1 = setInterval(() => {
		let tick = 60 * 1000 / tempo;  // for tempo=120
		let silent_bar = $(".silent_select").val();

		console.log(tempo);

		const now = current_time();

	  	for (let nextClickTimeStamp = lastClickTimeStamp + tick;
	    	nextClickTimeStamp < now + 1500;
	    	nextClickTimeStamp += tick) {

	  		// 次回の発音時間
		   	const nextClickTime = timestamp_to_audioctx(nextClickTimeStamp);
		   	
		   	if ( silent_stock < ( silent_bar * 4 ) || silent_bar == 0 ) {

		  		//　小節の頭であれば高い音を鳴らす
		  		if ( count % 4 == 0 ) {	
					gain2.gain.setValueAtTime(1, nextClickTime);

					//　その後素早く(0.05秒で)音の減衰をさせる(ピーではなくピッという音にするため)
					gain2.gain.linearRampToValueAtTime(0, nextClickTime + 0.05);
		  		} else {		
					gain.gain.setValueAtTime(1, nextClickTime);

					//　その後素早く(0.05秒で)音の減衰をさせる(ピーではなくピッという音にするため)
					gain.gain.linearRampToValueAtTime(0, nextClickTime + 0.05);
				}

			}

	  		count = count + 1;
			silent_stock = silent_stock + 1;

	  		if ( silent_stock == ( silent_bar * 4 ) * 2 ) {	
	  			silent_stock = 0;
	  		}
	    	
	    	// 今鳴らし終えた地点を最後の発音として記録
	    	lastClickTimeStamp = nextClickTimeStamp;
	  }


	}, ( 60 * 1000 / tempo ) /2);
}
