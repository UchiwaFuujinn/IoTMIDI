/*
window.onload=function(){
	runTest2();
	var hoge = setInterval(function() {
	    //wait webmidi start
		if (inputs != null) {
			setInputMenuID(document.input_device_select.ids);
			setOutputMenuID(document.output_device_select.ids);
			if(input_menu_id!=null){ setInputDeviceSelect();
				input.onmidimessage = handleMIDIMessage3;
			}
			if(output_menu_id!=null) setOutputDeviceSelect();
			clearInterval(hoge);

		}
	}, 200);
}
*/

var mlognum=0;
var ColumnNum=80;
var stoplog=1;

//add for Page 18, MIDI message monitor
function makeMassage( event ) {
	var i,k;
	str=null;

	if(stoplog.value==0) return;

	if( event.data[0] ==0xFE ) return;

	if( event.data[0] ==0xF0 ){
		if( event.data[1] !=0x00 && event.data[2] !=0x40 && event.data[3] !=0x02 ) return; 

		if( event.data[5] ==0x01 ){
			str = "";
			for(i=6,k=0; i<event.data.length-1; i++, k++){
				str += String.fromCharCode(event.data[i]);
			}
		}

		else if( event.data[5] ==0x02 ){
			str = "";
			var num = ((event.data[6]&0x01)<<7) + event.data[7];
			str += num.toString(16);
			str += "H";
			str += " ";

			if((event.data[6]&0x01) && (event.data[6]&0x10)){
				num-=256;
			}
			str += num.toString(10);
		}

		else if( event.data[5] ==0x03 ){
			str = "";
			var num = ((event.data[6]&0x03)<<14) + ((event.data[7]&0x7F)<<7) + event.data[8];

			str += num.toString(16);
			str += "H";
			str += " ";

			if((event.data[6]&0x02) && (event.data[6]&0x10)){
				num-=65536;
			}
			str += num.toString(10);
		}

		else if( event.data[5] ==0x04 ){
			str = "";
			var num = ((event.data[6]&0x0F)<<28) 
				+ ((event.data[7]&0x7F)<<21)
				+ ((event.data[8]&0x7F)<<14)
				+ ((event.data[9]&0x7F)<<7)
				+ event.data[10];

			var numb=(num&0xFFFFFFFF) >>> 0;
			str += numb.toString(16);
			str += "H";
			str += " ";

			if(!((event.data[6]&0x08) && (event.data[6]&0x10))){
				str += numb.toString(10);
			} else {
				str += num.toString(10);
			}
		}

		else if( event.data[5] ==0x05 ){
			str = "";
			var num = ((event.data[6]&0x0F)<<28) 
				+ ((event.data[7]&0x7F)<<21)
				+ ((event.data[8]&0x7F)<<14)
				+ ((event.data[9]&0x7F)<<7)
				+ event.data[10];

			var numb=(num&0xFFFFFFFF) >>> 0;
			var value =1.+(numb&0x007FFFFF)/0x00800000;
			var exp=(numb&0x7F800000)>>23;
			var p=Math.pow(2.,exp-127);
			value = value*p;

			var aa=Math.floor(value);
			var bb=Math.floor((value-aa)*10000);

			if(num&0x80000000) aa=-aa;

			str += aa.toString(10);
			str+=".";
			str += bb.toString(10);
		}
	}
	return str;
}

function inputDeviceSelect3(e)
{
	inputDeviceSelect(e);
	input.onmidimessage = handleMIDIMessage3;
}
