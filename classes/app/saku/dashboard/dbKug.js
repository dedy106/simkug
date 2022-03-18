/***********************************************************************************************
*	Copyright (c) 2008 SAI, PT and Salltanera Teknologi, PT   and Others 		
*	 All rights reserved. This program and the accompanying materials
*	 are made available under the terms of the Common Public License v1.0
*	 which accompanies this distribution, and is available at												
*	Contributors 
* 			SAI, PT											
***********************************************************************************************/
window.GUI_dashboard_dbKug = function(owner)
{
    if (owner)
    {
		try{
			this.className = "GUI_dashboard_dbKug";
	        window.GUI_dashboard_dbKug.prototype.parent.constructor.call(this, owner);        
	        this.setWidth(500);
	        this.setHeight(425);
			this.setLeft(page.screenWidth / 2 - 250);			
			this.setCaption("roojaXIDE");
			this.onClose.set(this,"doClose");
			
			uses("controls_pageControl;controls_childPage");
			this.pControl = new controls_pageControl(this);
		  this.pControl.setBGColor(page.getConfig("form.color"));
		  this.pControl.setTop(0);
		  this.pControl.setWidth(this.width);
		  this.pControl.setHeight(this.height);
		  this.pControl.setLeft(0);
				
		  this.page1 = new controls_childPage(this.pControl);
		  this.page1.setCaption("Deposito");
			
			this.page2 = new controls_childPage(this.pControl);
		    this.page2.setCaption("Test");
	  
			this.app._mainForm.childFormConfig(this, "mainButtonClick","Dashboard Keuangan", 0);	
			uses("controls_frame",true);
			this.fr1 = new controls_frame(this.page1);			
			this.fr1.setLeft(10);
	        this.fr1.setTop(30);
	        this.fr1.setWidth(this.width / 2 - 30);
	        this.fr1.setHeight(this.height - 80);	        
			this.fr1.onAfterResize.set(this,"frameAfterResize");
			this.fr1.setTitle("Laporan Neraca");
			
			uses("controls_chart",true);
	        this.fr1.chart = new controls_chart(this.fr1);
	        this.fr1.chart.setLeft(5);
	        this.fr1.chart.setTop(0);
	        this.fr1.chart.setWidth(this.fr1.width-10);
	        this.fr1.chart.setHeight(this.fr1.height-35);
	        this.fr1.chart.setRightPadding(0);
			this.fr1.chart.setChartType(2);
			this.fr1.chart.setShowBorder(false);
			
			this.fr1.chart.setTitle("");
			minVal = 999999;
			maxVal = -999999;	
			var result = new controls_arrayMap();
			var serie = new controls_arrayMap();
			serie.set("01","100");
			serie.set("02","478");
			serie.set("03","1000");
			serie.set("04","400");
			serie.set("05","600");
			result.set("Kas",serie);
			serie = new controls_arrayMap();
			serie.set("01","800");
			serie.set("02","750");
			serie.set("03","950");
			serie.set("04","550");
			serie.set("05","200");
			result.set("Bank",serie);
			if (result instanceof controls_arrayMap)
			{
				var serie;
				
				for (var i in result.objList)
				{
					serie = result.objList[i];
					
					for (var j in serie.objList)
					{                        
						if (serie.objList[j] != 0)
						{
							if (serie.objList[j] < minVal)
								minVal = parseInt(serie.objList[j], 10);
							
							if (serie.objList[j] > maxVal)
								maxVal = parseInt(serie.objList[j], 10);
						
							val = serie.objList[j];
						}
						else
							val = undefined;
						this.fr1.chart.addSerieData(i, j, val);
					}
				}
			}
			
			if (minVal != 0)
				this.fr1.chart.setMinValue(0);
			else
				this.fr1.chart.setMinValue(0);				
			this.fr1.chart.setMaxValue(maxVal + 1);			
			this.fr1.chart.update();	
			
			this.fr2 = new controls_frame(this.page1);			
			this.fr2.setLeft(this.width / 2 - 10);
	        this.fr2.setTop(30);
	        this.fr2.setWidth(this.width / 2 - 30);
	        this.fr2.setHeight(this.height - 80);	        
			this.fr2.onAfterResize.set(this,"frameAfterResize");
			
			this.fr2.chart = new controls_chart(this.fr2);
	        this.fr2.chart.setLeft(5);
	        this.fr2.chart.setTop(0);
	        this.fr2.chart.setWidth(this.fr2.width - 10);
	        this.fr2.chart.setHeight(this.fr2.height - 35);
	        this.fr2.chart.setRightPadding(0);
			this.fr2.chart.setChartType(3);
			this.fr2.chart.setShowBorder(false);
			
			this.fr2.chart.setTitle("");
			minVal = 999999;
			maxVal = -999999;	
			var result = new controls_arrayMap();
			var serie = new controls_arrayMap();
			serie.set("01",100);
			serie.set("02",40);
			serie.set("03",79);
			serie.set("04",60);
			serie.set("05",89);
			result.set("Kas",serie);			
			if (result instanceof controls_arrayMap)
			{
				var serie;
				
				for (var i in result.objList)
				{
					serie = result.objList[i];
					
					for (var j in serie.objList)
					{                        
						if (serie.objList[j] != 0)
						{
							if (serie.objList[j] < minVal)
								minVal = parseInt(serie.objList[j], 10);
							
							if (serie.objList[j] > maxVal)
								maxVal = parseInt(serie.objList[j], 10);
						
							val = serie.objList[j];
						}
						else
							val = undefined;
						this.fr2.chart.addSerieData(i, j, val);
					}
				}
			}
			
			if (minVal != 0)
				this.fr2.chart.setMinValue(0);
			else
				this.fr2.chart.setMinValue(0);				
			this.fr2.chart.setMaxValue(maxVal + 1);			
			this.fr2.chart.update();				
			
			this.fr3 = new controls_frame(this.page1);			
			this.fr3.setLeft(10);
	        this.fr3.setTop(30);
	        this.fr3.setWidth(this.width / 2 - 30);
	        this.fr3.setHeight(this.height - 80);	        
			this.fr3.onAfterResize.set(this,"frameAfterResize");
			this.fr3.setTitle("Laporan Neraca");					
			
	        this.fr3.chart = new controls_chart(this.fr3);
	        this.fr3.chart.setLeft(5);
	        this.fr3.chart.setTop(0);
	        this.fr3.chart.setWidth(this.fr1.width-10);
	        this.fr3.chart.setHeight(this.fr1.height-35);
	        this.fr3.chart.setRightPadding(0);
			this.fr3.chart.setChartType(1);
			this.fr3.chart.setShowBorder(false);
			
			this.fr3.chart.setTitle("");
			minVal = 999999;
			maxVal = -999999;	
			var result = new controls_arrayMap();
			var serie = new controls_arrayMap();
			serie.set("01","100");
			serie.set("02","478");
			serie.set("03","1000");
			serie.set("04","400");
			serie.set("05","600");
			result.set("Kas",serie);
			serie = new controls_arrayMap();
			serie.set("01","800");
			serie.set("02","750");
			serie.set("03","950");
			serie.set("04","550");
			serie.set("05","200");
			result.set("Bank",serie);
			if (result instanceof controls_arrayMap)
			{
				var serie;
				
				for (var i in result.objList)
				{
					serie = result.objList[i];
					
					for (var j in serie.objList)
					{                        
						if (serie.objList[j] != 0)
						{
							if (serie.objList[j] < minVal)
								minVal = parseInt(serie.objList[j], 10);
							
							if (serie.objList[j] > maxVal)
								maxVal = parseInt(serie.objList[j], 10);
						
							val = serie.objList[j];
						}
						else
							val = undefined;
						this.fr3.chart.addSerieData(i, j, val);
					}
				}
			}
			
			if (minVal != 0)
				this.fr3.chart.setMinValue(0);
			else
				this.fr3.chart.setMinValue(0);				
			this.fr3.chart.setMaxValue(maxVal + 1);			
			this.fr3.chart.update();	
			
			this.fr4 = new controls_frame(this.page1);			
			this.fr4.setLeft(10);
	        this.fr4.setTop(30);
	        this.fr4.setWidth(this.width / 2 - 30);
	        this.fr4.setHeight(this.height - 80);	        
			this.fr4.onAfterResize.set(this,"frameAfterResize");
			this.fr4.setTitle("Laporan Neraca");					
			
	        this.fr4.chart = new controls_chart(this.fr4);
	        this.fr4.chart.setLeft(5);
	        this.fr4.chart.setTop(0);
	        this.fr4.chart.setWidth(this.fr1.width-10);
	        this.fr4.chart.setHeight(this.fr1.height-35);
	        this.fr4.chart.setRightPadding(0);
			this.fr4.chart.setChartType(2);
			this.fr4.chart.setShowBorder(false);
			
			this.fr4.chart.setTitle("");
			minVal = 999999;
			maxVal = -999999;	
			var result = new controls_arrayMap();
			var serie = new controls_arrayMap();
			serie.set("01","900");
			serie.set("02","608");
			serie.set("03","500");
			serie.set("04","390");
			serie.set("05","200");
			result.set("Kas",serie);
			serie = new controls_arrayMap();
			serie.set("01","200");
			serie.set("02","750");
			serie.set("03","850");
			serie.set("04","350");
			serie.set("05","200");
			result.set("Bank",serie);
			if (result instanceof controls_arrayMap)
			{
				var serie;
				
				for (var i in result.objList)
				{
					serie = result.objList[i];
					
					for (var j in serie.objList)
					{                        
						if (serie.objList[j] != 0)
						{
							if (serie.objList[j] < minVal)
								minVal = parseInt(serie.objList[j], 10);
							
							if (serie.objList[j] > maxVal)
								maxVal = parseInt(serie.objList[j], 10);
						
							val = serie.objList[j];
						}
						else
							val = undefined;
						this.fr4.chart.addSerieData(i, j, val);
					}
				}
			}
			
			if (minVal != 0)
				this.fr4.chart.setMinValue(0);
			else
				this.fr4.chart.setMinValue(0);				
			this.fr4.chart.setMaxValue(maxVal + 1);			
			this.fr4.chart.update();	
			
			this.fr5 = new controls_frame(this.page1);			
			this.fr5.setLeft(10);
	        this.fr5.setTop(30);
	        this.fr5.setWidth(this.width / 2 - 30);
	        this.fr5.setHeight(this.height - 80);	        
			this.fr5.onAfterResize.set(this,"frameAfterResize");
			this.fr5.setTitle("Laporan Neraca");					
			
	        this.fr5.chart = new controls_chart(this.fr5);
	        this.fr5.chart.setLeft(5);
	        this.fr5.chart.setTop(0);
	        this.fr5.chart.setWidth(this.fr1.width-10);
	        this.fr5.chart.setHeight(this.fr1.height-35);
	        this.fr5.chart.setRightPadding(0);
			this.fr5.chart.setChartType(3);
			this.fr5.chart.setShowBorder(false);
			
			this.fr5.chart.setTitle("");
			minVal = 999999;
			maxVal = -999999;	
			var result = new controls_arrayMap();
			var serie = new controls_arrayMap();						
			serie.set("01",80);
			serie.set("02",75);
			serie.set("03",95);
			serie.set("04",55);
			serie.set("05",20);
			result.set("Bank",serie);
			if (result instanceof controls_arrayMap)
			{
				var serie;
				
				for (var i in result.objList)
				{
					serie = result.objList[i];
					
					for (var j in serie.objList)
					{                        
						if (serie.objList[j] != 0)
						{
							if (serie.objList[j] < minVal)
								minVal = parseInt(serie.objList[j], 10);
							
							if (serie.objList[j] > maxVal)
								maxVal = parseInt(serie.objList[j], 10);
						
							val = serie.objList[j];
						}
						else
							val = undefined;
						this.fr5.chart.addSerieData(i, j, val);
					}
				}
			}
			
			if (minVal != 0)
				this.fr5.chart.setMinValue(0);
			else
				this.fr5.chart.setMinValue(0);				
			this.fr5.chart.setMaxValue(maxVal + 1);			
			this.fr5.chart.update();	
			
			this.fr6 = new controls_frame(this.page1);			
			this.fr6.setLeft(10);
	        this.fr6.setTop(30);
	        this.fr6.setWidth(this.width / 2 - 30);
	        this.fr6.setHeight(this.height - 80);	        
			this.fr6.onAfterResize.set(this,"frameAfterResize");
			this.fr6.setTitle("Laporan Neraca");					
			
	        this.fr6.chart = new controls_chart(this.fr6);
	        this.fr6.chart.setLeft(5);
	        this.fr6.chart.setTop(0);
	        this.fr6.chart.setWidth(this.fr1.width-10);
	        this.fr6.chart.setHeight(this.fr1.height-35);
	        this.fr6.chart.setRightPadding(0);
			this.fr6.chart.setChartType(2);
			this.fr6.chart.setShowBorder(false);
			
			this.fr6.chart.setTitle("");
			minVal = 999999;
			maxVal = -999999;	
			var result = new controls_arrayMap();
			var serie = new controls_arrayMap();
			serie.set("01","100");
			serie.set("02","478");
			serie.set("03","1000");
			serie.set("04","400");
			serie.set("05","600");
			result.set("Kas",serie);
			serie = new controls_arrayMap();
			serie.set("01","800");
			serie.set("02","750");
			serie.set("03","950");
			serie.set("04","550");
			serie.set("05","200");
			result.set("Bank",serie);
			if (result instanceof controls_arrayMap)
			{
				var serie;
				
				for (var i in result.objList)
				{
					serie = result.objList[i];
					
					for (var j in serie.objList)
					{                        
						if (serie.objList[j] != 0)
						{
							if (serie.objList[j] < minVal)
								minVal = parseInt(serie.objList[j], 10);
							
							if (serie.objList[j] > maxVal)
								maxVal = parseInt(serie.objList[j], 10);
						
							val = serie.objList[j];
						}
						else
							val = undefined;
						this.fr6.chart.addSerieData(i, j, val);
					}
				}
			}
			
			if (minVal != 0)
				this.fr6.chart.setMinValue(0);
			else
				this.fr6.chart.setMinValue(0);				
			this.fr6.chart.setMaxValue(maxVal + 1);			
			this.fr6.chart.update();	
			
			this.frameCount = 6;
			this.frameHeight = (this.frameCount > 2 ? this.height / 2 - 40: this.height - 80);
		}catch(e){				
			this.app.alert(e,"");
		}
    }
}

window.GUI_dashboard_dbKug.extend(window.controls_childForm);

//----------------------------- Function ---------------------------------------
window.GUI_dashboard_dbKug.prototype.doAfterResize = function(width, height)
{	
	try{
		this.frameHeight = (this.frameCount > 2 ? height / 2 - 50: height - 80);
		if (this.frameCount <= 4)
			this.frameWidth = width / 2 - 30;
		else this.frameWidth = width / 3 - 30;
		this.setTop(55);
		this.setHeight(height + 40);
		this.pControl.setWidth(this.width);
		this.pControl.setHeight(this.height-50);
		this.rearrange();
	}catch(e){
		alert(e);
	}
}
window.GUI_dashboard_dbKug.prototype.rearrange = function()
{
	var c,count = 0;left = 10;
	var top = 30;
	for (var i in this.page1.childs.objList){
		c = page.getResource(i);			
		if (c instanceof controls_frame){
			count++;
			if (this.frameCount > 2 && count == this.frameCount / 2 && c.isMinimize) 
				left = 0;
			if (this.frameCount > 2){
				if (count > 2 && this.frameCount <= 4){ 
					top = this.height / 2 - 5;			
					if (count == 3) left = 10;
				}else if (count > 3 && this.frameCount > 4) {
					top = this.height / 2 - 5;											
					if (count == 4) left = 10;
				}
			}			
			if (c.isMinimize) c.setTop(this.height - 50); else c.setTop(top);	
			c.setLeft(left);			
			c.setHeight(this.frameHeight);
			c.setWidth(this.frameWidth);
			left += c.width + 20;									
		}
	}			
}
window.GUI_dashboard_dbKug.prototype.doMenuClick = function(sender)
{	

}
window.GUI_dashboard_dbKug.prototype.doModalResult = function(sender, modalResult)
{
	if (modalResult == mrOk){		
	}
}
window.GUI_dashboard_dbKug.prototype.doRequestReady = function(sender, methodName, result)
{	
	if (sender == this.fileExc){
		switch(methodName){
			case "getProperties": 			
				this.properties.setInfo(result);
				break;
		}
	}
}
window.GUI_dashboard_dbKug.prototype.doToolsClick = function(sender)
{
	if (sender == this.b1)
		this.rta.doTextFormat("forecolor","", sender.left, sender.top);	
	if (sender == this.b2)
			this.rta.getSelection();
	if (sender == this.b4)
		this.rta.getSelectContainer();
	if (sender == this.b3)
		this.rta.toggleMode();
	if (sender == this.b5)
		this.rta.setSelection();
	try{
		//alert(this.toXML());		
	}catch(e){
		alert(e);
	}
}
window.GUI_dashboard_dbKug.prototype.doKeyDown = function(sender, keyCode)
{	
	
}
window.GUI_dashboard_dbKug.prototype.doClose = function()
{	
	this.rta.disable();
}
window.GUI_dashboard_dbKug.prototype.frameAfterResize = function(sender, width, height)
{	
	if (sender.chart !== undefined){		
		sender.chart.setWidth(width-10);	
		sender.chart.setHeight(height-20);		
	}	
}