window.app_eclaim_dashboard_fDbKlaim = function(owner)
{
	if (owner)
	{
		window.app_eclaim_dashboard_fDbKlaim.prototype.parent.constructor.call(this,owner);
		this.className  = "app_eclaim_dashboard_fDbKlaim";
		this.itemsValue = new arrayList();
		this.app._mainForm.childFormConfig(this, "mainButtonClick","", 2);	
		
		uses("saiCBBL;saiEdit;datePicker;saiGrid;sgNavigator;pageControl;server_report_report;childPage;panel;flashChart;timer;toolbar;pageControl;portalui_ConfirmMail;server_util_mail;util_filterRep;util_standar;util_gridLib");
		this.filterRep = new util_filterRep();
		this.standar = new util_standar();	
		this.gridLib = new util_gridLib();
		this.dbLib = this.app.dbLib;
		this.dbLib.addListener(this);
		//this.p1 = new panel(this,{bound:[20,10,702,110],border:3, caption:"Filter"});
		
		this.pc1 = new pageControl(this,{bound:[15,12,1000,500], childPage:["Filter","Bulan Kejadian","Obyek Kerugian","Penyebab Kerugian","Lokasi","Kota","Proses Klaim","Data Klaim","Summary Klaim","Riwayat Klaim"]});
		this.bPrint = new imageButton(this.pc1.childPage[7],{bound:[850,0,22,20], hint:"Print", image:"icon/"+system.getThemes()+"/print.png",click:[this,"doPrintClick"]});
		this.bExcel = new imageButton(this.pc1.childPage[7],{bound:[873,0,22,20], hint:"Excel", image:"icon/"+system.getThemes()+"/excel.png", click:[this,"doPrintClick"]});
		this.bEmail = new imageButton(this.pc1.childPage[7],{bound:[896,0,22,20], hint:"Email", image:"icon/"+system.getThemes()+"/sendMail.png",click:[this,"doPrintClick"]});
		
		this.sg1 = new saiGrid(this.pc1.childPage[0],{bound:[1,20,700,97],colCount:4,cellExit:[this,"doCellExit"],
				selectCell:[this,"doSelectCell"],ellipsClick:[this,"doEllipseClick"],change:[this,"sg1onChange"],
				colWidth:[[0,2,3],[250,150,150]],colTitle:["Filter","Type","Form","To"], 
				buttonStyle:[[1],[bsAuto]],columnReadOnly:[true,[0],[]],rowCount:2});
		this.periode=this.dbLib.getPeriodeFromSQL("select max(substring(periode,1,4)) as periode from eclaim_klaim");
		this.gridLib.SGEditData(this.sg1,0,new Array(0,1,2), new Array("Tahun","=",this.periode));
		this.gridLib.SGEditData(this.sg1,1,new Array(0,1,2), new Array("Jenis","=","Jumlah"));
		var frameWidth = 970;
        this.fr1 = new panel(this.pc1.childPage[1],{bound:[10,10,frameWidth,480],caption:"Klaim Per Bulan"});									            		        							
		this.fr1.bGraph = new imageButton(this.fr1,{bound:[frameWidth - 50,2,16,16],image:"icon/dynpro/graph16.png",hint:"Mode Graphic",click:[this,"doBtnClick"], name:"graph"});
		this.fr1.bGrid = new imageButton(this.fr1,{bound:[frameWidth - 25,2,16,16],image:"icon/dynpro/tabContent2.png",hint:"Mode Table",click:[this,"doBtnClick"], name:"grid"});
		this.fr1.grid = new saiGrid(this.fr1,{bound:[5,30,this.fr1.getClientWidth() - 30,this.fr1.getClientHeight() - 50],colCount:2,colTitle:["Group By","Jumlah"],visible:false, readOnly:true, dblClick:[this,"doGridClick"],colWidth:[[1,0],[100,200]], colAlign:[[1],[alCenter]]});		         	                        
		this.fr1.chart = new flashChart(this.fr1,{bound:[5,30,this.fr1.getClientWidth() - 30,this.fr1.getClientHeight() - 50],objectReady:[this,"doObjectReady"],title:"Bulan",name:"fr1"});		         	                        

		this.fr2 = new panel(this.pc1.childPage[2],{bound:[10,10,frameWidth,480],caption:"Klaim Per Obyek"});									            		        							
		this.fr2.bGraph = new imageButton(this.fr2,{bound:[frameWidth - 50,2,16,16],image:"icon/dynpro/graph16.png",hint:"Mode Graphic",click:[this,"doBtnClick"], name:"graph"});
		this.fr2.bGrid = new imageButton(this.fr2,{bound:[frameWidth - 25,2,16,16],image:"icon/dynpro/tabContent2.png",hint:"Mode Table",click:[this,"doBtnClick"], name:"grid"});
		this.fr2.grid = new saiGrid(this.fr2,{bound:[5,30,this.fr2.getClientWidth() - 30,this.fr2.getClientHeight() - 50],colCount:2,colTitle:["Group By","Jumlah"],visible:false, readOnly:true, dblClick:[this,"doGridClick"],colWidth:[[1,0],[100,200]], colAlign:[[1],[alCenter]]});		         	                        
		this.fr2.chart = new flashChart(this.fr2,{bound:[5,30,this.fr2.getClientWidth() - 30,this.fr2.getClientHeight() - 50],objectReady:[this,"doObjectReady"],title:"Obyek Kerugian"});		         	                        

		this.fr3 = new panel(this.pc1.childPage[3],{bound:[10,10,frameWidth,480],caption:"Klaim Per Penyebab"});									            		        							
		this.fr3.bGraph = new imageButton(this.fr3,{bound:[frameWidth - 50,2,16,16],image:"icon/dynpro/graph16.png",hint:"Mode Graphic",click:[this,"doBtnClick"], name:"graph"});
		this.fr3.bGrid = new imageButton(this.fr3,{bound:[frameWidth - 25,2,16,16],image:"icon/dynpro/tabContent2.png",hint:"Mode Table",click:[this,"doBtnClick"], name:"grid"});
		this.fr3.grid = new saiGrid(this.fr3,{bound:[5,30,this.fr3.getClientWidth() - 30,this.fr3.getClientHeight() - 50],colCount:2,colTitle:["Group By","Jumlah"],visible:false, readOnly:true, dblClick:[this,"doGridClick"],colWidth:[[1,0],[100,200]], colAlign:[[1],[alCenter]]});		         	                        
		this.fr3.chart = new flashChart(this.fr3,{bound:[5,30,this.fr3.getClientWidth() - 30,this.fr3.getClientHeight() - 50],objectReady:[this,"doObjectReady"],title:"Penyebab Kerugian"});		         	                        

		this.fr4 = new panel(this.pc1.childPage[4],{bound:[10,10,frameWidth,480],caption:"Klaim Per Kelompok Lokasi"});									            		        							
		this.fr4.bGraph = new imageButton(this.fr4,{bound:[frameWidth - 50,2,16,16],image:"icon/dynpro/graph16.png",hint:"Mode Graphic",click:[this,"doBtnClick"], name:"graph"});
		this.fr4.bGrid = new imageButton(this.fr4,{bound:[frameWidth - 25,2,16,16],image:"icon/dynpro/tabContent2.png",hint:"Mode Table",click:[this,"doBtnClick"], name:"grid"});
		this.fr4.grid = new saiGrid(this.fr4,{bound:[5,30,this.fr4.getClientWidth() - 30,this.fr4.getClientHeight() - 50],colCount:2,colTitle:["Group By","Jumlah"],visible:false, readOnly:true, dblClick:[this,"doGridClick"],colWidth:[[1,0],[100,200]], colAlign:[[1],[alCenter]]});		         	                        
		this.fr4.chart = new flashChart(this.fr4,{bound:[5,30,this.fr4.getClientWidth() - 30,this.fr4.getClientHeight() - 50],objectReady:[this,"doObjectReady"],title:"Lokasi"});		         	                        

		this.fr6 = new panel(this.pc1.childPage[5],{bound:[10,10,frameWidth,480],caption:"Klaim Per Lokasi"});									            		        							
		this.fr6.bGraph = new imageButton(this.fr6,{bound:[frameWidth - 50,2,16,16],image:"icon/dynpro/graph16.png",hint:"Mode Graphic",click:[this,"doBtnClick"], name:"graph"});
		this.fr6.bGrid = new imageButton(this.fr6,{bound:[frameWidth - 25,2,16,16],image:"icon/dynpro/tabContent2.png",hint:"Mode Table",click:[this,"doBtnClick"], name:"grid"});
		this.fr6.grid = new saiGrid(this.fr6,{bound:[5,30,this.fr6.getClientWidth() - 30,this.fr6.getClientHeight() - 50],colCount:2,colTitle:["Group By","Jumlah"],visible:false, readOnly:true, dblClick:[this,"doGridClick"],colWidth:[[1,0],[100,200]], colAlign:[[1],[alCenter]]});		         	                        
		this.fr6.chart = new flashChart(this.fr6,{bound:[5,30,this.fr6.getClientWidth() - 30,this.fr6.getClientHeight() - 50],objectReady:[this,"doObjectReady"],title:"Lokasi"});		         	                        
		
		this.fr7 = new panel(this.pc1.childPage[6],{bound:[10,10,frameWidth,480],caption:"Klaim Per Proses"});									            		        							
		this.fr7.bGraph = new imageButton(this.fr7,{bound:[frameWidth - 50,2,16,16],image:"icon/dynpro/graph16.png",hint:"Mode Graphic",click:[this,"doBtnClick"], name:"graph"});
		this.fr7.bGrid = new imageButton(this.fr7,{bound:[frameWidth - 25,2,16,16],image:"icon/dynpro/tabContent2.png",hint:"Mode Table",click:[this,"doBtnClick"], name:"grid"});
		this.fr7.grid = new saiGrid(this.fr7,{bound:[5,30,this.fr7.getClientWidth() - 30,this.fr7.getClientHeight() - 50],colCount:2,colTitle:["Group By","Jumlah"],visible:false, readOnly:true, dblClick:[this,"doGridClick"],colWidth:[[1,0],[100,200]], colAlign:[[1],[alCenter]]});		         	                        
		this.fr7.chart = new flashChart(this.fr7,{bound:[5,30,this.fr7.getClientWidth() - 30,this.fr7.getClientHeight() - 50],objectReady:[this,"doObjectReady"],title:"Lokasi"});		         	                        

		this.sg = new saiGrid(this.pc1.childPage[7],{bound:[1,11,this.pc1.width-5,this.pc1.height-50],colCount:9,tag:9,
		            colTitle:["No Klaim","No Dokumen","Tgl Terima","Lokasi","Obyek","Penyebab","Nilai Estimasi","Nilai Adjust","Nilai Deductable"],
					colWidth:[[8,7,6,5,4,3,2,1,0],[100,100,100,150,150,150,80,180,100]], colFormat:[[8,7,6],[cfNilai,cfNilai, cfNilai]],
					readOnly:true,autoAppend:true,defaultRow:1,
					selectCell:[this,"doSgClick"]});
		this.sgn = new portalui_sgNavigator(this.pc1.childPage[7],{bound:[1,this.pc1.height-25,this.pc1.width-1,25],buttonStyle:bsViewExt,grid:this.sg,pager:[this,"doPager"]});
		
		var cnv = this.pc1.childPage[8].getClientCanvas();
			this.pc1.childPage[8].addStyle("background:#ffffff");
			this.docViewer = document.createElement("iframe");
			this.docViewer.frameBorder = 0;
			this.docViewer.id = this.getFullId()+"_viewer";
			this.docViewer.style.cssText = "width:100%;height:100%";		
			cnv.appendChild(this.docViewer);
			
		var cnv = this.pc1.childPage[9].getClientCanvas();
			this.pc1.childPage[9].addStyle("background:#ffffff");
			this.docViewer2 = document.createElement("iframe");
			this.docViewer2.frameBorder = 0;
			this.docViewer2.id = this.getFullId()+"_viewer";
			this.docViewer2.name = this.getFullId()+"_viewer";
			this.docViewer2.style.cssText = "width:100%;height:100%";		
			cnv.appendChild(this.docViewer2);
			
		this.rearrangeChild(10, 23);
		this.pc1.childPage[0].rearrangeChild(10, 22);
		this.pc1.childPage[1].rearrangeChild(10, 22);
		this.pc1.childPage[2].rearrangeChild(10, 22);
		this.pc1.childPage[3].rearrangeChild(10, 22);
		
		this.timer = new timer(this);
        this.timer.setInterval(1000);
        this.timer.setEnabled(false);
        this.timer.onTimer.set(this,"doTimer");
		
		this.maximize();		
		this.setTabChildIndex();
		this.pager=50;
		if (this.app.mail == undefined)
			this.app.mail = new server_util_mail(undefined,this.app._lokasi);
		this.mail = this.app.mail;
		this.mail.addListener(this);
		this.onClose.set(this,"doClose");
		
	}
};
window.app_eclaim_dashboard_fDbKlaim.extend(window.childForm);
window.app_eclaim_dashboard_fDbKlaim.implement({
	doClose: function(sender){
		this.dbLib.delListener(this);
		this.mail.delListener(this);
	},
	doPrintClick : function(sender){
		switch (sender){
			case this.bPrint :
				var win = window.open("");
				win.document.write(loadCSS("server_util_laporan"));
				win.document.write(this.docViewer.contentWindow.document.body.innerHTML);
				win.document.close();
			break;
			case this.bExcel :
				 var html = new server_util_arrayList();
				html.add(this.docViewer.contentWindow.document.body.innerHTML);			
				html.add("xls");			
				html.add(new Date().valueOf());				
			    var win = window.open("");
				win.location = upDownHtml(html);
			break;
			case this.bEmail :
				this.mailFrm = new portalui_ConfirmMail(this);
				this.mailFrm.setBound((this.width/2)-125,this.height/2-100,250,100);
				this.mailFrm.setCaption(this.mailFrm.title);
				this.mailFrm.setBorder(3);
				this.mailFrm.onConfirmClick.set(this, "doConfirmClick");
			break;
		}
	},
	doConfirmClick: function(sender){
		try{
			
			if (sender === this.mailFrm.bConfirm){
				var to = this.mailFrm.getEmail();
				if (to !== ""){
					this.mailFrm.free();
					var d = new Date();
					var subject = this.app._namaForm;
					var pesan = loadCSS("server_util_laporan")+this.docViewer.contentWindow.document.body.innerHTML;
					this.mail.send(undefined,to,subject,pesan, undefined, this);
				}else{
					systemAPI.alert("Alamat email belum diisi!");
				}
			}
		}catch(e){
			alert("[doConfirmClick]: sender= "+sender+"; error= "+e);
		}
	},
	doEllipseClick:function(sender, col, row)
	{
		
	},
	doSelectCell:function(sender, col, row)
	{
		this.filterRep.setSGFilterRowTipe(this.sg1, row,[0,1],["3","3"]);
		this.filterRep.setSGFilterRowButtonStyle(this.sg1, row,[0,1],[0,0]);
		if (row == 0)
		{
			this.sg1.columns.get(2).pickList.clear();
			this.dbLib.setItemsFromSQL("select distinct substring(periode,1,4) from eclaim_klaim order by periode desc",[this.sg1.columns.get(2).pickList]);
		}
		if (row == 1)
		{
			this.sg1.columns.get(2).pickList.clear();
			this.gridLib.SGIsiItemsFromArray(this.sg1.columns.get(2).pickList,new Array("Periode","Obyek Kerugian","Penyebab Kerugian","Lokasi"));
		}
	},
	mainButtonClick:function(sender)
	{
		try
		{
			if (sender == this.app._mainForm.bClear2)
			{ 
				this.gridLib.SGEditData(this.sg1,0,new Array(0,1,2), new Array("Kode Lokasi","=",this.app._lokasi));
				this.gridLib.SGEditData(this.sg1,1,new Array(0,1,2), new Array("Periode","=",this.app._periode));
				this.gridLib.SGEditData(this.sg1,2,new Array(0,1,2), new Array("Kode Akun","All",""));
			}
			else
			{
				this.tahun=this.sg1.getCell(2,0);
				this.user_lok="";
				if (this.app._userStatus=="U")
				{
					this.user_lok=" and a.kode_lok='"+this.app._kodeLok+"'";
				}
				
				this.pc1.setActivePage(this.pc1.childPage[1]);
				var sql = new server_util_arrayList();
				sql.add("select case substring(a.periode,5,2) when '01' then 'Januari'  "+
						"when '02' then 'Februari'  "+
						"when '03' then 'Maret'  "+
						"when '04' then 'April'  "+
						"when '05' then 'Mei'  "+
						"when '06' then 'Juni'  "+
						"when '07' then 'Juli'  "+
						"when '08' then 'Agustus'  "+
						"when '09' then 'September'  "+
						"when '10' then 'Oktober'  "+
						"when '11' then 'November'  "+
						"when '12' then 'Desember'  "+
						"end as nama,count(a.no_klaim) as tot "+
						"from eclaim_klaim a "+
						"where substring(a.periode,1,4)='"+this.tahun+"' "+this.user_lok+" and a.kode_ttg='"+this.app._kodeTtg+"' "+
						"group by a.periode");
				
				sql.add("select a.nama,b.tot "+
						"from eclaim_obyek a "+
						"inner join (select a.kode_obyek,a.kode_ttg,count(a.no_klaim) as tot "+
						"from eclaim_klaim a "+
						"where substring(a.periode,1,4)='"+this.tahun+"' "+this.user_lok+" and a.kode_ttg='"+this.app._kodeTtg+"' "+
						"group by a.kode_obyek,a.kode_ttg "+
						")b on a.kode_obyek=b.kode_obyek and a.kode_ttg=b.kode_ttg "+
						"where a.kode_ttg='"+this.app._kodeTtg+"'");
				sql.add("select a.nama,b.tot "+
						"from eclaim_sebab a "+
						"inner join (select a.kode_sebab,a.kode_ttg,count(a.no_klaim) as tot "+
						"from eclaim_klaim a "+
						"where substring(a.periode,1,4)='"+this.tahun+"' "+this.user_lok+" and a.kode_ttg='"+this.app._kodeTtg+"' "+
						"group by a.kode_sebab,a.kode_ttg "+
						")b on a.kode_sebab=b.kode_sebab and a.kode_ttg=b.kode_ttg "+
						"where a.kode_ttg='"+this.app._kodeTtg+"'");
				sql.add("select a.nama,b.tot "+
						"from eclaim_lokasi a "+
						"inner join (select b.kode_lok,a.kode_ttg,count(a.no_klaim) as tot "+
						"from eclaim_klaim a "+
						"inner join eclaim_lokasi b on a.kode_lok=b.kode_lok "+ 
						"where substring(a.periode,1,4)='"+this.tahun+"' "+this.user_lok+" and a.kode_ttg='"+this.app._kodeTtg+"' "+
						"group by b.kode_lok,a.kode_ttg "+
						")b on a.kode_lok=b.kode_lok and a.kode_ttg=b.kode_ttg "+
						"where a.kode_ttg='"+this.app._kodeTtg+"'");
				sql.add("select a.nama,b.tot "+
						"from eclaim_kota a "+
						"inner join (select a.kode_kota,a.kode_ttg,count(a.no_klaim) as tot "+
						"from eclaim_klaim a "+
						"where substring(a.periode,1,4)='"+this.tahun+"' "+this.user_lok+" and a.kode_ttg='"+this.app._kodeTtg+"' "+
						"group by a.kode_kota,a.kode_ttg "+
						")b on a.kode_kota=b.kode_kota and a.kode_ttg=b.kode_ttg "+
						"where a.kode_ttg='"+this.app._kodeTtg+"'");
				sql.add("select a.nama,b.tot "+
						"from eclaim_proses a "+
						"inner join (select a.progress,a.kode_ttg,count(a.no_klaim) as tot "+
						"from eclaim_klaim a "+
						"where substring(a.periode,1,4)='"+this.tahun+"' "+this.user_lok+" and a.kode_ttg='"+this.app._kodeTtg+"' "+
						"group by a.progress,a.kode_ttg "+
						")b on a.kode_proses=b.progress and a.kode_ttg=b.kode_ttg "+
						"where a.kode_ttg='"+this.app._kodeTtg+"' order by a.kode_proses");
				
				this.dbLib.getMultiDataProviderA(sql, undefined, this);
				this.count = 0;
				this.sql = sql;
			}
		}catch(e)
		{
			alert("[app_budget_report_flAggRkap]::mainButtonClick:"+e);
		}
	},
	
	doTimer: function(sender){
		this.timer.setEnabled(false);
		if (this.pc1.activePage == this.pc1.childPage[1].resourceId){
			this.getChart(this.fr1.chart.data, this.fr1.chart);
			this.getChart(this.fr2.chart.data, this.fr2.chart);
			this.getChart(this.fr3.chart.data, this.fr3.chart);
			this.getChart(this.fr4.chart.data, this.fr4.chart);
			this.getChart(this.fr6.chart.data, this.fr6.chart);
			this.getChart(this.fr7.chart.data, this.fr7.chart);
			this.fr1.chart.refresh();
			this.fr2.chart.refresh();
			this.fr3.chart.refresh();
			this.fr4.chart.refresh();
			this.fr6.chart.refresh();
			this.fr7.chart.refresh();
		}
		
	},
	getChart: function(data,swf,autoRefresh){
		if (data === undefined) return;
		if (data.rs === undefined) return;
		
		
		var chart = {
		  "bg_colour":"#edf5f8",
		  "y_legend":{
			"text": "Jumlah","style": "{color: #736AFF; font-size: 12px;}"
		  },
		  "elements":[],
		  "x_axis":{
			"stroke": 1,"tick_height": 10,"colour":"#d000d0","grid_colour": "#00ff00","labels":{"labels":[],"rotate": -45},"3d": 5 
		   },
		  "y_axis":{
			"stroke":4,"tick_length": 3,"colour":"#d000d0","grid_colour": "#00ff00","offset":0,"max":20,"steps":10
		  },
		  "tooltip":{
			"text": "Global Tooltip<br>val=#val#, top=#top#"
		  }
		};  
		var line,temp="", maxValue = -999999999,minValue = 999999999;				
		if (data.rs.rows[0]!==undefined)
		{
		    temp = {"type":"bar_3d","alpha":     1.8,"colour":    "#418aac",
				
				  "font-size--": 10,
				  "linkCtrl": swf.resourceId.toString(),
				  "on-click": "system.getResource("+this.resourceId+").doChartClick",
				  "values" :   [],
				  "on-show":	{"type": (!systemAPI.browser.msie ? "grow-up":"")}
				}		
			var key = [];
			for (var i in data.rs.rows){
				line = data.rs.rows[i];  						
				var r = Math.floor(Math.random()*256),g = Math.floor(Math.random()*256),b = Math.floor(Math.random()*256);
				var color = (r+256 * g + 65536 * b).toString(16);
				temp.values.push(parseFloat(line.tot));
				chart.x_axis.labels.labels.push(line.nama);
				if (parseFloat(line.tot) > maxValue ) maxValue = parseFloat(line.tot);
				if (parseFloat(line.tot) < minValue ) minValue = parseFloat(line.tot);		
				key.push(line.nama);
			}	
			chart.elements.push(temp);		
		}else{
			var line,temp="", maxValue = 0,minValue = 0;
			var r = Math.floor(Math.random()*256),g = Math.floor(Math.random()*256),b = Math.floor(Math.random()*256);
				var color = (r+256 * g + 65536 * b).toString(16);
				temp = {"type":"bar_3d","alpha":     1.8,"colour":    "#"+ color,
				  "tip":       "",
				  "text--":      "",
				  "font-size--": 10,
				  "on-click": "system.getResource("+this.resourceId+").doChartClick",
				  "values" :   [0],
				  "on-show":	{"type": (!systemAPI.browser.msie ? "grow-up":"")}
				};
				chart.elements.push(temp);	
		}    			
			
		chart.y_axis.max = maxValue + 10;	
		swf.keyIndex = key;		
		swf.setChartData(chart); 
		
	},  
	doObjectReady: function(sender){
	   try{	 
			if (sender.data != undefined){
				this.getChart(sender.data,sender);
				sender.refresh();
			}
			/*this.count++;
		    if (this.pc1.activePage == this.pc1.childPage[1].resourceId  ){
				this.timer.setEnabled(true);
				this.count = 0;
			}else if (this.pc1.activePage == this.pc1.childPage[2].resourceId && this.count == 5){
				this.timer.setEnabled(true);
				this.count = 0;
			}*/
        }catch(e){
            alert(e);
        }
    },    
	doChartClick: function(sender,index,title){	
		eval("sender="+sender+"");
		try{
			var sql="select a.no_klaim, a.no_dokumen, date_format(a.tanggal,'%d-%m-%Y') as tanggal, b.nama as nama_lok, c.nama as nama_obyek, d.nama as nama_sebab, a.nilai, e.nilai as nilai_adjust, e.nilai_ddct as nilai_bayar "+
					" from eclaim_klaim a "+
					" inner join eclaim_lokasi b on b.kode_lok = a.kode_lok and b.kode_ttg = a.kode_ttg "+
					" inner join eclaim_obyek c on c.kode_obyek = a.kode_obyek and c.kode_ttg = a.kode_ttg "+
					" inner join eclaim_sebab d on d.kode_sebab = a.kode_sebab and d.kode_ttg = a.kode_ttg "+
					" inner join eclaim_kota f on  a.kode_kota = f.kode_kota and b.kode_ttg = f.kode_ttg "+
					" left join eclaim_adjust e on e.no_klaim = a.no_klaim and e.status = '1' and a.kode_ttg = e.kode_ttg "+
					" left join eclaim_proses g on a.progress=g.kode_proses ";
			var title = sender.keyIndex[index];
	
			if (sender==this.fr1.chart)
			{
				var periode="";
				if (title=="januari") {periode=this.tahun+"01";}
				if (title=="februari") {periode=this.tahun+"02";}
				if (title=="maret") {periode=this.tahun+"03";}
				if (title=="april") {periode=this.tahun+"04";}
				if (title=="mei") {periode=this.tahun+"05";}
				if (title=="juni") {periode=this.tahun+"06";}
				if (title=="juli") {periode=this.tahun+"07";}
				if (title=="agustus") {periode=this.tahun+"08";}
				if (title=="september") {periode=this.tahun+"09";}
				if (title=="oktober") {periode=this.tahun+"10";}
				if (title=="november") {periode=this.tahun+"11";}
				if (title=="desember") {periode=this.tahun+"12";}
				sql=sql+"where a.periode='"+periode+"' "+this.user_lok+" and a.kode_ttg='"+this.app._kodeTtg+"' ";
			}
			
			if (sender==this.fr2.chart)
			{
				sql=sql+"where c.nama='"+title+"' and substring(a.periode,1,4)='"+this.tahun+"' "+this.user_lok+" and a.kode_ttg='"+this.app._kodeTtg+"' ";
			}
			if (sender==this.fr3.chart)
			{
				sql=sql+"where d.nama='"+title+"' and substring(a.periode,1,4)='"+this.tahun+"' "+this.user_lok+" and a.kode_ttg='"+this.app._kodeTtg+"' ";
			}
			if (sender==this.fr4.chart)
			{
				sql=sql+"where f.nama='"+title+"' and substring(a.periode,1,4)='"+this.tahun+"' "+this.user_lok+" and a.kode_ttg='"+this.app._kodeTtg+"' ";
			}
			if (sender==this.fr6.chart)
			{
				sql=sql+"where b.nama='"+title+"' and substring(a.periode,1,4)='"+this.tahun+"' "+this.user_lok+" and a.kode_ttg='"+this.app._kodeTtg+"' ";
			}
			if (sender==this.fr7.chart)
			{
				sql=sql+"where g.nama='"+title+"' and substring(a.periode,1,4)='"+this.tahun+"' "+this.user_lok+" and a.kode_ttg='"+this.app._kodeTtg+"' ";
			}
			sql=sql+" order by a.no_klaim";			
			
			var data = this.dbLib.getDataProvider(sql,true);
			if (typeof data == "object" && data.rs.rows[0] != undefined){
				var line;
				this.dataJU = data;
				this.sgn.setTotalPage(Math.ceil(data.rs.rows.length/this.pager));
				this.sgn.rearrange();
				this.doTampilData(1);
				this.pc1.setActivePage(this.pc1.childPage[7]);
			
			} else this.sg.clear(1);
		}
		catch (e){
			alert(e);
		}
	},
	doTampilData: function(page) {
		this.sg.clear();
		this.page = page;
		var start = (page - 1) * this.pager;
		var finish = (start + this.pager > this.dataJU.rs.rows.length? this.dataJU.rs.rows.length:start+this.pager);
		for (var i=start;i<finish;i++){
			line = this.dataJU.rs.rows[i];							
			this.sg.appendData([line.no_klaim,line.no_dokumen,line.tanggal,line.nama_lok,line.nama_obyek,line.nama_sebab,floatToNilai(line.nilai),floatToNilai(line.nilai_adjust),floatToNilai(line.nilai_bayar)]);
		}
		this.sg.setNoUrut(start);
	},
	doRequestReady: function(sender, methodName, result, callbackObj){
		if (sender == this.mail && this == callbackObj){
			error_log(result);
		}
		if (sender == this.dbLib && this == callbackObj){
	       try{
    	       switch(methodName){
    	           case "getMultiDataProvider":					
    	                var data = JSON.parse(result);
    	                if (typeof data != "string"){
    	                    this.count = 0;
							this.dataProvider = data;			
							this.fr1.chart.data = data.result[0];
							this.fr1.sql = this.sql.get(0);	
            		        this.setData(this.fr1.grid,data.result[0]);
							this.getChart(this.fr1.chart.data,this.fr1.chart);
							this.fr1.chart.refresh();
							
							this.fr2.chart.data = data.result[1];
							this.fr2.sql = this.sql.get(1);	
            		        this.setData(this.fr2.grid,data.result[1]);
							this.getChart(this.fr2.chart.data,this.fr2.chart);
							this.fr2.chart.refresh();
							
							this.fr3.chart.data = data.result[2];
							this.fr3.sql = this.sql.get(2);	
            		        this.setData(this.fr3.grid,data.result[2]);
							this.getChart(this.fr3.chart.data,this.fr3.chart);
							this.fr3.chart.refresh();
							
							this.fr4.chart.data = data.result[3];
							this.fr4.sql = this.sql.get(3);	
            		        this.setData(this.fr4.grid,data.result[3]);
							this.getChart(this.fr4.chart.data,this.fr4.chart);
							this.fr4.chart.refresh();
							
							this.fr6.chart.data = data.result[4];
							this.fr6.sql = this.sql.get(4);	
            		        this.setData(this.fr6.grid,data.result[4]);
							this.getChart(this.fr6.chart.data,this.fr6.chart);
							this.fr6.chart.refresh();
							
							this.fr7.chart.data = data.result[5];
							this.fr7.sql = this.sql.get(5);	
            		        this.setData(this.fr7.grid,data.result[5]);
							this.getChart(this.fr7.chart.data,this.fr7.chart);
							this.fr7.chart.refresh();
						}else throw result;
    	           break;
               }
            }catch(e){
                systemAPI.alert(this+"$request()",e+":"+result);
            }
       }
    },
	setData: function(grid, data){
		grid.clear();
		for (var i in data.rs.rows){
			grid.appendData([data.rs.rows[i].nama, data.rs.rows[i].tot]);
		}	
		
	},
	
	doSgClick: function(sender, col , row) 
	{
		try{
		
			this.report = new server_report_report();
			this.filter = "where a.no_klaim='"+this.sg.cells(0,row)+"'";
			this.showFilter = "";
			this.lokasi = "";
			this.filter2 = "";
			this.docViewer.src = this.report.previewWithHeader("server_report_eclaim_rptRwyKlaimSum",this.filter, 1,1, this.showFilter, this.lokasi,this.filter2)+"&resource="+ this.resourceId+"&fullId="+this.getFullId();
			this.docViewer2.src = this.report.previewWithHeader("server_report_eclaim_rptRwyKlaim",this.filter, 1,1, this.showFilter, this.lokasi,this.filter2)+"&resource="+ this.resourceId+"&fullId="+this.getFullId();
			this.pc1.setActivePage(this.pc1.childPage[8]);
			
			

			
		}catch(e){
			alert(e);
		}
	},
	
	
	doPager: function(sender, page) {
		this.doTampilData(page);
	},
	doOpenDoc: function(){
	   this.pc1.setActivePage(this.pc1.childPage[8]);
	}
});
