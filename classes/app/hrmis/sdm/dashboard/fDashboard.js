/***********************************************************************************************
*	Copyright (c) 2008 SAI, PT and Salltanera Teknologi, PT   and Others 		
*	 All rights reserved. This program and the accompanying materials
*	 are made available under the terms of the Common Public License v1.0
*	 which accompanies this distribution, and is available at												
*	Contributors 
* 			SAI, PT											
***********************************************************************************************/
window.app_hrmis_sdm_dashboard_fDashboard = function(owner,options)
{
    if (owner)
    {
		try{
	        window.app_hrmis_sdm_dashboard_fDashboard.prototype.parent.constructor.call(this, owner,options);        
            this.className = "app_hrmis_sdm_dashboard_fDashboard";
            this.setCaption("Dashboard");
			this.onClose.set(this,"doClose");		
			this.maximize();			
			this.app._mainForm.childFormConfig(this, "mainButtonClick","Dashboard", 99);	
			uses("portalui_tabPage;portalui_childPage;portalui_roundPanel;portalui_chart;portalui_saiTable;portalui_flashChart;portalui_timer");
			this.dbLib = new util_dbLib();
			this.dbLib.addListener(this);
			this.tab = new portalui_tabPage(this,{bound:[0,0,this.width - 4, this.height - 20],borderColor:"#35aedb", tabChange:[this,"doTabChange"]});			
			this.tab.actClr = "#299fcb";this.tab.deactClr = "#35aedb";	        
			this.tab.setHeaderHeight(30);
			this.tab.addPage(["Pribadi","Riwayat","Lokasi"]); 
			this.tab.roundedHeader(8);
			this.initComp();		
            this.timer = new portalui_timer(this);
            this.timer.setInterval(1000);
            this.timer.setEnabled(false);
            this.timer.onTimer.set(this,"doTimer");
			this.app._mainForm.pButton.hide();
		}catch(e){
			this.app.alert(e,"");
		}
    }
};
window.app_hrmis_sdm_dashboard_fDashboard.extend(window.portalui_childForm);
window.app_hrmis_sdm_dashboard_fDashboard.implement({
    doClose: function(sender){
        this.app._mainForm.pButton.show();
		if (this.trail1 !== undefined) this.trail1.close();		
    },	
	doAfterResize: function(width, height){
		this.setTop(55);
		this.setHeight(height + 24);
	},
	mainButtonClick: function(sender){				
		if (sender == this.app._mainForm.bBack){			
			if (this.trail1 && this.trail1.visible && this.trail1.trail2 && this.trail1.trail2.visible){
				this.trail1.trail2.hide();
				this.trail1.unblock();
			}else if (this.trail1 && this.trail1.visible){
				this.trail1.hide();
				this.unblock();
			}
		}
	},
	initComp: function(tab){
		try{
		        var sql = new server_util_arrayList();
				sql.add(this.getSQL("Pribadi","umur"));
				sql.add(this.getSQL("Pribadi","mk"));
				sql.add(this.getSQL("Pribadi","agama"));
				sql.add(this.getSQL("Pribadi","status"));
				sql.add(this.getSQL("Pribadi","pendidikan"));
				sql.add(this.getSQL("Riwayat","status"));
				sql.add(this.getSQL("Riwayat","bantuan"));
				sql.add(this.getSQL("Riwayat","jabs"));
				sql.add(this.getSQL("Riwayat","jabf"));
				sql.add(this.getSQL("Riwayat","profesi"));
				sql.add(this.getSQL("Lokasi","lokasi"));
				sql.add(this.getSQL("Lokasi","unit"));
				this.dbLib.getMultiDataProviderA(sql);					            
				this.sql = sql;
		}catch(e){
			this.app.alert(e,"");
		}
	},
	doRequestReady: function(sender, methodName, result){
	   if (sender == this.dbLib){
	       try{
    	       switch(methodName){
    	           case "getMultiDataProvider":
    	               eval("var data = "+result+";");
    	               if (typeof data != "string"){
    	                    var frameWidth = this.width / 3 - 30;
							var frameHeight = this.tab.childPage[0].getClientHeight() / 2 - 20;
	                        this.count = 0;
            				this.fr1 = new portalui_roundPanel(this.tab.childPage[0],{bound:[10,10,frameWidth,frameHeight],caption:"Umur",background:"image/themes/dynpro/bluegradient.png",color:"#edf5f8",titleBg:"#95cae8"});									
            		        this.fr1.chart = new portalui_flashChart(this.fr1,{bound:[5,0,this.fr1.getClientWidth() - 30,frameHeight - 45],objectReady:[this,"doObjectReady"]});		         	                        
							this.fr1.chart.data = data.result[0];														
            		        this.fr2 = new portalui_roundPanel(this.tab.childPage[0],{bound:[this.fr1.left+this.fr1.width + 15,10,frameWidth,frameHeight],caption:"Masa Kerja",color:"#edf5f8",titleBg:"#95cae8",background:"image/themes/dynpro/bluegradient.png"});
            				this.fr2.chart = new portalui_flashChart(this.fr2,{bound:[5,0,this.fr2.getClientWidth() - 30,frameHeight - 45],objectReady:[this,"doObjectReady"]});  
							this.fr2.chart.data = data.result[1];
                            this.fr3 = new portalui_roundPanel(this.tab.childPage[0],{bound:[this.fr2.left+this.fr2.width + 15,10,frameWidth,frameHeight],caption:"Agama",color:"#edf5f8",titleBg:"#95cae8",background:"image/themes/dynpro/bluegradient.png"});			
            				this.fr3.chart = new portalui_flashChart(this.fr3,{bound:[5,0,this.fr3.getClientWidth() - 30,frameHeight - 45],objectReady:[this,"doObjectReady"]});		        
							this.fr3.chart.data = data.result[2];
							this.fr4 = new portalui_roundPanel(this.tab.childPage[0],{bound:[10,this.fr1.height+20,frameWidth,frameHeight],caption:"Status Kawin",color:"#edf5f8",titleBg:"#95cae8",background:"image/themes/dynpro/bluegradient.png"});			
            				this.fr4.chart = new portalui_flashChart(this.fr4,{bound:[5,0,this.fr4.getClientWidth() - 30,frameHeight - 45],objectReady:[this,"doObjectReady"]});		        
							this.fr4.chart.data = data.result[3];
							this.fr5 = new portalui_roundPanel(this.tab.childPage[0],{bound:[this.fr4.left+this.fr4.width + 15,this.fr1.height+20,frameWidth * 2 + 10,frameHeight],caption:"Pendidikan",color:"#edf5f8",titleBg:"#95cae8",background:"image/themes/dynpro/bluegradient.png"});			
            				this.fr5.chart = new portalui_flashChart(this.fr5,{bound:[5,0,this.fr5.getClientWidth() - 30,frameHeight - 45],objectReady:[this,"doObjectReady"]});		        
							this.fr5.chart.data = data.result[4];
							
            				this.fr6 = new portalui_roundPanel(this.tab.childPage[1],{bound:[10,10,frameWidth,frameHeight],caption:"Status Pegawai",color:"#edf5f8",titleBg:"#95cae8",background:"image/themes/dynpro/bluegradient.png"});									
            		        this.fr6.chart = new portalui_flashChart(this.fr6,{bound:[5,0,this.fr6.getClientWidth() - 30,frameHeight - 45],objectReady:[this,"doObjectReady"]});		        				
                            this.fr6.chart.data = data.result[5];
							this.fr7 = new portalui_roundPanel(this.tab.childPage[1],{bound:[this.fr6.left+this.fr6.width + 15,10,frameWidth,frameHeight],caption:"Tenaga Perbantuan",color:"#edf5f8",titleBg:"#95cae8",background:"image/themes/dynpro/bluegradient.png"});						
            				this.fr7.chart = new portalui_flashChart(this.fr7,{bound:[5,0,this.fr7.getClientWidth() - 30,frameHeight - 45],objectReady:[this,"doObjectReady"]});		        
                            this.fr7.chart.data = data.result[6];
							
							this.fr10 = new portalui_roundPanel(this.tab.childPage[1],{bound:[this.fr7.left+this.fr7.width + 15,10,frameWidth + 30,this.height - 80],caption:"Profesi",color:"#edf5f8",titleBg:"#95cae8",background:"image/themes/dynpro/bluegradient.png"});
            				this.fr10.chart = new portalui_flashChart(this.fr10,{bound:[5,0,this.fr10.getClientWidth() - 30,this.fr10.getClientHeight() - 45],objectReady:[this,"doObjectReady"]});						
							this.fr10.chart.data = data.result[9];
							
							this.fr8 = new portalui_roundPanel(this.tab.childPage[1],{bound:[10,this.fr6.height+20,frameWidth,frameHeight],caption:"Jabatan Struktural",color:"#edf5f8",titleBg:"#95cae8",background:"image/themes/dynpro/bluegradient.png"});			
            				this.fr8.chart = new portalui_flashChart(this.fr8,{bound:[5,0,this.fr8.getClientWidth() - 30,frameHeight - 45],objectReady:[this,"doObjectReady"]});		        																				
            				this.fr8.chart.data = data.result[7];
							this.fr9 = new portalui_roundPanel(this.tab.childPage[1],{bound:[this.fr8.left+this.fr8.width + 15,this.fr6.height+20,frameWidth,frameHeight],caption:"Jabatan Fungsional",color:"#edf5f8",titleBg:"#95cae8",background:"image/themes/dynpro/bluegradient.png"});			
            				this.fr9.chart = new portalui_flashChart(this.fr9,{bound:[5,0,this.fr9.getClientWidth() - 30,frameHeight - 45],objectReady:[this,"doObjectReady"]});		        
            				this.fr9.chart.data = data.result[8];
							
							
							this.fr11 = new portalui_roundPanel(this.tab.childPage[2],{bound:[10,10,this.width / 2 - 30,this.height-80],caption:"Lokasi Kerja",color:"#edf5f8",titleBg:"#95cae8",background:"image/themes/dynpro/bluegradient.png"});
            				this.fr11.chart = new portalui_flashChart(this.fr11,{bound:[5,0,this.fr11.getClientWidth() - 40,this.fr11.getClientHeight() - 45],objectReady:[this,"doObjectReady"]});						
							this.fr11.chart.data = data.result[10];
							this.fr12 = new portalui_roundPanel(this.tab.childPage[2],{bound:[this.fr11.left+this.fr11.width + 20,10,this.width / 2 - 30,this.height-80],caption:"Unit Kerja",color:"#edf5f8",titleBg:"#95cae8",background:"image/themes/dynpro/bluegradient.png"});
            				this.fr12.chart = new portalui_flashChart(this.fr12,{bound:[5,0,this.fr12.getClientWidth() - 40,this.fr12.getClientHeight() - 45],objectReady:[this,"doObjectReady"]});            				
							this.fr12.chart.data = data.result[11];
							for (var i in this.sql.objList){
								eval("this.fr"+(parseInt(i,10)+1).toString()+".sql = this.sql.get("+i+");");
							}
							
                       }else throw result;
    	           break;
               }
            }catch(e){
                systemAPI.alert(this+"$request()",e);
            }
       }
    },
    doTabChange: function(sender, page){
        this.count = 0;
    },
	doObjectReady: function(sender){
	   try{
	        sender.isReady = true;      
	        this.count++;
	        switch(this.tab.activePage){
                case 0 : if (this.count == 5) this.timer.setEnabled(true);
                break;
                case 1 : if (this.count == 5) this.timer.setEnabled(true);
                break;
                case 2 : if (this.count == 2) this.timer.setEnabled(true);
                break;
            }
        }catch(e){
            alert(e);
        }
    },
	getChart: function(data,swf){
		if (data === undefined) return;
		if (data.rs === undefined) return;
		var chart = {
		  "bg_colour":"#edf5f8",
		  "y_legend":{
			"text": "Jumlah","style": "{color: #736AFF; font-size: 12px;}"
		  },
		  "elements":[],
		  "x_axis":{
			"stroke": 1,"tick_height": 10,"colour":"#d000d0","grid_colour": "#00ff00","labels":{"labels":[],"rotate": 45},"3d": 5
		   },
		  "y_axis":{
			"stroke":4,"tick_length": 3,"colour":"#d000d0","grid_colour": "#00ff00","offset":0,"max":50,"steps":25
		  },
		  "tooltip":{
			"text": "Global Tooltip<br>val=#val#, top=#top#"
		  }
		};  
		var line,temp="", maxValue = -999999999,minValue = 999999999;
		var r = Math.floor(Math.random()*256),g = Math.floor(Math.random()*256),b = Math.floor(Math.random()*256);
		var maleColor = (r+256 * g + 65536 * b).toString(16);
		r = Math.floor(Math.random()*256),g = Math.floor(Math.random()*256),b = Math.floor(Math.random()*256);
		var femaleColor = (r+256 * g + 65536 * b).toString(16);
		var male = {"type":"bar_3d","alpha":     1,"colour":    "#"+ maleColor,
			  "tip":       "Pria (#val#)",
			  "text":      "Pria",
			  "font-size--": 10,
			  "values" :   [],
			  "linkCtrl": swf.resourceId.toString(),
			  "on-click": "system.getResource("+this.resourceId+").doChartClick",
			  "on-show":	{"type": "grow-up"}
			};
		var female = {"type":"bar_3d","alpha":     0.8,"colour":    "#"+ femaleColor,
			  "tip":       "Wanita (#val#) ",
			  "text":      "Wanita",
			  "font-size--": 10,
			  "values" :   [],
			  "linkCtrl": swf.resourceId.toString(),
			  "on-click": "system.getResource("+this.resourceId+").doChartClick",
			  "on-show":	{"type": "grow-up"}
			};
		swf.labels = [];
		if (data.rs.rows[0]!==undefined)
		{
			for (var i in data.rs.rows){
				line = data.rs.rows[i];  						
				male.values.push(Math.round(line.male));						
				female.values.push( Math.round(line.female));												
				chart.x_axis.labels.labels.push(line.col1);
				swf.labels.push(line.col1);
				if (parseFloat(line.col2) > maxValue ) maxValue = parseFloat(line.col2);
				if (parseFloat(line.col2) < minValue ) minValue = parseFloat(line.col2);						
			}									
		}else{
			var line,temp="", maxValue = 25,minValue = 0;			
		}    			
		chart.elements.push(male);
		chart.elements.push(female);
		chart.y_axis.max = maxValue + 25;						
		swf.getObject().load( JSON.stringify(chart) ); 
	},
    updateChart: function(sender){
		try{								
			this.getChart(sender.data, sender);            
		}catch(e){
			alert(e);
		}
    },
    doTimer: function(sender){
        if (this.tab.activePage == 0){
            this.timer.setEnabled(false);
            this.updateChart(this.fr1.chart);
            this.updateChart(this.fr2.chart);
            this.updateChart(this.fr3.chart);
			this.updateChart(this.fr4.chart);
            this.updateChart(this.fr5.chart);
        }else if (this.tab.activePage == 1){
            this.timer.setEnabled(false);
            this.updateChart(this.fr6.chart);
            this.updateChart(this.fr7.chart);
            this.updateChart(this.fr8.chart);
			this.updateChart(this.fr9.chart);
            this.updateChart(this.fr10.chart);
        }else if (this.tab.activePage == 2){
            this.timer.setEnabled(false);
            this.updateChart(this.fr11.chart);            
			this.updateChart(this.fr12.chart);            
        }
    },
	getSQL: function(jnsLap,subtipe){
		var sql;
		if (jnsLap === "Pribadi"){			
			switch(subtipe){
			case "umur" : sql= "	(select 'Umur' as nmcol1,'20-35' as col1 "+
				"      , sum(case when a.sex = 'laki-laki' then 1 else 0 end) as male "+
				"      , sum(case when a.sex = 'perempuan' then 1 else 0 end) as female "+
				"      , count(sex) as col2 "+
				"    from karyawan a "+
				"        where abs(cast(datediff (year,a.tgl_lahir,getdate()) as decimal))>19 "+
				"        and abs(cast(datediff (year,a.tgl_lahir,getdate()) as decimal))<36 "+
				"        and a.kode_lokkonsol = '"+this.app._lokKonsol+"' and kode_lokasi = '"+this.app._lokasi+"' "+
				"    ) union "+
				"	(select 'Umur' as nmcol1,'36-45' as col1 "+
				"      , sum(case when a.sex = 'laki-laki' then 1 else 0 end) as male "+
				"      , sum(case when a.sex = 'perempuan' then 1 else 0 end) as female "+
				"      , count(sex) as col2 "+
				"    from karyawan a "+
				"        where abs(cast(datediff (year,a.tgl_lahir,getdate()) as decimal))>35 "+
				"        and abs(cast(datediff (year,a.tgl_lahir,getdate()) as decimal))<46 "+
				"        and a.kode_lokkonsol = '"+this.app._lokKonsol+"' and kode_lokasi = '"+this.app._lokasi+"' "+
				"    ) union "+
				"	(select 'Umur' as nmcol1,'>45' as col1 "+
				"      , sum(case when a.sex = 'laki-laki' then 1 else 0 end) as male "+
				"      , sum(case when a.sex = 'perempuan' then 1 else 0 end) as female "+
				"      , count(sex) as col2 "+
				"    from karyawan a "+
				"        where abs(cast(datediff (year,a.tgl_lahir,getdate()) as decimal))>45 "+
				"        and a.kode_lokkonsol = '"+this.app._lokKonsol+"' and kode_lokasi = '"+this.app._lokasi+"' "+
				"    )"; break;
			case "mk" :	sql = "	(select 'Masa Kerja' as nmcol1,'<2' as col1 "+
				"      , sum(case when a.sex = 'laki-laki' then 1 else 0 end) as male "+
				"      , sum(case when a.sex = 'perempuan' then 1 else 0 end) as female "+
				"      , count(sex) as col2 "+
				"    from karyawan a "+
				"        where abs(cast(datediff (year,a.tgl_masuk,getdate()) as decimal))<2 "+
				"        and a.kode_lokkonsol = '"+this.app._lokKonsol+"' and kode_lokasi = '"+this.app._lokasi+"' "+
				"    ) union "+
				"	(select 'Masa Kerja' as nmcol1,'2 - 5' as col1 "+
				"      , sum(case when a.sex = 'laki-laki' then 1 else 0 end) as male "+
				"      , sum(case when a.sex = 'perempuan' then 1 else 0 end) as female "+
				"      , count(sex) as col2 "+
				"    from karyawan a "+
				"        where abs(cast(datediff (year,a.tgl_masuk,getdate()) as decimal))>=2 and "+
				"        abs(cast(datediff (year,a.tgl_masuk,getdate()) as decimal))<=5 and a.kode_lokkonsol = '"+this.app._lokKonsol+"' and kode_lokasi = '"+this.app._lokasi+"' "+
				"    ) union "+
				"	(select 'Masa Kerja' as nmcol1,'6 - 10' as col1 "+
				"      , sum(case when a.sex = 'laki-laki' then 1 else 0 end) as male "+
				"      , sum(case when a.sex = 'perempuan' then 1 else 0 end) as female "+
				"      , count(sex) as col2 "+
				"    from karyawan a "+
				"        where abs(cast(datediff (year,a.tgl_masuk,getdate()) as decimal))>5 and "+
				"        abs(cast(datediff (year,a.tgl_masuk,getdate()) as decimal))<=10 and a.kode_lokkonsol = '"+this.app._lokKonsol+"' and kode_lokasi = '"+this.app._lokasi+"' "+
				"    ) union "+
				"	(select 'Masa Kerja' as nmcol1,'>10' as col1 "+
				"      , sum(case when a.sex = 'laki-laki' then 1 else 0 end) as male "+
				"      , sum(case when a.sex = 'perempuan' then 1 else 0 end) as female "+
				"      , count(sex) as col2 "+
				"    from karyawan a "+
				"        where abs(cast(datediff (year,a.tgl_masuk,getdate()) as decimal))>10 and a.kode_lokkonsol = '"+this.app._lokKonsol+"' and kode_lokasi = '"+this.app._lokasi+"' "+
				"    )";break;
			case "agama" : sql = "	(select 'Agama' as nmcol1,a.agama as col1 "+
				"      , sum(case when a.sex = 'laki-laki' then 1 else 0 end) as male "+
				"      , sum(case when a.sex = 'perempuan' then 1 else 0 end) as female "+
				"      , count(sex) as col2 "+
				"    from karyawan a "+
				"        where a.kode_lokkonsol = '"+this.app._lokKonsol+"' and kode_lokasi = '"+this.app._lokasi+"' "+
				"    group by a.agama)";break;
			case "status" : sql = "	(select 'Status Kawin' as nmcol1,a.status as col1 "+
				"      , sum(case when a.sex = 'laki-laki' then 1 else 0 end) as male "+
				"      , sum(case when a.sex = 'perempuan' then 1 else 0 end) as female "+
				"      , count(sex) as col2 "+
				"    from karyawan a "+
				"        where a.kode_lokkonsol = '"+this.app._lokKonsol+"' and kode_lokasi = '"+this.app._lokasi+"' "+
				"    group by a.status)";break;
			case "pendidikan" : sql = "	(select 'Pendidikan' as nmcol1, b.jenjang as col1 "+
				"    , count(c.sex) as male "+
				"    , count(d.sex) as female "+
				"    , count(c.sex)  + count(d.sex) as col2 "+
				"  from hr_dinas2 b "+
				"    left outer join karyawan c on b.nik = c.nik and c.kode_lokkonsol = b.kode_lokkonsol and c.sex = 'laki-laki' and c.kode_lokasi = b.kode_lokasi "+
				"    left outer join karyawan d on d.nik = b.nik and d.kode_lokkonsol = b.kode_lokkonsol and d.sex = 'perempuan' and d.kode_lokasi = b.kode_lokasi "+
				" where b.kode_lokkonsol = '"+this.app._lokKonsol+"' and b.kode_lokasi = '"+this.app._lokasi+"' group by b.jenjang) ";break;
			}
			sql = "select a.nmcol1,a.col1,a.male,a.female,a.col2 from ( "+sql+") as a ";
		}else if (jnsLap === "Riwayat"){			
			switch(subtipe){
			case "status" : sql ="	(select 'Status Pegawai' as nmcol1, a.nama as col1 "+
                "      , count(c.sex) as male "+
                "      , count(d.sex) as female "+
                "      , count(c.sex)  + count(d.sex) as col2 "+
                "    from hr_status2 a "+
                "      left outer join hr_dinas2 b on b.kode_status = a.kode_status and b.kode_lokkonsol = a.kode_lokkonsol  and b.kode_lokasi = '"+this.app._lokasi+"' "+
                "      left outer join karyawan c on b.nik = c.nik and c.kode_lokkonsol = a.kode_lokkonsol and c.sex = 'laki-laki' and c.kode_lokasi = b.kode_lokasi "+
                "      left outer join karyawan d on d.nik = b.nik and d.kode_lokkonsol = a.kode_lokkonsol and d.sex = 'perempuan' and d.kode_lokasi = b.kode_lokasi "+
                "   where a.kode_lokkonsol = '"+this.app._lokKonsol+"' group by a.nama)";break;
			case "bantuan" : sql = "	(select 'Tenaga Perbantuan' as nmcol1, a.nama as col1 "+
                "      , count(c.sex) as male "+
                "      , count(d.sex) as female "+
                "      , count(c.sex)  + count(d.sex) as col2 "+
                "    from hr_bantu a "+
                "      left outer join hr_dinas2 b on b.kode_bantu = a.kode_bantu and b.kode_lokkonsol = a.kode_lokkonsol  and b.kode_lokasi = '"+this.app._lokasi+"' "+
                "      left outer join karyawan c on b.nik = c.nik and c.kode_lokkonsol = a.kode_lokkonsol and c.sex = 'laki-laki' and c.kode_lokasi = b.kode_lokasi "+
                "      left outer join karyawan d on d.nik = b.nik and d.kode_lokkonsol = a.kode_lokkonsol and d.sex = 'perempuan' and d.kode_lokasi = b.kode_lokasi "+
                "   where a.kode_lokkonsol = '"+this.app._lokKonsol+"' group by a.nama) ";break;
			case "jabs" : sql = "	(select 'Jabatan Struktural' as nmcol1, a.nama as col1 "+
                "          , count(b.sex) as male "+
                "          , count(d.sex) as female "+
                "          , count(b.sex)  + count(d.sex) as col2 "+
                "        from hr_jabatan a "+
                "          inner join hr_jabs e on a.kode_jab = e.kode_jabs and e.kode_lokkonsol = a.kode_lokkonsol and e.status_aktif = '1' "+
                "          inner join hr_dinas2 c on c.kode_jabs = e.kode_jabs and e.nik = c.nik and c.kode_lokkonsol = a.kode_lokkonsol and c.kode_lokasi = '"+this.app._lokasi+"' "+
                "          left outer join karyawan b on b.nik = c.nik and b.kode_lokkonsol = a.kode_lokkonsol and b.sex = 'laki-laki' and b.kode_lokasi = c.kode_lokasi "+
                "          left outer join karyawan d on d.nik = c.nik and d.kode_lokkonsol = a.kode_lokkonsol and d.sex = 'perempuan'and d.kode_lokasi = c.kode_lokasi "+
                "        where a.kode_lokkonsol = '"+this.app._lokKonsol+"' and (a.jenis = 'STRUKTURAL' or a.kode_jab = '-') group by a.nama) ";break;
			case "jabf" : sql = "	(select 'Jabatan Fungsional' as nmcol1, a.nama as col1 "+
                "          , count(b.sex) as male "+
                "          , count(d.sex) as female "+
                "          , count(b.sex)  + count(d.sex) as col2 "+
                "        from hr_jabatan a "+
                "          inner join hr_jabf e on a.kode_jab = e.kode_jabf and e.kode_lokkonsol = a.kode_lokkonsol and e.status_aktif = '1' "+
                "          inner join hr_dinas2 c on c.kode_jabf = e.kode_jabf and e.nik = c.nik and c.kode_lokkonsol = a.kode_lokkonsol and c.kode_lokasi = '"+this.app._lokasi+"' "+
                "          left outer join karyawan b on b.nik = c.nik and b.kode_lokkonsol = a.kode_lokkonsol and b.sex = 'laki-laki' and b.kode_lokasi = c.kode_lokasi "+
                "          left outer join karyawan d on d.nik = c.nik and d.kode_lokkonsol = a.kode_lokkonsol and d.sex = 'perempuan'and d.kode_lokasi = c.kode_lokasi "+
                "        where a.kode_lokkonsol = '"+this.app._lokKonsol+"' and (a.jenis = 'FUNGSIONAL' or a.kode_jab = '-') group by a.nama)";break;
			case "profesi" : sql = "	(select 'Profesi' as nmcol1, a.nama as col1 "+
                "          , count(b.sex) as male "+
                "          , count(d.sex) as female "+
                "          , count(b.sex)  + count(d.sex) as col2 "+
                "        from hr_profesi a "+
                "          inner join hr_rwyprofesi e on a.kode_profesi = e.kode_profesi2 and e.kode_lokkonsol = a.kode_lokkonsol and e.status_aktif = '1' "+
                "          inner join hr_dinas2 c on c.kode_profesi = e.kode_profesi2 and e.nik = c.nik and c.kode_lokkonsol = a.kode_lokkonsol and c.kode_lokasi = '"+this.app._lokasi+"' "+
                "          left outer join karyawan b on b.nik = c.nik and b.kode_lokkonsol = a.kode_lokkonsol and b.sex = 'laki-laki' and b.kode_lokasi = c.kode_lokasi "+
                "          left outer join karyawan d on d.nik = c.nik and d.kode_lokkonsol = a.kode_lokkonsol and d.sex = 'perempuan'and d.kode_lokasi = c.kode_lokasi "+
                "        where a.kode_lokkonsol = '"+this.app._lokKonsol+"'  group by a.nama) ";break;	
			}
			sql="select a.nmcol1,a.col1,a.male,a.female,a.col2 from ( "+sql+") as a";				
		}else if (jnsLap === "Lokasi"){						
			sql="select a.nmcol1,a.col1,a.male,a.female,a.col2 from ( ";
			switch(subtipe){			
			case "lokasi":	sql += "	(select 'Lokasi Kerja' as nmcol1, a.nama as col1 "+
                "      , count(c.sex) as male "+
                "      , count(d.sex) as female "+
                "      , count(c.sex)  + count(d.sex) as col2 "+
                "    from hr_lokasi a "+
                "      left outer join hr_dinas2 b on b.kode_lokasi = a.kode_lokasi and b.kode_lokkonsol = a.kode_lokkonsol "+
                "      left outer join karyawan c on b.nik = c.nik and c.kode_lokkonsol = a.kode_lokkonsol and c.sex = 'laki-laki' and c.kode_lokasi = b.kode_lokasi "+
                "      left outer join karyawan d on d.nik = b.nik and d.kode_lokkonsol = a.kode_lokkonsol and d.sex = 'perempuan' and d.kode_lokasi = b.kode_lokasi "+
                "   where a.kode_lokkonsol = '"+this.app._lokKonsol+"' and a.kode_lokasi = '"+this.app._lokasi+"' group by a.nama)";break;
			case "unit": sql += "	(select 'Unit Kerja' as nmcol1, a.nama as col1 "+
                "      , count(c.sex) as male "+
                "      , count(d.sex) as female "+
                "      , count(c.sex)  + count(d.sex) as col2 "+
                "    from hr_loker a "+
                "      left outer join hr_dinas2 b on b.kode_loker = a.kode_loker and b.kode_lokasi = a.kode_lokasi and b.kode_lokkonsol = a.kode_lokkonsol "+
                "      left outer join karyawan c on b.nik = c.nik and c.kode_lokkonsol = a.kode_lokkonsol and c.sex = 'laki-laki' and c.kode_lokasi = b.kode_lokasi "+
                "      left outer join karyawan d on d.nik = b.nik and d.kode_lokkonsol = a.kode_lokkonsol and d.sex = 'perempuan' and d.kode_lokasi = b.kode_lokasi "+
                "   where a.kode_lokkonsol = '"+this.app._lokKonsol+"' and a.kode_lokasi = '"+this.app._lokasi+"' group by a.nama) ";break;
			}
			sql +="	) as a";		
			
		}
		return sql;
	},
	frontUpperCase: function(field){
		var temp = field.split(" "),text="",tmp;
		for (var i=0;i<temp.length;i++){
			tmp=temp[i].charAt(0).toUpperCase()+temp[i].substr(1);
			text=text+tmp+" ";
		}
		return RTrim(text);
	},
	doChartClick: function(sender,index, title ){	
		try{			
			eval("sender="+sender);
			this.doGridClick(sender,index, title);
		}catch(e){
			alert(e);
		}
	},
	doGridClick: function(sender, index, title){
		try{
			if (this.trail1 === undefined){
				this.trail1 = new app_hrmis_sdm_dashboard_fTrail1(this.owner,undefined, this);
				this.trail1.maximize();			
			}		
			var filter = " and sex = '" +(title == "Pria" ? "Laki-Laki":"Perempuan")+"'";									
			switch(sender){				
				case this.fr1.chart: 		
					switch(parseInt(index,10)) {
						case 0 : sql1= " select * "+
							"    from karyawan a "+
							"        where abs(cast(datediff (year,a.tgl_lahir,getdate()) as decimal))>19 "+
							"        and abs(cast(datediff (year,a.tgl_lahir,getdate()) as decimal))<36 "+
							"        and a.kode_lokkonsol = '"+this.app._lokKonsol+"' and kode_lokasi = '"+this.app._lokasi+"' "+filter+
							"    ";
							sql2= " select count(*) "+
							"    from karyawan a "+
							"        where abs(cast(datediff (year,a.tgl_lahir,getdate()) as decimal))>19 "+
							"        and abs(cast(datediff (year,a.tgl_lahir,getdate()) as decimal))<36 "+
							"        and a.kode_lokkonsol = '"+this.app._lokKonsol+"' and kode_lokasi = '"+this.app._lokasi+"' "+filter+
							"    ";break;
						case 1 : sql1 = "select * "+
							"    from karyawan a "+
							"        where abs(cast(datediff (year,a.tgl_lahir,getdate()) as decimal))>35 "+
							"        and abs(cast(datediff (year,a.tgl_lahir,getdate()) as decimal))<46 "+
							"        and a.kode_lokkonsol = '"+this.app._lokKonsol+"' and kode_lokasi = '"+this.app._lokasi+"' "+filter+
							"    ";
							sql2 = "select count(*) "+
							"    from karyawan a "+
							"        where abs(cast(datediff (year,a.tgl_lahir,getdate()) as decimal))>35 "+
							"        and abs(cast(datediff (year,a.tgl_lahir,getdate()) as decimal))<46 "+
							"        and a.kode_lokkonsol = '"+this.app._lokKonsol+"' and kode_lokasi = '"+this.app._lokasi+"' "+filter+
							"    ";break;
						case 2 : sql1 = "select * "+
							"    from karyawan a "+
							"        where abs(cast(datediff (year,a.tgl_lahir,getdate()) as decimal))>45 "+
							"        and a.kode_lokkonsol = '"+this.app._lokKonsol+"' and kode_lokasi = '"+this.app._lokasi+"' "+filter+
							"    "; 
							sql2 = "select count(*) "+
							"    from karyawan a "+
							"        where abs(cast(datediff (year,a.tgl_lahir,getdate()) as decimal))>45 "+
							"        and a.kode_lokkonsol = '"+this.app._lokKonsol+"' and kode_lokasi = '"+this.app._lokasi+"' "+filter+
							"    "; break;
					}					
					this.trail1.setSQL(sql1, sql2);
					this.trail1.setPanelCaption("Karyawan berdasar umur (Gender "+title+") ");
				break;
				case this.fr2.chart: 		
					switch(parseInt(index,10)) {
						case 0 : sql1 = "select *  "+
							"    from karyawan a "+
							"        where abs(cast(datediff (year,a.tgl_masuk,getdate()) as decimal))<2 "+
							"        and a.kode_lokkonsol = '"+this.app._lokKonsol+"' and kode_lokasi = '"+this.app._lokasi+"' "+filter;
							sql2 = "select count(*)  "+
							"    from karyawan a "+
							"        where abs(cast(datediff (year,a.tgl_masuk,getdate()) as decimal))<2 "+
							"        and a.kode_lokkonsol = '"+this.app._lokKonsol+"' and kode_lokasi = '"+this.app._lokasi+"' "+filter;
							break;
						case 1 : sql1 = "select * "+
							"    from karyawan a "+
							"        where abs(cast(datediff (year,a.tgl_masuk,getdate()) as decimal))>=2 and "+
							"        abs(cast(datediff (year,a.tgl_masuk,getdate()) as decimal))<=5 "+
							"	and a.kode_lokkonsol = '"+this.app._lokKonsol+"' and kode_lokasi = '"+this.app._lokasi+"' "+filter;
							sql2 = "select count(*) "+
							"    from karyawan a "+
							"        where abs(cast(datediff (year,a.tgl_masuk,getdate()) as decimal))>=2 and "+
							"        abs(cast(datediff (year,a.tgl_masuk,getdate()) as decimal))<=5 "+
							"	and a.kode_lokkonsol = '"+this.app._lokKonsol+"' and kode_lokasi = '"+this.app._lokasi+"' "+filter;
							break;
						case 2 : sql1 = "select * "+
							"    from karyawan a "+
							"        where abs(cast(datediff (year,a.tgl_masuk,getdate()) as decimal))>5 and "+
							"        abs(cast(datediff (year,a.tgl_masuk,getdate()) as decimal))<=10 "+
							"	and a.kode_lokkonsol = '"+this.app._lokKonsol+"' and kode_lokasi = '"+this.app._lokasi+"' "+filter;
							sql2 = "select count(*) "+
							"    from karyawan a "+
							"        where abs(cast(datediff (year,a.tgl_masuk,getdate()) as decimal))>5 and "+
							"        abs(cast(datediff (year,a.tgl_masuk,getdate()) as decimal))<=10 "+
							"	and a.kode_lokkonsol = '"+this.app._lokKonsol+"' and kode_lokasi = '"+this.app._lokasi+"' "+filter;
							break;
						case 3 : sql1 = "select * "+
							"    from karyawan a "+
							"        where abs(cast(datediff (year,a.tgl_masuk,getdate()) as decimal))>10 "+
							"	and a.kode_lokkonsol = '"+this.app._lokKonsol+"' and kode_lokasi = '"+this.app._lokasi+"' "+filter;
							sql2 = "select count(*) "+
							"    from karyawan a "+
							"        where abs(cast(datediff (year,a.tgl_masuk,getdate()) as decimal))>10 "+
							"	and a.kode_lokkonsol = '"+this.app._lokKonsol+"' and kode_lokasi = '"+this.app._lokasi+"' "+filter;
							break;						
					}
					this.trail1.setSQL(sql1, sql2);
					this.trail1.setPanelCaption("Karyawan berdasar Masa Kerja (Gender "+title+") ");
				break;
				case this.fr3.chart:					
					sql1 = "select * "+
						"    from karyawan a "+
						"        where a.kode_lokkonsol = '"+this.app._lokKonsol+"' and kode_lokasi = '"+this.app._lokasi+"' "+filter +" and agama = '"+sender.labels[index]+"'";
					sql2 = "select count(*) "+
						"    from karyawan a "+
						"        where a.kode_lokkonsol = '"+this.app._lokKonsol+"' and kode_lokasi = '"+this.app._lokasi+"' "+filter+" and agama = '"+sender.labels[index]+"'";
					this.trail1.setSQL(sql1, sql2);
					this.trail1.setPanelCaption("Karyawan berdasar Agama "+sender.labels[index]+"(Gender "+title+") ");		
				break;
				case this.fr4.chart:
					sql1 = "select * "+
						"    from karyawan a "+
						"        where a.kode_lokkonsol = '"+this.app._lokKonsol+"' and kode_lokasi = '"+this.app._lokasi+"' "+filter+" and status = '"+sender.labels[index]+"' ";
					sql2 = "select count(*) "+
						"    from karyawan a "+
						"        where a.kode_lokkonsol = '"+this.app._lokKonsol+"' and kode_lokasi = '"+this.app._lokasi+"' "+filter+" and status = '"+sender.labels[index]+"' ";
					this.trail1.setSQL(sql1, sql2);
					this.trail1.setPanelCaption("Karyawan berdasar Status Kawin "+sender.labels[index]+"(Gender "+title+") ");
				break;
				case this.fr5.chart:
					sql1 = "select * "+
						"  from hr_dinas2 b "+
						"    left outer join karyawan c on b.nik = c.nik and c.kode_lokkonsol = b.kode_lokkonsol and c.kode_lokasi = b.kode_lokasi "+						
						" where b.kode_lokkonsol = '"+this.app._lokKonsol+"' and b.kode_lokasi = '"+this.app._lokasi+"' ";
					sql2 = "select * "+
						"  from hr_dinas2 b "+
						"    left outer join karyawan c on b.nik = c.nik and c.kode_lokkonsol = b.kode_lokkonsol and c.kode_lokasi = b.kode_lokasi "+						
						" where b.kode_lokkonsol = '"+this.app._lokKonsol+"' and b.kode_lokasi = '"+this.app._lokasi+"' "+filter +" and b.jenjang ='"+sender.labels[index]+"' ";
					this.trail1.setSQL(sql1, sql2);
					this.trail1.setPanelCaption("Karyawan berdasar jenjang Pendidikan "+sender.labels[index]+"(Gender "+title+") ");
				break;
				case this.fr6.chart:
					sql1 ="select c.* "+
						"    from hr_status2 a "+
						"      left outer join hr_dinas2 b on b.kode_status = a.kode_status and b.kode_lokkonsol = a.kode_lokkonsol  and b.kode_lokasi = '"+this.app._lokasi+"' "+
						"      left outer join karyawan c on b.nik = c.nik and c.kode_lokkonsol = a.kode_lokkonsol and c.kode_lokasi = b.kode_lokasi "+					
						"   where a.kode_lokkonsol = '"+this.app._lokKonsol+"' "+filter+" and a.nama = '"+sender.labels[index]+"' ";
					sql2 ="select count(c.*) "+
						"    from hr_status2 a "+
						"      left outer join hr_dinas2 b on b.kode_status = a.kode_status and b.kode_lokkonsol = a.kode_lokkonsol  and b.kode_lokasi = '"+this.app._lokasi+"' "+
						"      left outer join karyawan c on b.nik = c.nik and c.kode_lokkonsol = a.kode_lokkonsol and c.kode_lokasi = b.kode_lokasi "+					
						"   where a.kode_lokkonsol = '"+this.app._lokKonsol+"' "+filter+" and a.nama = '"+sender.labels[index]+"' ";
					this.trail1.setSQL(sql1, sql2);
					this.trail1.setPanelCaption("Karyawan berdasar Riwayat Status Pegawai "+sender.labels[index]+"(Gender "+title+") ");
				break;
				case this.fr7.chart:
					sql1 = "select c.* "+
						"    from hr_bantu a "+
						"      left outer join hr_dinas2 b on b.kode_bantu = a.kode_bantu and b.kode_lokkonsol = a.kode_lokkonsol  and b.kode_lokasi = '"+this.app._lokasi+"' "+
						"      left outer join karyawan c on b.nik = c.nik and c.kode_lokkonsol = a.kode_lokkonsol and c.kode_lokasi = b.kode_lokasi "+						
						"   where a.kode_lokkonsol = '"+this.app._lokKonsol+"' "+filter+" and a.nama = '"+sender.labels[index]+"' ";
					sql2 = "select count(c.*) "+
						"    from hr_bantu a "+
						"      left outer join hr_dinas2 b on b.kode_bantu = a.kode_bantu and b.kode_lokkonsol = a.kode_lokkonsol  and b.kode_lokasi = '"+this.app._lokasi+"' "+
						"      left outer join karyawan c on b.nik = c.nik and c.kode_lokkonsol = a.kode_lokkonsol and c.kode_lokasi = b.kode_lokasi "+						
						"   where a.kode_lokkonsol = '"+this.app._lokKonsol+"' "+filter+" and a.nama = '"+sender.labels[index]+"' ";
					this.trail1.setSQL(sql1, sql2);
					this.trail1.setPanelCaption("Karyawan berdasar Riwayat Perbantuan "+sender.labels[index]+"(Gender "+title+") ");
				break;
				case this.fr8.chart:
					sql1 = "select b.* "+
						"        from hr_jabatan a "+
						"          inner join hr_jabs e on a.kode_jab = e.kode_jabs and e.kode_lokkonsol = a.kode_lokkonsol and e.status_aktif = '1' "+
						"          inner join hr_dinas2 c on c.kode_jabs = e.kode_jabs and e.nik = c.nik and c.kode_lokkonsol = a.kode_lokkonsol and c.kode_lokasi = '"+this.app._lokasi+"' "+
						"          left outer join karyawan b on b.nik = c.nik and b.kode_lokkonsol = a.kode_lokkonsol and b.kode_lokasi = c.kode_lokasi "+					
						"        where a.kode_lokkonsol = '"+this.app._lokKonsol+"' and (a.jenis = 'STRUKTURAL' or a.kode_jab = '-')  "+filter+" and a.nama = '"+sender.labels[index]+"' ";
					sql2 = "select count(b.*) "+
						"        from hr_jabatan a "+
						"          inner join hr_jabs e on a.kode_jab = e.kode_jabs and e.kode_lokkonsol = a.kode_lokkonsol and e.status_aktif = '1' "+
						"          inner join hr_dinas2 c on c.kode_jabs = e.kode_jabs and e.nik = c.nik and c.kode_lokkonsol = a.kode_lokkonsol and c.kode_lokasi = '"+this.app._lokasi+"' "+
						"          left outer join karyawan b on b.nik = c.nik and b.kode_lokkonsol = a.kode_lokkonsol and b.kode_lokasi = c.kode_lokasi "+					
						"        where a.kode_lokkonsol = '"+this.app._lokKonsol+"' and (a.jenis = 'STRUKTURAL' or a.kode_jab = '-')  "+filter+" and a.nama = '"+sender.labels[index]+"' ";
					this.trail1.setSQL(sql1, sql2);
					this.trail1.setPanelCaption("Karyawan berdasar Riwayat Jabatan Struktural "+sender.labels[index]+"(Gender "+title+") ");
				break;
				case this.fr9.chart:
					sql1 = "select b.* "+
						"        from hr_jabatan a "+
						"          inner join hr_jabf e on a.kode_jab = e.kode_jabf and e.kode_lokkonsol = a.kode_lokkonsol and e.status_aktif = '1' "+
						"          inner join hr_dinas2 c on c.kode_jabf = e.kode_jabf and e.nik = c.nik and c.kode_lokkonsol = a.kode_lokkonsol and c.kode_lokasi = '"+this.app._lokasi+"' "+
						"          left outer join karyawan b on b.nik = c.nik and b.kode_lokkonsol = a.kode_lokkonsol and b.kode_lokasi = c.kode_lokasi "+					
						"        where a.kode_lokkonsol = '"+this.app._lokKonsol+"' and (a.jenis = 'FUNGSIONAL' or a.kode_jab = '-') "+filter+" and a.nama = '"+sender.labels[index]+"' ";
					sql2 = "select count(b.*) "+
						"        from hr_jabatan a "+
						"          inner join hr_jabf e on a.kode_jab = e.kode_jabf and e.kode_lokkonsol = a.kode_lokkonsol and e.status_aktif = '1' "+
						"          inner join hr_dinas2 c on c.kode_jabf = e.kode_jabf and e.nik = c.nik and c.kode_lokkonsol = a.kode_lokkonsol and c.kode_lokasi = '"+this.app._lokasi+"' "+
						"          left outer join karyawan b on b.nik = c.nik and b.kode_lokkonsol = a.kode_lokkonsol and b.kode_lokasi = c.kode_lokasi "+					
						"        where a.kode_lokkonsol = '"+this.app._lokKonsol+"' and (a.jenis = 'FUNGSIONAL' or a.kode_jab = '-') "+filter+" and a.nama = '"+sender.labels[index]+"' ";
					this.trail1.setSQL(sql1, sql2);
					this.trail1.setPanelCaption("Karyawan berdasar Riwayat Jabatan Fungsional "+sender.labels[index]+"(Gender "+title+") ");
				break;
				case this.fr10.chart:
					sql1 = "select b.* "+
					"        from hr_profesi a "+
					"          inner join hr_rwyprofesi e on a.kode_profesi = e.kode_profesi2 and e.kode_lokkonsol = a.kode_lokkonsol and e.status_aktif = '1' "+
					"          inner join hr_dinas2 c on c.kode_profesi = e.kode_profesi2 and e.nik = c.nik and c.kode_lokkonsol = a.kode_lokkonsol and c.kode_lokasi = '"+this.app._lokasi+"' "+
					"          left outer join karyawan b on b.nik = c.nik and b.kode_lokkonsol = a.kode_lokkonsol and b.kode_lokasi = c.kode_lokasi "+					
					"        where a.kode_lokkonsol = '"+this.app._lokKonsol+"' "+filter+" and a.nama = '"+sender.labels[index]+"' ";
					sql2 = "select count(b.*) "+
					"        from hr_profesi a "+
					"          inner join hr_rwyprofesi e on a.kode_profesi = e.kode_profesi2 and e.kode_lokkonsol = a.kode_lokkonsol and e.status_aktif = '1' "+
					"          inner join hr_dinas2 c on c.kode_profesi = e.kode_profesi2 and e.nik = c.nik and c.kode_lokkonsol = a.kode_lokkonsol and c.kode_lokasi = '"+this.app._lokasi+"' "+
					"          left outer join karyawan b on b.nik = c.nik and b.kode_lokkonsol = a.kode_lokkonsol and b.kode_lokasi = c.kode_lokasi "+					
					"        where a.kode_lokkonsol = '"+this.app._lokKonsol+"' "+filter+" and a.nama = '"+sender.labels[index]+"' ";
					this.trail1.setSQL(sql1, sql2);
					this.trail1.setPanelCaption("Karyawan berdasar Riwayat Profesi "+sender.labels[index]+"(Gender "+title+") ");
				break;
				case this.fr11.chart:
					sql1 = "select c.* "+
						"    from hr_lokasi a "+
						"      left outer join hr_dinas2 b on b.kode_lokasi = a.kode_lokasi and b.kode_lokkonsol = a.kode_lokkonsol "+
						"      left outer join karyawan c on b.nik = c.nik and c.kode_lokkonsol = a.kode_lokkonsol and c.kode_lokasi = b.kode_lokasi "+					
						"   where a.kode_lokkonsol = '"+this.app._lokKonsol+"' and a.kode_lokasi = '"+this.app._lokasi+"'  "+filter+" and a.nama = '"+sender.labels[index]+"' ";
					sql2 = "select count(c.*) "+
						"    from hr_lokasi a "+
						"      left outer join hr_dinas2 b on b.kode_lokasi = a.kode_lokasi and b.kode_lokkonsol = a.kode_lokkonsol "+
						"      left outer join karyawan c on b.nik = c.nik and c.kode_lokkonsol = a.kode_lokkonsol and c.kode_lokasi = b.kode_lokasi "+					
						"   where a.kode_lokkonsol = '"+this.app._lokKonsol+"' and a.kode_lokasi = '"+this.app._lokasi+"'  "+filter+" and a.nama = '"+sender.labels[index]+"' ";
					this.trail1.setSQL(sql1, sql2);
					this.trail1.setPanelCaption("Karyawan berdasar Lokasi Kerja  "+sender.labels[index]+"(Gender "+title+") ");	
				break;
				case this.fr12.chart:
					sql1 = "select c.* "+
						"    from hr_loker a "+
						"      left outer join hr_dinas2 b on b.kode_loker = a.kode_loker and b.kode_lokasi = a.kode_lokasi and b.kode_lokkonsol = a.kode_lokkonsol "+
						"      left outer join karyawan c on b.nik = c.nik and c.kode_lokkonsol = a.kode_lokkonsol and c.kode_lokasi = b.kode_lokasi "+			
						"   where a.kode_lokkonsol = '"+this.app._lokKonsol+"' and a.kode_lokasi = '"+this.app._lokasi+"' "+filter+" and a.nama = '"+sender.labels[index]+"' ";
					sql2 = "select count(c.*) "+
						"    from hr_loker a "+
						"      left outer join hr_dinas2 b on b.kode_loker = a.kode_loker and b.kode_lokasi = a.kode_lokasi and b.kode_lokkonsol = a.kode_lokkonsol "+
						"      left outer join karyawan c on b.nik = c.nik and c.kode_lokkonsol = a.kode_lokkonsol and c.kode_lokasi = b.kode_lokasi "+			
						"   where a.kode_lokkonsol = '"+this.app._lokKonsol+"' and a.kode_lokasi = '"+this.app._lokasi+"' "+filter+" and a.nama = '"+sender.labels[index]+"' ";
					this.trail1.setSQL(sql1, sql2);
					this.trail1.setPanelCaption("Karyawan berdasar Unit Kerja  "+sender.labels[index]+"(Gender "+title+") ");	
				break;				
			}
			this.block(true);
			this.trail1.show();
		}catch(e){
			alert(e);
		}
	}
});

window.app_hrmis_sdm_dashboard_fTrail1 = function(owner,options,callObj)
{
    if (owner)
    {
		try{
	        window.app_hrmis_sdm_dashboard_fTrail1.prototype.parent.constructor.call(this, owner,options);        
            this.className = "app_hrmis_sdm_dashboard_fTrail1";			
            this.setCaption("Dashboard");
			this.setColor("");
			this.callObj = callObj;
			this.maximize();			
			this.onClose.set(this,"doClose");						
			this.dbLib = new util_dbLib();
			this.dbLib.addListener(this);
			this.tab = new portalui_panel(this,{bound:[50,30,this.width - 100, this.height - 50], caption:""});						
			this.grid = new portalui_saiGrid(this.tab,{bound:[1,20,this.tab.width - 2,this.tab.height - 50],colCount:13,readOnly:true,dblClick:[this,"doGridDoubleClick"],
				colTitle:["NIK","Nama","Alamat","Tgl Lahir","Tempat Lahir","Jabatan","Telepon","Email","Agama","Kode Pos","Gender","Gelar","Status"],
				colWidth:[[12,11,10,9,8,7,6,5,4,3,2,1,0],[100,100,100,100,100,100,100,150,150,150,80,180,100]],rowSelect:true});            
			this.sgn = new portalui_sgNavigator(this.tab,{bound:[1,this.tab.height - 25,this.tab.width - 2,25],buttonStyle:1,grid:this.grid,pager:[this,"doPager"]});
			this.rowPerPage = 20;
			this.bClose = new portalui_imageButton(this.tab,{bound:[this.tab.width - 60,1,45,16],image:"icon/dynpro/pnlclose.png",click:[this,"doClick"]});			
		}catch(e){
			this.app.alert(e,"");
		}
    }
};
window.app_hrmis_sdm_dashboard_fTrail1.extend(window.portalui_childForm);
window.app_hrmis_sdm_dashboard_fTrail1.implement({    
	doClose: function(sender){        	
		if (this.trail2 !== undefined) this.trail2.close();
    },	
	doClick: function(sender){
		this.hide();
		this.callObj.unblock();
	},
	doPager: function(sender,page){
		this.dbLib.getDataProviderPageA(this.sql,page,this.rowPerPage);
		this.page = page;
	},
	setSQL: function(sql,sqlCount){
		this.sql = sql;
		this.sgn.setTotalPage(this.dbLib.getRowCount(sqlCount, this.rowPerPage));
		this.sgn.rearrange();
		this.sgn.activePage = 0;	
		this.sgn.setButtonStyle(4);			
		this.dbLib.getDataProviderPageA(this.sql,1,this.rowPerPage);		
		this.page = 1;
	},	
	setPanelCaption: function(data){
		this.tab.setCaption(data);
	},
	doRequestReady: function(sender, methodName, result){
		try{			
			if (sender == this.dbLib && methodName == "getDataProviderPage"){
				eval("result = "+result);
				if (typeof result != "string"){
					var line;
					this.grid.clear();
					for (var i in result.rs.rows){
						line = result.rs.rows[i];
						this.grid.appendData([line.nik, line.nama,line.alamat,line.tgl_lahir,line.tempat_lahir, line.jabatan, line.no_telp, line.email, line.agama, line.kode_pos, line.sex, line.status]);
					}
					this.grid.setNoUrut((this.page - 1) * this.rowPerPage);
				}else system.alert(result);
			}
		}catch(e){
			alert(e);
		}
	},
	doGridDoubleClick: function(sender, col, row){		
	}
});

window.app_hrmis_sdm_dashboard_fTrail2 = function(owner,options, callObj)
{
    if (owner)
    {
		try{
	        window.app_hrmis_sdm_dashboard_fTrail2.prototype.parent.constructor.call(this, owner,options);        
            this.className = "app_hrmis_sdm_dashboard_fTrail2";
            this.setCaption("Dashboard");
			this.callObj = callObj;
			this.setColor("");
			this.maximize();
			this.onClose.set(this,"doClose");						
			this.dbLib = new util_dbLib();
			this.dbLib.addListener(this);
			this.tab = new portalui_panel(this,{bound:[this.width / 2 - 300 ,30,600, this.height - 50], caption:""});						
			this.ed_klaim = new portalui_saiLabelEdit(this.tab,{bound:[20,1,300,20],caption:"No Klaim",readOnly:true});
			this.ed_polis = new portalui_saiLabelEdit(this.tab,{bound:[20,3,300,20],caption:"No Polis",readOnly:true});
			this.ed_dok = new portalui_saiLabelEdit(this.tab,{bound:[20,2,300,20],caption:"No Dokumen",readOnly:true});
			this.ed_tgl = new portalui_saiLabelEdit(this.tab,{bound:[20,3,200,20],caption:"Tgl Kejadian",readOnly:true});
			this.ed_lokasi = new portalui_saiLabelEdit(this.tab,{bound:[20,4,500,20],caption:"Lokasi",readOnly:true});
			this.ed_lokasiAlm = new portalui_saiLabelEdit(this.tab,{bound:[20,6,500,20],caption:"Lokasi Kejadian",readOnly:true});
			this.ed_obyek = new portalui_saiLabelEdit(this.tab,{bound:[20,5,500,20],caption:"Obyek Kerugian",readOnly:true});
			this.ed_sebab = new portalui_saiLabelEdit(this.tab,{bound:[20,6,500,20],caption:"Penyebab Kerugian",readOnly:true});
			this.ed_kurs = new portalui_saiLabelEdit(this.tab,{bound:[20,7,500,20],caption:"Kurs",readOnly:true});			
			this.ed_nilai = new portalui_saiLabelEdit(this.tab,{bound:[20,9,200,20],caption:"Nilai Estimasi",readOnly:true,tipeText:ttNilai});
			this.ed_adjust = new portalui_saiLabelEdit(this.tab,{bound:[20,8,200,20],caption:"Nilai Adjust",readOnly:true,tipeText:ttNilai});
			this.ed_bayar = new portalui_saiLabelEdit(this.tab,{bound:[20,9,200,20],caption:"Nilai Bayar",readOnly:true,tipeText:ttNilai});			
			this.ed_pic = new portalui_saiLabelEdit(this.tab,{bound:[20,6,500,20],caption:"Contact Person",readOnly:true});			
			this.ed_telp = new portalui_saiLabelEdit(this.tab,{bound:[20,7,500,20],caption:"No Telepon",readOnly:true});			
			this.ed_fax = new portalui_saiLabelEdit(this.tab,{bound:[20,8,500,20],caption:"No Fax",readOnly:true});
			this.ed_penyebab = new portalui_saiLabelEdit(this.tab,{bound:[20,9,500,20],caption:"Penyebab",readOnly:true});
			this.ed_tindakan = new portalui_saiLabelEdit(this.tab,{bound:[20,10,500,20],caption:"Tindakan",readOnly:true});
			this.tab.rearrangeChild(30,23);
			this.bClose = new portalui_imageButton(this.tab,{bound:[this.tab.width - 60,1,45,16],image:"icon/dynpro/pnlclose.png",click:[this,"doClick"]});			
		}catch(e){
			this.app.alert(e,"");
		}
    }
};
window.app_hrmis_sdm_dashboard_fTrail2.extend(window.portalui_childForm);
window.app_hrmis_sdm_dashboard_fTrail2.implement({    
	doClick: function(sender){
		this.hide();
		this.callObj.unblock();
	},
	setValue: function(value){
		var data = this.dbLib.getDataProvider("select a.no_klaim, a.kode_ttg, a.kode_lokasi, a.no_dokumen,a.no_polis, date_format(a.tanggal,'%d/%m/%Y') as tanggal, a.alamat, a.penyebab, "+
			"   a.nilai, a.kode_curr, a.tindakan, a.tgl_dokumen, a.nik_buat, a.tgl_input, a.kode_obyek, a.kode_sebab, "+
			"   a.kurs, a.kode_asuransi, a.kode_lok, a.periode, a.nik_user, a.pic, a.no_telp, a.no_fax, "+
			"   h.nama as nama_ttg,c.nama as nama_obyek,d.nama as nama_sebab,g.nama as nama_lok "+
						" from eclaim_klaim a inner join eclaim_lokasi b on b.kode_lokasi = a.kode_lokasi and b.kode_lok = a.kode_lok "+						
						"	left outer join eclaim_obyek c on c.kode_lokasi = a.kode_lokasi and c.kode_obyek = a.kode_obyek "+
						"	left outer join eclaim_sebab d on d.kode_lokasi = a.kode_lokasi and d.kode_sebab = a.kode_sebab "+
						"	left outer join eclaim_adjust e on e.kode_lokasi = a.kode_lokasi and e.no_klaim = a.no_klaim "+
						"	left outer join eclaim_bayar f on f.kode_lokasi = a.kode_lokasi and f.no_klaim = a.no_klaim "+
						"	left outer join eclaim_lokasi g on g.kode_lokasi = a.kode_lokasi and g.kode_lok = a.kode_lok "+
						"	left outer join eclaim_ttg h on h.kode_lokasi = a.kode_lokasi and h.kode_ttg = a.kode_ttg "+
						"where a.kode_lokasi = '"+this.app._lokasi+"' and  a.no_klaim = '"+value.klaim+"' ",true);
		if (typeof data != "string"){
			value = data.rs.rows[0];
			this.ed_klaim.setText(value.no_klaim);
			this.ed_dok.setText(value.no_dokumen);
			this.ed_tgl.setText(value.tanggal);
			this.ed_lokasi.setText(value.nama_lok);
			this.ed_obyek.setText(value.nama_obyek);
			this.ed_sebab.setText(value.nama_sebab);
			this.ed_nilai.setText(floatToNilai(parseFloat(value.nilai)));
			this.ed_adjust.setText(floatToNilai(parseFloat(value.adjust)));
			this.ed_bayar.setText(floatToNilai(parseFloat(value.bayar)));		
			this.ed_polis.setText(value.no_polis);
			this.ed_lokasiAlm.setText(value.alamat);
			this.ed_kurs.setText(value.kode_curr);
			this.ed_pic.setText(value.pic);
			this.ed_telp.setText(value.no_telp);
			this.ed_fax.setText(value.no_fax);
			this.ed_penyebab.setText(value.penyebab);
			this.ed_tindakan.setText(value.tindakan)
		}
	},
	setPanelCaption: function(data){
		this.tab.setCaption(data);
	}
});