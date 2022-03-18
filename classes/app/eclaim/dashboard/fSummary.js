/***********************************************************************************************
*	Copyright (c) 2008 SAI, PT and Salltanera Teknologi, PT   and Others 		
*	 All rights reserved. This program and the accompanying materials
*	 are made available under the terms of the Common Public License v1.0
*	 which accompanies this distribution, and is available at												
*	Contributors 
* 			SAI, PT											
***********************************************************************************************/
window.app_eclaim_dashboard_fSummary = function(owner,options)
{
    if (owner)
    {
		try{
	        window.app_eclaim_dashboard_fSummary.prototype.parent.constructor.call(this, owner,options);        
            this.className = "app_eclaim_dashboard_fSummary";
            this.setCaption("Dashboard");
			this.onClose.set(this,"doClose");		
			this.maximize();
			this.app._mainForm.pButton.hide();
			this.app._mainForm.childFormConfig(this, "mainButtonClick","Dashboard", 99);	
			uses("portalui_tabPage;portalui_childPage;portalui_panel;portalui_flashChart;portalui_saiGrid;portalui_timer;util_filterRep;portalui_toolbar;portalui_roundPanel");			
			this.dbLib = new util_dbLib();
			this.dbLib.addListener(this);
			this.tab = new portalui_tabPage(this,{bound:[0,0,this.width - 2, this.height - 5],borderColor:"#35aedb", tabChange:[this,"doTabChange"], headerAutoWidth:false});			
			this.tab.actClr = "#299fcb";this.tab.deactClr = "#35aedb";	        
			this.tab.setHeaderHeight(30);
			this.tab.addPage(["Klaim by Frekuensi","Klaim by Amount"]); 
			this.tab.roundedHeader(8);
			this.toolbar = new portalui_toolbar(this,{bound:[this.width - 100,0,80,25],buttonClick:[this,"doToolBarClick"]});
			this.toolbar.addButton("bFilter","Filter","icon/dynpro/filter2.png","Filter");			
			this.toolbar.makeRound(5);
			this.pFilter = new portalui_roundPanel(this,{bound:[this.width - 520,35,500,235],caption:"Filter",visible:false,background:"image/themes/dynpro/roundpanelBgCenter.png",icon:"image/themes/dynpro/iconpanel.png",color:"#edf5f8",titleBg:"#95cae8"});                      
            this.bApply = new portalui_button(this.pFilter,{bound:[10,160,80,20],caption:"Apply",click:[this,"doClick"]});
			this.sgFilter = new portalui_saiGrid(this.pFilter,{bound:[10,0,this.pFilter.width - 30,150],colCount:4,rowCount:2,
				colTitle:["Filter","Type","Value1","Value2"],selectCell:[this,"doSelectFilterCell"],ellipsClick:[this,"doEllipsFilterClick"],
				colWidth:[[3,2,1,0],[100,100,60,150]]});
			this.sgFilter.columns.get(1).setButtonStyle(window.bsAuto);
			var val = new portalui_arrayMap({items:["All","=","Range","Like","<="]});			
			this.sgFilter.columns.get(1).setPicklist(val);
            this.pFilter.setTabChildIndex();			
			this.filter = "";			
			this.sgFilter.editData(0,["Tahun","All","",""]);
			this.sgFilter.editData(1,["Tertanggung","=",this.app._kodeTtg,""]);			
			this.filterRep = new util_filterRep();			
			
			this.initComp("");		
            this.timer = new portalui_timer(this);
            this.timer.setInterval(1000);
            this.timer.setEnabled(false);
            this.timer.onTimer.set(this,"doTimer");
		}catch(e){
			this.app.alert(e,"");
		}
    }
};
window.app_eclaim_dashboard_fSummary.extend(window.portalui_childForm);
window.app_eclaim_dashboard_fSummary.implement({
    doClose: function(sender){
        this.app._mainForm.pButton.show();
		if (this.trail1 !== undefined) this.trail1.close();		
    },	
	doAfterResize: function(width, height){
		this.setTop(55);
		this.setHeight(height + 40);
	},
	doToolBarClick: function(sender, id){
	   switch(id){
	       case "bFilter" :   
	           this.pFilter.setVisible(!this.pFilter.visible);
	       break;
       }	   
    },	
	doClick: function(sender){
        try{
            if (sender == this.bApply){
                this.filter = this.filterRep.filterStr("substr(a.periode,1,4)",this.sgFilter.getCell(1,0),this.sgFilter.getCell(2,0),this.sgFilter.getCell(3,0),"and") +			    
					this.filterRep.filterStr("a.kode_ttg",this.sgFilter.getCell(1,1),this.sgFilter.getCell(2,1),this.sgFilter.getCell(3,1),"and");				
    	        this.pFilter.hide();
				this.initComp(this.filter);
            }            
       }catch(e){
            alert(e);
       }
    },	
	doSelectFilterCell: function(sender, col, row){
		try{
			sender.columns.get(2).setReadOnly(false);
			sender.columns.get(2).setReadOnly(true);
			this.filterRep.setSGFilterRowTipe(sender, row,new Array(0,1),new  Array("123","123"));			
			this.filterRep.setSGFilterRowButtonStyle(sender, row,new Array(0,1),new  Array(0,2));
			if (row == 0){			
				var rs = this.dbLib.runSQL("select distinct substr(periode,1,4) as periode from eclaim_klaim where kode_lokasi='"+this.app._lokasi+"' order by substr(periode,1,4) ");			
				if (rs instanceof portalui_arrayMap){
					sender.columns.get(2).pickList.clear();
					var ix=0;
					for (var i in rs.objList){								
						sender.columns.get(2).pickList.set(ix, rs.get(i).get("periode"));
						ix++;
					}
				}
			}
		}catch(e){
			alert(e);
		}
		
	},
	doEllipsFilterClick: function(sender, col, row){
		if (row == 1)
		{
			this.filterRep.ListDataSGFilter(this, "Data Tertanggung",sender, sender.row, sender.col,
													  "select kode_ttg,nama from eclaim_ttg where kode_lokasi='"+this.app._lokasi+"' and kode_ttg='"+this.app._kodeTtg+"'",
													  "select count(kode_ttg) from eclaim_ttg where kode_lokasi='"+this.app._lokasi+"' and kode_ttg='"+this.app._kodeTtg+"'",
													  new Array("kode_ttg","nama"),"and",new Array("kode","nama"));
		}		
	},
	sg1onChange: function(sender, col , row){
		if (col==1)
		{
		 if (sender.getCell(1,row)=="All")
		 {
			sender.setCell(2,row,"");
			sender.setCell(3,row,"");
		 }
		} 
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
	initComp: function(filter){
		try{
		        var sql = new server_util_arrayList();
				sql.add("select date_format(tanggal,'%M') as nama,count(*) as tot from eclaim_klaim a "+						
						"where kode_lokasi='"+this.app._lokasi+"' and kode_ttg='"+this.app._kodeTtg+"' "+filter+
						"group by date_format(tanggal,'%m')");
				sql.add("select b.nama,count(*) as tot "+
						"from eclaim_klaim a "+
						"  inner join eclaim_obyek b on b.kode_obyek = a.kode_obyek and b.kode_lokasi = a.kode_lokasi and b.kode_ttg = a.kode_ttg "+
						"where a.kode_lokasi='"+this.app._lokasi+"' and a.kode_ttg='"+this.app._kodeTtg+"' "+filter+
						"group by b.nama");
				sql.add("select b.nama,count(*) as tot "+
						"from eclaim_klaim a "+
						"  inner join eclaim_sebab b on b.kode_sebab = a.kode_sebab and b.kode_lokasi = a.kode_lokasi and b.kode_ttg = a.kode_ttg "+
						"where a.kode_lokasi='"+this.app._lokasi+"' and a.kode_ttg='"+this.app._kodeTtg+"' "+filter+
						"group by b.nama");
				sql.add("select b.nama,count(*) as tot "+
						"from eclaim_klaim a "+
						"  inner join eclaim_lokasi b on b.kode_lok = a.kode_lok and b.kode_lokasi = a.kode_lokasi and b.kode_ttg = a.kode_ttg "+
						"where a.kode_lokasi='"+this.app._lokasi+"' and a.kode_ttg='"+this.app._kodeTtg+"' "+filter+
						"group by b.nama");
				sql.add("select 'Laporan Awal' as nama,count(*) as tot "+
						"from eclaim_klaim a "+						
						"where a.kode_lokasi='"+this.app._lokasi+"' and a.kode_ttg='"+this.app._kodeTtg+"' "+filter+						
						"union "+
						"select 'Survey' as jenis,count(*) "+
						"from eclaim_survey b "+			
						"inner join eclaim_klaim a on b.no_klaim = a.no_klaim and b.kode_lokasi = a.kode_lokasi "+
						"where a.kode_lokasi='"+this.app._lokasi+"' and a.kode_ttg='"+this.app._kodeTtg+"' "+filter+					
						"union "+
						"select 'Permintaan Dokumen' as jenis,count(*) "+
						"from eclaim_dok_m b "+						
						"inner join eclaim_klaim a on b.no_klaim = a.no_klaim and b.kode_lokasi = a.kode_lokasi "+
						"where a.kode_lokasi='"+this.app._lokasi+"' and a.kode_ttg='"+this.app._kodeTtg+"' "+filter+					
						"union "+
						"select 'Adjustment' as jenis,count(*) "+
						"from eclaim_adjust b "+						
						"inner join eclaim_klaim a on b.no_klaim = a.no_klaim and b.kode_lokasi = a.kode_lokasi "+
						"where a.kode_lokasi='"+this.app._lokasi+"' and a.kode_ttg='"+this.app._kodeTtg+"' and b.status = '1' "+filter+						
						"union "+
						"select 'Pembayaran' as jenis,count(*) "+
						"from eclaim_bayar b "+						
						"inner join eclaim_klaim a on b.no_klaim = a.no_klaim and b.kode_lokasi = a.kode_lokasi "+
						"where a.kode_lokasi='"+this.app._lokasi+"' and a.kode_ttg='"+this.app._kodeTtg+"' "+filter);
				sql.add("select date_format(tanggal,'%M') as nama,sum(nilai) / 1000000 as tot from eclaim_klaim a "+						
						"where kode_lokasi='"+this.app._lokasi+"' and a.kode_ttg='"+this.app._kodeTtg+"' "+filter+
						"group by date_format(tanggal,'%M')");
				sql.add("select b.nama,sum(a.nilai) / 1000000 as tot "+
						"from eclaim_klaim a "+
						"  inner join eclaim_obyek b on b.kode_obyek = a.kode_obyek and b.kode_lokasi = a.kode_lokasi "+
						"where a.kode_lokasi='"+this.app._lokasi+"' and a.kode_ttg='"+this.app._kodeTtg+"' "+filter+
						"group by b.nama");
				sql.add("select b.nama,sum(a.nilai) / 1000000 as tot "+
						"from eclaim_klaim a "+
						"  inner join eclaim_sebab b on b.kode_sebab = a.kode_sebab and b.kode_lokasi = a.kode_lokasi "+
						"where a.kode_lokasi='"+this.app._lokasi+"' and a.kode_ttg='"+this.app._kodeTtg+"' "+filter+
						"group by b.nama");
				sql.add("select b.nama,sum(a.nilai) / 1000000 as tot "+
						"from eclaim_klaim a "+
						"  inner join eclaim_lokasi b on b.kode_lok = a.kode_lok and b.kode_lokasi = a.kode_lokasi "+
						"where a.kode_lokasi='"+this.app._lokasi+"' and a.kode_ttg='"+this.app._kodeTtg+"' "+filter+
						"group by b.nama");
				sql.add("select 'Laporan Awal' as nama,sum(a.nilai) / 1000000 as tot "+
						"from eclaim_klaim a "+						
						"where a.kode_lokasi='"+this.app._lokasi+"' and a.kode_ttg='"+this.app._kodeTtg+"' "+filter+
						"union "+
						"select 'Survey' as jenis,sum(a.nilai) / 1000000 "+
						"from eclaim_survey b "+	
						"inner join eclaim_klaim a on b.no_klaim = a.no_klaim and b.kode_lokasi = a.kode_lokasi "+
						"where a.kode_lokasi='"+this.app._lokasi+"' and a.kode_ttg='"+this.app._kodeTtg+"' "+filter+						
						"union "+
						"select 'Permintaan Dokumen' as jenis,sum(a.nilai) / 1000000  "+
						"from eclaim_dok_m b "+						
						"inner join eclaim_klaim a on b.no_klaim = a.no_klaim and b.kode_lokasi = a.kode_lokasi "+
						"where a.kode_lokasi='"+this.app._lokasi+"' and a.kode_ttg='"+this.app._kodeTtg+"' "+filter+
						"union "+
						"select 'Adjustment' as jenis,sum(a.nilai)  / 1000000 "+
						"from eclaim_adjust b "+				
						"inner join eclaim_klaim a on b.no_klaim = a.no_klaim and b.kode_lokasi = a.kode_lokasi "+
						"where a.kode_lokasi='"+this.app._lokasi+"' and a.kode_ttg='"+this.app._kodeTtg+"' and b.status = '1' "+filter+
						"union "+
						"select 'Pembayaran' as jenis,sum(a.nilai) / 1000000 "+
						"from eclaim_bayar b "+						
						"inner join eclaim_klaim a on b.no_klaim = a.no_klaim and b.kode_lokasi = a.kode_lokasi "+
						"where a.kode_lokasi='"+this.app._lokasi+"' and a.kode_ttg='"+this.app._kodeTtg+"' "+filter);
				sql.add("select b.nama,count(*) as tot "+
						"from eclaim_klaim a "+
						"  inner join eclaim_asuransi b on b.kode_asuransi = a.kode_asuransi and b.kode_lokasi = a.kode_lokasi "+
						"where a.kode_lokasi='"+this.app._lokasi+"' and a.kode_ttg='"+this.app._kodeTtg+"' "+filter+
						"group by b.nama");
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
    	                var data = JSON.parse(result);
    	                if (typeof data != "string"){
    	                    this.count = 0;
							this.dataProvider = data;							
							var frameWidth = this.width / 3 - 30;
            				this.fr1 = new portalui_panel(this.tab.childPage[0],{bound:[10,10,frameWidth,250],caption:"Klaim per bulan"});									            		        							
							this.fr1.bGraph = new portalui_imageButton(this.fr1,{bound:[frameWidth - 50,2,16,16],image:"icon/dynpro/graph16.png",hint:"Mode Graphic",click:[this,"doBtnClick"], name:"graph"});
							this.fr1.bGrid = new portalui_imageButton(this.fr1,{bound:[frameWidth - 25,2,16,16],image:"icon/dynpro/tabContent2.png",hint:"Mode Table",click:[this,"doBtnClick"], name:"grid"});
							this.fr1.grid = new portalui_saiGrid(this.fr1,{bound:[5,30,this.fr1.getClientWidth() - 30,this.fr1.getClientHeight() - 50],colCount:2,colTitle:["Group By","Jumlah"],visible:false, readOnly:true, dblClick:[this,"doGridClick"],colWidth:[[1,0],[100,200]], colAlign:[[1],[alCenter]]});		         	                        
							this.fr1.chart = new portalui_flashChart(this.fr1,{bound:[5,30,this.fr1.getClientWidth() - 30,this.fr1.getClientHeight() - 50],objectReady:[this,"doObjectReady"],title:"Bulan"});		         	                        
							this.fr1.chart.data = data.result[0];
							this.fr1.sql = this.sql.get(0);	
            		        this.fr2 = new portalui_panel(this.tab.childPage[0],{bound:[this.fr1.left+this.fr1.width + 15,10,frameWidth,250],caption:"Klaim per Obyek"});
            				this.fr2.bGraph = new portalui_imageButton(this.fr2,{bound:[frameWidth - 50,2,16,16],image:"icon/dynpro/graph16.png",hint:"Mode Graphic",click:[this,"doBtnClick"], name:"graph"});
							this.fr2.bGrid = new portalui_imageButton(this.fr2,{bound:[frameWidth - 25,2,16,16],image:"icon/dynpro/tabContent2.png",hint:"Mode Table",click:[this,"doBtnClick"], name:"grid"});
							this.fr2.grid = new portalui_saiGrid(this.fr2,{bound:[5,30,this.fr2.getClientWidth() - 30,this.fr2.getClientHeight() - 50],colCount:2,colTitle:["Group By","Jumlah"],visible:false, readOnly:true, dblClick:[this,"doGridClick"],colWidth:[[1,0],[100,200]], colAlign:[[1],[alCenter]]});  							
                            this.fr2.chart = new portalui_flashChart(this.fr2,{bound:[5,30,this.fr2.getClientWidth() - 30,this.fr2.getClientHeight() - 50],objectReady:[this,"doObjectReady"],title:"Obyek"});  
							this.fr2.chart.data = data.result[1];
							this.fr2.sql = this.sql.get(1);
							this.fr3 = new portalui_panel(this.tab.childPage[0],{bound:[this.fr2.left+this.fr2.width + 15,10,frameWidth,250],caption:"Klaim per Sebab"});
            				this.fr3.bGraph = new portalui_imageButton(this.fr3,{bound:[frameWidth - 50,2,16,16],image:"icon/dynpro/graph16.png",hint:"Mode Graphic",click:[this,"doBtnClick"], name:"graph"});
							this.fr3.bGrid = new portalui_imageButton(this.fr3,{bound:[frameWidth - 25,2,16,16],image:"icon/dynpro/tabContent2.png",hint:"Mode Table",click:[this,"doBtnClick"], name:"grid"});
							this.fr3.grid = new portalui_saiGrid(this.fr3,{bound:[5,30,this.fr3.getClientWidth() - 30,this.fr3.getClientHeight() - 50],colCount:2,colTitle:["Group By","Jumlah"],visible:false, readOnly:true, dblClick:[this,"doGridClick"],colWidth:[[1,0],[100,200]], colAlign:[[1],[alCenter]]});		        
            				this.fr3.chart = new portalui_flashChart(this.fr3,{bound:[5,30,this.fr3.getClientWidth() - 30,this.fr3.getClientHeight() - 50],objectReady:[this,"doObjectReady"],title:"Penyebab"});		        
							this.fr3.chart.data = data.result[2];
							this.fr3.sql = this.sql.get(2);
							this.fr4 = new portalui_panel(this.tab.childPage[0],{bound:[10,this.fr1.height+20,frameWidth,250],caption:"Klaim per Lokasi"});
            		        this.fr4.bGraph = new portalui_imageButton(this.fr4,{bound:[frameWidth - 50,2,16,16],image:"icon/dynpro/graph16.png",hint:"Mode Graphic",click:[this,"doBtnClick"], name:"graph"});
							this.fr4.bGrid = new portalui_imageButton(this.fr4,{bound:[frameWidth - 25,2,16,16],image:"icon/dynpro/tabContent2.png",hint:"Mode Table",click:[this,"doBtnClick"], name:"grid"});
							this.fr4.grid = new portalui_saiGrid(this.fr4,{bound:[5,30,this.fr4.getClientWidth() - 30,this.fr4.getClientHeight() - 50],colCount:2,colTitle:["Group By","Jumlah"],visible:false, readOnly:true, dblClick:[this,"doGridClick"],colWidth:[[1,0],[100,200]], colAlign:[[1],[alCenter]]});		        				
                            this.fr4.chart = new portalui_flashChart(this.fr4,{bound:[5,30,this.fr4.getClientWidth() - 30,this.fr4.getClientHeight() - 50],objectReady:[this,"doObjectReady"],title:"Lokasi"});		        
							this.fr4.chart.data = data.result[3];
							this.fr4.sql = this.sql.get(3);
							this.fr5 = new portalui_panel(this.tab.childPage[0],{bound:[this.fr4.left+this.fr4.width + 15,this.fr1.height+20,frameWidth,250],caption:"Posisi Klaim"});
            				this.fr5.bGraph = new portalui_imageButton(this.fr5,{bound:[frameWidth - 50,2,16,16],image:"icon/dynpro/graph16.png",hint:"Mode Graphic",click:[this,"doBtnClick"], name:"graph"});
							this.fr5.bGrid = new portalui_imageButton(this.fr5,{bound:[frameWidth - 25,2,16,16],image:"icon/dynpro/tabContent2.png",hint:"Mode Table",click:[this,"doBtnClick"], name:"grid"});
							this.fr5.grid = new portalui_saiGrid(this.fr5,{bound:[5,30,this.fr5.getClientWidth() - 30,this.fr5.getClientHeight() - 50],colCount:2,colTitle:["Group By","Jumlah"],visible:false, readOnly:true, dblClick:[this,"doGridClick"],colWidth:[[1,0],[100,200]], colAlign:[[1],[alCenter]]});		        
                            this.fr5.chart = new portalui_flashChart(this.fr5,{bound:[5,30,this.fr5.getClientWidth() - 30,this.fr5.getClientHeight() - 50],objectReady:[this,"doObjectReady"],title:"Posisi"});		        
							this.fr5.chart.data = data.result[4];
							this.fr5.sql = this.sql.get(4);							
							
							this.fr11 = new portalui_panel(this.tab.childPage[0],{bound:[this.fr5.left+this.fr5.width + 15,this.fr1.height+20,frameWidth,250],caption:"Jenis Asuransi"});
            				this.fr11.bGraph = new portalui_imageButton(this.fr11,{bound:[frameWidth - 50,2,16,16],image:"icon/dynpro/graph16.png",hint:"Mode Graphic",click:[this,"doBtnClick"], name:"graph"});
							this.fr11.bGrid = new portalui_imageButton(this.fr11,{bound:[frameWidth - 25,2,16,16],image:"icon/dynpro/tabContent2.png",hint:"Mode Table",click:[this,"doBtnClick"], name:"grid"});
							this.fr11.grid = new portalui_saiGrid(this.fr11,{bound:[5,30,this.fr11.getClientWidth() - 30,this.fr11.getClientHeight() - 50],colCount:2,colTitle:["Group By","Jumlah"],visible:false, readOnly:true, dblClick:[this,"doGridClick"],colWidth:[[1,0],[100,200]], colAlign:[[1],[alCenter]]});		        
                            this.fr11.chart = new portalui_flashChart(this.fr11,{bound:[5,30,this.fr11.getClientWidth() - 30,this.fr11.getClientHeight() - 50],objectReady:[this,"doObjectReady"],title:"Jenis Asuransi"});		        
							this.fr11.chart.data = data.result[10];							
							
							this.fr11.sql = this.sql.get(10);		
							
							this.fr6 = new portalui_panel(this.tab.childPage[1],{bound:[10,10,frameWidth,250],caption:"Klaim per bulan"});
							this.fr7 = new portalui_panel(this.tab.childPage[1],{bound:[this.fr6.left+this.fr6.width + 15,10,frameWidth,250],caption:"Klaim per Obyek"});
							this.fr8 = new portalui_panel(this.tab.childPage[1],{bound:[this.fr7.left+this.fr7.width + 15,10,frameWidth,250],caption:"Klaim per Sebab"});
							this.fr9 = new portalui_panel(this.tab.childPage[1],{bound:[10,this.fr6.height+20,frameWidth,250],caption:"Klaim per Lokasi"});
							this.fr10 = new portalui_panel(this.tab.childPage[1],{bound:[this.fr9.left+this.fr9.width + 15,this.fr6.height+20,frameWidth,250],caption:"Posisi Klaim"});																				
							
							this.getChart(this.fr1.chart.data, this.fr1.chart);
							this.getChart(this.fr2.chart.data, this.fr2.chart);
							this.getChart(this.fr3.chart.data, this.fr3.chart);
							this.getChart(this.fr4.chart.data, this.fr4.chart);
							this.getChart(this.fr5.chart.data, this.fr5.chart);							
							this.getChart(this.fr11.chart.data, this.fr11.chart);
							this.setData(this.fr1.grid,data.result[0]);
							this.setData(this.fr2.grid,data.result[1]);
							this.setData(this.fr3.grid,data.result[2]);
							this.setData(this.fr4.grid,data.result[3]);
							this.setData(this.fr5.grid,data.result[4]);							
							this.setData(this.fr11.grid,data.result[10]);
                       }else throw result;
    	           break;
               }
            }catch(e){
                systemAPI.alert(this+"$request()",e);
            }
       }
    },
	setData: function(grid, data){
		grid.clear();
		for (var i in data.rs.rows){
			grid.appendData([data.rs.rows[i].nama, data.rs.rows[i].tot]);
		}			
	},
    doTabChange: function(sender, page){
        this.count = 0;
		if (page == 1 && this.fr6.chart === undefined){
			var frameWidth = this.width / 3 - 30;						
			this.fr6.bGraph = new portalui_imageButton(this.fr6,{bound:[frameWidth - 50,2,16,16],image:"icon/dynpro/graph16.png",hint:"Mode Graphic",click:[this,"doBtnClick"], name:"graph"});
			this.fr6.bGrid = new portalui_imageButton(this.fr6,{bound:[frameWidth - 25,2,16,16],image:"icon/dynpro/tabContent2.png",hint:"Mode Table",click:[this,"doBtnClick"], name:"grid"});
			this.fr6.grid = new portalui_saiGrid(this.fr6,{bound:[5,30,this.fr6.getClientWidth() - 30,this.fr6.getClientHeight() - 50],colCount:2,colTitle:["Group By","Nilai"], readOnly:true,visible:false, dblClick:[this,"doGridClick"],colWidth:[[1,0],[100,200]], colAlign:[[1],[alCenter]]});		         	                        
			this.fr6.chart = new portalui_flashChart(this.fr6,{bound:[5,30,this.fr6.getClientWidth() - 30,this.fr6.getClientHeight() - 50],objectReady:[this,"doObjectReady"],title:"Bulan"});		        				
			this.fr6.chart.data = this.dataProvider.result[5];
			this.fr6.sql = this.sql.get(5);
			this.fr7.bGraph = new portalui_imageButton(this.fr7,{bound:[frameWidth - 50,2,16,16],image:"icon/dynpro/graph16.png",hint:"Mode Graphic",click:[this,"doBtnClick"], name:"graph"});
			this.fr7.bGrid = new portalui_imageButton(this.fr7,{bound:[frameWidth - 25,2,16,16],image:"icon/dynpro/tabContent2.png",hint:"Mode Table",click:[this,"doBtnClick"], name:"grid"});
			this.fr7.grid = new portalui_saiGrid(this.fr7,{bound:[5,30,this.fr7.getClientWidth() - 30,this.fr7.getClientHeight() - 50],colCount:2,colTitle:["Group By","Nilai"], readOnly:true,visible:false, dblClick:[this,"doGridClick"],colWidth:[[1,0],[100,200]], colAlign:[[1],[alCenter]]});  
			this.fr7.chart = new portalui_flashChart(this.fr7,{bound:[5,30,this.fr7.getClientWidth() - 30,this.fr7.getClientHeight() - 50],objectReady:[this,"doObjectReady"],title:"Obyek"});		        
			this.fr7.chart.data = this.dataProvider.result[6];
			this.fr7.sql = this.sql.get(6);			
			this.fr8.bGraph = new portalui_imageButton(this.fr8,{bound:[frameWidth - 50,2,16,16],image:"icon/dynpro/graph16.png",hint:"Mode Graphic",click:[this,"doBtnClick"], name:"graph"});
			this.fr8.bGrid = new portalui_imageButton(this.fr8,{bound:[frameWidth - 25,2,16,16],image:"icon/dynpro/tabContent2.png",hint:"Mode Table",click:[this,"doBtnClick"], name:"grid"});
			this.fr8.grid = new portalui_saiGrid(this.fr8,{bound:[5,30,this.fr8.getClientWidth() - 30,this.fr8.getClientHeight() - 50],colCount:2,colTitle:["Group By","Nilai"], readOnly:true,visible:false, dblClick:[this,"doGridClick"],colWidth:[[1,0],[100,200]], colAlign:[[1],[alCenter]]});		        
			this.fr8.chart = new portalui_flashChart(this.fr8,{bound:[5,30,this.fr8.getClientWidth() - 30,this.fr8.getClientHeight() - 50],objectReady:[this,"doObjectReady"],title:"Penyebab"});		        																				
			this.fr8.chart.data = this.dataProvider.result[7];
			this.fr8.sql = this.sql.get(7);			
			this.fr9.bGraph = new portalui_imageButton(this.fr9,{bound:[frameWidth - 50,2,16,16],image:"icon/dynpro/graph16.png",hint:"Mode Graphic",click:[this,"doBtnClick"], name:"graph"});
			this.fr9.bGrid = new portalui_imageButton(this.fr9,{bound:[frameWidth - 25,2,16,16],image:"icon/dynpro/tabContent2.png",hint:"Mode Table",click:[this,"doBtnClick"], name:"grid"});
			this.fr9.grid = new portalui_saiGrid(this.fr9,{bound:[5,30,this.fr9.getClientWidth() - 30,this.fr9.getClientHeight() - 50],colCount:2,colTitle:["Group By","Nilai"], readOnly:true,visible:false, dblClick:[this,"doGridClick"],colWidth:[[1,0],[100,200]], colAlign:[[1],[alCenter]]});		        				
			this.fr9.chart = new portalui_flashChart(this.fr9,{bound:[5,30,this.fr9.getClientWidth() - 30,this.fr9.getClientHeight() - 50],objectReady:[this,"doObjectReady"],title:"Lokasi"});		        
			this.fr9.chart.data = this.dataProvider.result[8];
			this.fr9.sql = this.sql.get(8);
			this.fr10.bGraph = new portalui_imageButton(this.fr10,{bound:[frameWidth - 50,2,16,16],image:"icon/dynpro/graph16.png",hint:"Mode Graphic",click:[this,"doBtnClick"], name:"graph"});
			this.fr10.bGrid = new portalui_imageButton(this.fr10,{bound:[frameWidth - 25,2,16,16],image:"icon/dynpro/tabContent2.png",hint:"Mode Table",click:[this,"doBtnClick"], name:"grid"});
			this.fr10.grid = new portalui_saiGrid(this.fr10,{bound:[5,30,this.fr10.getClientWidth() - 30,this.fr10.getClientHeight() - 50],colCount:2,colTitle:["Group By","Nilai"], readOnly:true,visible:false, dblClick:[this,"doGridClick"],colWidth:[[1,0],[100,200]], colAlign:[[1],[alCenter]]});		        
			this.fr10.chart = new portalui_flashChart(this.fr10,{bound:[5,30,this.fr10.getClientWidth() - 30,this.fr10.getClientHeight() - 50],objectReady:[this,"doObjectReady"],title:"Posisi"});						
			this.fr10.chart.data = this.dataProvider.result[9];
			this.fr10.sql = this.sql.get(9);					
			this.getChart(this.fr6.chart.data, this.fr6.chart);
			this.getChart(this.fr7.chart.data, this.fr7.chart);
			this.getChart(this.fr8.chart.data, this.fr8.chart);
			this.getChart(this.fr9.chart.data, this.fr9.chart);
			this.getChart(this.fr10.chart.data, this.fr10.chart);
			this.setData(this.fr6.grid,this.dataProvider.result[5]);
			this.setData(this.fr7.grid,this.dataProvider.result[6]);
			this.setData(this.fr8.grid,this.dataProvider.result[7]);
			this.setData(this.fr9.grid,this.dataProvider.result[8]);
			this.setData(this.fr10.grid,this.dataProvider.result[9]);
		}
		//this.firstLoad = true;
    },
	doObjectReady: function(sender){
	   try{	    
			this.count++;
		    if (this.tab.activePage == 0 && this.count == 6){
				this.timer.setEnabled(true);
				this.count = 0;
			}else if (this.tab.activePage == 1 && this.count == 5){
				this.timer.setEnabled(true);
				this.count = 0;
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
			"text": (this.tab.activePage == 1 ? "Nilai (ribuan)" :"Jumlah"),"style": "{color: #736AFF; font-size: 12px;}"
		  },
		  "elements":[],
		  "x_axis":{
			"stroke": 1,"tick_height": 10,"colour":"#d000d0","grid_colour": "#00ff00","labels":{"labels":[swf.title]},"3d": 5 
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
			for (var i in data.rs.rows){
				line = data.rs.rows[i];  						
				var r = Math.floor(Math.random()*256),g = Math.floor(Math.random()*256),b = Math.floor(Math.random()*256);
				var color = (r+256 * g + 65536 * b).toString(16);
				temp = {"type":"bar_3d","alpha":     1.8,"colour":    "#"+ color,
				  "tip":       line.nama +"(#val#)",
				  "text--":      line.nama,
				  "font-size--": 10,
				  "linkCtrl": swf.resourceId.toString(),
				  "on-click": "system.getResource("+this.resourceId+").doChartClick",
				  "values" :   [parseFloat(line.tot)],
				  "on-show":	{"type": (!systemAPI.browser.msie ? "grow-up":"")}
				};
				chart.elements.push(temp);							
				if (parseFloat(line.tot) > maxValue ) maxValue = parseFloat(line.tot);
				if (parseFloat(line.tot) < minValue ) minValue = parseFloat(line.tot);						
			}									
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
		swf.setChartData(chart); 
	},    
	doBtnClick: function(sender){
		try{
			if (sender == this.fr1.bGraph){
				sender.owner.grid.hide();
				sender.owner.chart.show();
			}
			if (sender == this.fr1.bGrid){
				sender.owner.grid.show();
				sender.owner.chart.hide();
			}
			if (sender == this.fr2.bGraph){
				sender.owner.grid.hide();
				sender.owner.chart.show();
			}
			if (sender == this.fr2.bGrid){
				sender.owner.grid.show();
				sender.owner.chart.hide();
			}
			if (sender == this.fr3.bGraph){
				sender.owner.grid.hide();
				sender.owner.chart.show();
			}
			if (sender == this.fr3.bGrid){
				sender.owner.grid.show();
				sender.owner.chart.hide();
			}
			if (sender == this.fr4.bGraph){
				sender.owner.grid.hide();
				sender.owner.chart.show();
			}
			if (sender == this.fr4.bGrid){
				sender.owner.grid.show();
				sender.owner.chart.hide();
			}
			if (sender == this.fr5.bGraph){
				sender.owner.grid.hide();
				sender.owner.chart.show();
			}
			if (sender == this.fr5.bGrid){
				sender.owner.grid.show();
				sender.owner.chart.hide();
			}
			if (sender == this.fr6.bGraph){
				sender.owner.grid.hide();
				sender.owner.chart.show();
			}
			if (sender == this.fr6.bGrid){
				sender.owner.grid.show();
				sender.owner.chart.hide();
			}
			if (sender == this.fr7.bGraph){
				sender.owner.grid.hide();
				sender.owner.chart.show();
			}
			if (sender == this.fr7.bGrid){
				sender.owner.grid.show();
				sender.owner.chart.hide();
			}
			if (sender == this.fr8.bGraph){
				sender.owner.grid.hide();
				sender.owner.chart.show();
			}
			if (sender == this.fr8.bGrid){
				sender.owner.grid.show();
				sender.owner.chart.hide();
			}
			if (sender == this.fr9.bGraph){
				sender.owner.grid.hide();
				sender.owner.chart.show();
			}
			if (sender == this.fr9.bGrid){
				sender.owner.grid.show();
				sender.owner.chart.hide();
			}
			if (sender == this.fr10.bGraph){
				sender.owner.grid.hide();
				sender.owner.chart.show();
			}
			if (sender == this.fr10.bGrid){
				sender.owner.grid.show();
				sender.owner.chart.hide();
			}
			if (sender == this.fr11.bGraph){
				sender.owner.grid.hide();
				sender.owner.chart.show();
			}
			if (sender == this.fr11.bGrid){
				sender.owner.grid.show();
				sender.owner.chart.hide();
			}
			this.firstLoad = false;
		}catch(e){
			alert(e);
		}
	},
	doChartClick: function(sender,index,title){		
		try{
			eval("sender="+sender);
			this.doGridClick(sender, title);
		}catch(e){
			alert(e);
		}
	},
	doGridClick: function(sender, col, row){
		try{
			if (this.trail1 === undefined){
				this.trail1 = new app_eclaim_dashboard_fTrail1(this.owner,undefined, this);
				this.trail1.maximize();			
			}		
			var filter = (sender instanceof portalui_saiGrid ? sender.cells(0,row) : col);//col == title
			var sqlBase = " from eclaim_klaim a inner join eclaim_lokasi b on b.kode_lokasi = a.kode_lokasi and b.kode_lok = a.kode_lok and b.kode_ttg = a.kode_ttg "+
						"	left outer join karyawan g on g.kode_lokasi = a.kode_lokasi and g.nik = a.nik_buat "+
						"	left outer join eclaim_obyek c on c.kode_lokasi = a.kode_lokasi and c.kode_obyek = a.kode_obyek and c.kode_ttg = a.kode_ttg "+
						"	left outer join eclaim_sebab d on d.kode_lokasi = a.kode_lokasi and d.kode_sebab = a.kode_sebab and d.kode_ttg = a.kode_ttg "+
						"	left outer join eclaim_adjust e on e.kode_lokasi = a.kode_lokasi and e.no_klaim = a.no_klaim and e.status = '1'"+
						"	left outer join eclaim_bayar f on f.kode_lokasi = a.kode_lokasi and f.no_klaim = a.no_klaim ";
			switch(sender){
				case this.fr1.grid: 
				case this.fr6.grid:					
				case this.fr1.chart: 
				case this.fr6.chart:															
					this.trail1.setSQL("select distinct a.no_klaim, a.no_dokumen, date_format(a.tanggal,'%d-%m-%Y') as tanggal, b.nama as nama_lok, c.nama as nama_obyek, d.nama as nama_sebab, a.nilai, e.nilai as nilai_adjust, f.nilai as nilai_bayar "+
						sqlBase + 
						"where a.kode_lokasi = '"+this.app._lokasi+"' and a.kode_ttg='"+this.app._kodeTtg+"' and date_format(a.tanggal,'%M') = '"+filter+"' "+this.filter,
						"select count(*) "+
						sqlBase + 
						"where a.kode_lokasi = '"+this.app._lokasi+"' and a.kode_ttg='"+this.app._kodeTtg+"' and date_format(a.tanggal,'%M') = '"+filter+"' "+this.filter);
					this.trail1.setPanelCaption("Klaim bulan "+filter+" ");
				break;
				case this.fr2.grid:
				case this.fr7.grid:
				case this.fr2.chart:
				case this.fr7.chart:					
					this.trail1.setSQL("select distinct a.no_klaim, a.no_dokumen, date_format(a.tanggal,'%d-%m-%Y') as tanggal, b.nama as nama_lok, c.nama as nama_obyek, d.nama as nama_sebab, a.nilai, e.nilai as nilai_adjust, f.nilai as nilai_bayar "+
						sqlBase + 
						"where a.kode_lokasi = '"+this.app._lokasi+"' and a.kode_ttg='"+this.app._kodeTtg+"' and  c.nama = '"+filter+"' "+this.filter,
						"select count(*) "+
						sqlBase + 
						"where a.kode_lokasi = '"+this.app._lokasi+"' and a.kode_ttg='"+this.app._kodeTtg+"' and  c.nama = '"+filter+"' "+this.filter);
					this.trail1.setPanelCaption("Klaim Obyek "+filter);
				break;
				case this.fr3.grid:
				case this.fr8.grid:
				case this.fr3.chart:
				case this.fr8.chart:
					this.trail1.setSQL("select distinct a.no_klaim, a.no_dokumen, date_format(a.tanggal,'%d-%m-%Y') as tanggal,  b.nama as nama_lok, c.nama as nama_obyek, d.nama as nama_sebab, a.nilai, e.nilai as nilai_adjust, f.nilai as nilai_bayar "+
						sqlBase + 
						"where a.kode_lokasi = '"+this.app._lokasi+"' and a.kode_ttg='"+this.app._kodeTtg+"' and  d.nama = '"+filter+"' "+this.filter,
						"select count(*) "+
						sqlBase + 
						"where a.kode_lokasi = '"+this.app._lokasi+"' and a.kode_ttg='"+this.app._kodeTtg+"' and  d.nama = '"+filter+"' "+this.filter);
					this.trail1.setPanelCaption("Klaim Penyebab "+filter);
				break;
				case this.fr4.grid:
				case this.fr9.grid:
				case this.fr4.chart:
				case this.fr9.chart:
					this.trail1.setSQL("select distinct a.no_klaim, a.no_dokumen, date_format(a.tanggal,'%d-%m-%Y') as tanggal,  b.nama as nama_lok, c.nama as nama_obyek, d.nama as nama_sebab, a.nilai, e.nilai as nilai_adjust, f.nilai as nilai_bayar "+
						sqlBase + 
						"where a.kode_lokasi = '"+this.app._lokasi+"' and a.kode_ttg='"+this.app._kodeTtg+"' and  b.nama = '"+filter+"' "+this.filter,
						"select count(*) "+
						sqlBase + 
						"where a.kode_lokasi = '"+this.app._lokasi+"' and a.kode_ttg='"+this.app._kodeTtg+"' and  b.nama = '"+filter+"' "+this.filter);
					this.trail1.setPanelCaption("Klaim Lokasi "+filter);
				break;
				case this.fr5.grid:
				case this.fr10.grid:
				case this.fr5.chart:
				case this.fr10.chart:
					this.trail1.setSQL("select distinct a.no_klaim, a.no_dokumen, date_format(a.tanggal,'%d-%m-%Y') as tanggal,  b.nama as nama_lok, c.nama as nama_obyek, d.nama as nama_sebab, a.nilai, e.nilai as nilai_adjust, f.nilai as nilai_bayar "+
						" from (select 'Laporan Awal' as nama, a.no_klaim, a.no_dokumen, date_format(a.tanggal,'%d-%m-%Y') as tanggal, a.kode_lokasi, a.kode_lok, a.kode_sebab, a.kode_obyek, a.nik_buat,a.nilai "+
							"from eclaim_klaim a "+						
							"where a.kode_lokasi='"+this.app._lokasi+"' and a.kode_ttg='"+this.app._kodeTtg+"' "+this.filter+						
							"union  "+
							"select 'Survey' as jenis,b.no_klaim, b.no_dokumen, date_format(b.tanggal,'%d-%m-%Y') as tanggal, b.kode_lokasi, a.kode_lok, a.kode_sebab, a.kode_obyek, a.nik_buat,a.nilai "+
							"from eclaim_survey b "+	
							"inner join eclaim_klaim a on b.no_klaim = a.no_klaim and b.kode_lokasi = a.kode_lokasi "+
							"where a.kode_lokasi='"+this.app._lokasi+"' and a.kode_ttg='"+this.app._kodeTtg+"' "+this.filter+					
							"union "+
							"select 'Permintaan Dokumen' as jenis, b.no_klaim, b.no_dokumen, date_format(a.tanggal,'%d-%m-%Y') as tanggal, b.kode_lokasi, a.kode_lok , a.kode_sebab, a.kode_obyek, a.nik_buat,a.nilai "+
							"from eclaim_dokumen b "+						
							"inner join eclaim_klaim a on b.no_klaim = a.no_klaim and b.kode_lokasi = a.kode_lokasi "+
							"where a.kode_lokasi='"+this.app._lokasi+"' and a.kode_ttg='"+this.app._kodeTtg+"' "+this.filter+						
							"union "+
							"select 'Adjustment' as jenis,b.no_klaim, b.no_dokumen, date_format(b.tanggal,'%d-%m-%Y') as tanggal, b.kode_lokasi, a.kode_lok, a.kode_sebab, a.kode_obyek, a.nik_buat,a.nilai "+
							"from eclaim_adjust b "+				
							"inner join eclaim_klaim a on b.no_klaim = a.no_klaim and b.kode_lokasi = a.kode_lokasi "+
							"where a.kode_lokasi='"+this.app._lokasi+"' and a.kode_ttg='"+this.app._kodeTtg+"' and b.status = '1' "+this.filter+						
							"union "+
							"select 'Pembayaran' as jenis,b.no_klaim, b.no_dokumen, date_format(b.tanggal,'%d-%m-%Y') as tanggal, b.kode_lokasi, a.kode_lok, a.kode_sebab, a.kode_obyek, a.nik_buat,a.nilai "+
							"from eclaim_bayar b "+						
							"inner join eclaim_klaim a on b.no_klaim = a.no_klaim and b.kode_lokasi = a.kode_lokasi "+
							"where a.kode_lokasi='"+this.app._lokasi+"' and a.kode_ttg='"+this.app._kodeTtg+"' "+this.filter+") a left outer join eclaim_lokasi b on b.kode_lokasi = a.kode_lokasi and b.kode_lok = a.kode_lok and b.kode_ttg = '"+this.app._kodeTtg+"' "+						
						"	left outer join karyawan g on g.kode_lokasi = a.kode_lokasi and g.nik = a.nik_buat "+
						"	left outer join eclaim_obyek c on c.kode_lokasi = a.kode_lokasi and c.kode_obyek = a.kode_obyek and c.kode_ttg = '"+this.app._kodeTtg+"' "+
						"	left outer join eclaim_sebab d on d.kode_lokasi = a.kode_lokasi and d.kode_sebab = a.kode_sebab and d.kode_ttg = '"+this.app._kodeTtg+"' "+
						"	left outer join eclaim_adjust e on e.kode_lokasi = a.kode_lokasi and e.no_klaim = a.no_klaim and e.status = '1' "+
						"	left outer join eclaim_bayar f on f.kode_lokasi = a.kode_lokasi and f.no_klaim = a.no_klaim "+
						"where a.kode_lokasi = '"+this.app._lokasi+"' and a.nama = '"+filter+"' ",
						"select count(a.no_klaim ) "+
						" from (select 'Laporan Awal' as nama, a.no_klaim, a.no_dokumen, date_format(a.tanggal,'%d-%m-%Y') as tanggal, a.kode_lokasi, a.kode_lok, a.kode_sebab, a.kode_obyek, a.nik_buat,a.nilai "+
							"from eclaim_klaim a "+						
							"where a.kode_lokasi='"+this.app._lokasi+"' and a.kode_ttg='"+this.app._kodeTtg+"' "+this.filter+						
							"union  "+
							"select 'Survey' as jenis,b.no_klaim, b.no_dokumen, date_format(b.tanggal,'%d-%m-%Y') as tanggal, b.kode_lokasi, a.kode_lok, a.kode_sebab, a.kode_obyek, a.nik_buat,a.nilai "+
							"from eclaim_survey b "+	
							"inner join eclaim_klaim a on b.no_klaim = a.no_klaim and b.kode_lokasi = a.kode_lokasi "+
							"where a.kode_lokasi='"+this.app._lokasi+"' and a.kode_ttg='"+this.app._kodeTtg+"' "+this.filter+				
							"union "+
							"select 'Permintaan Dokumen' as jenis, b.no_klaim, b.no_dokumen, date_format(a.tanggal,'%d-%m-%Y') as tanggal, b.kode_lokasi, a.kode_lok , a.kode_sebab, a.kode_obyek, a.nik_buat,a.nilai "+
							"from eclaim_dokumen b "+						
							"inner join eclaim_klaim a on b.no_klaim = a.no_klaim and b.kode_lokasi = a.kode_lokasi "+
							"where a.kode_lokasi='"+this.app._lokasi+"' and a.kode_ttg='"+this.app._kodeTtg+"' "+this.filter+						
							"union "+
							"select 'Adjustment' as jenis,b.no_klaim, b.no_dokumen, date_format(b.tanggal,'%d-%m-%Y') as tanggal, b.kode_lokasi, a.kode_lok, a.kode_sebab, a.kode_obyek, a.nik_buat,a.nilai "+
							"from eclaim_adjust b "+				
							"inner join eclaim_klaim a on b.no_klaim = a.no_klaim and b.kode_lokasi = a.kode_lokasi "+
							"where a.kode_lokasi='"+this.app._lokasi+"' and a.kode_ttg='"+this.app._kodeTtg+"' and b.status = '1' "+this.filter+						
							"union "+
							"select 'Pembayaran' as jenis,b.no_klaim, b.no_dokumen, date_format(b.tanggal,'%d-%m-%Y') as tanggal, b.kode_lokasi, a.kode_lok, a.kode_sebab, a.kode_obyek, a.nik_buat,a.nilai "+
							"from eclaim_bayar b "+						
							"inner join eclaim_klaim a on b.no_klaim = a.no_klaim and b.kode_lokasi = a.kode_lokasi "+
							"where a.kode_lokasi='"+"' and a.kode_ttg='"+this.app._kodeTtg+"' "+this.filter+") a left outer join eclaim_lokasi b on b.kode_lokasi = a.kode_lokasi and b.kode_lok = a.kode_lok and b.kode_ttg = '"+this.app._kodeTtg+"' "+						
						"	left outer join karyawan g on g.kode_lokasi = a.kode_lokasi and g.nik = a.nik_buat "+
						"	left outer join eclaim_obyek c on c.kode_lokasi = a.kode_lokasi and c.kode_obyek = a.kode_obyek and c.kode_ttg = '"+this.app._kodeTtg+"' "+
						"	left outer join eclaim_sebab d on d.kode_lokasi = a.kode_lokasi and d.kode_sebab = a.kode_sebab and d.kode_ttg = '"+this.app._kodeTtg+"'"+
						"	left outer join eclaim_adjust e on e.kode_lokasi = a.kode_lokasi and e.no_klaim = a.no_klaim and e.status = '1' "+
						"	left outer join eclaim_bayar f on f.kode_lokasi = a.kode_lokasi and f.no_klaim = a.no_klaim "+
						"where a.kode_lokasi = '"+this.app._lokasi+"' and a.kode_ttg='"+this.app._kodeTtg+"' "+this.filter+"' ");
					this.trail1.setPanelCaption("Klaim Penyebab "+filter);
				break;
				case this.fr11.grid:
				case this.fr11.chart:
					this.trail1.setSQL("select distinct a.no_klaim, a.no_dokumen, date_format(a.tanggal,'%d-%m-%Y') as tanggal, b.nama as nama_lok, c.nama as nama_obyek, d.nama as nama_sebab, a.nilai, e.nilai as nilai_adjust, f.nilai as nilai_bayar "+
						" from eclaim_klaim a inner join eclaim_lokasi b on b.kode_lokasi = a.kode_lokasi and b.kode_lok = a.kode_lok and b.kode_ttg = a.kode_ttg "+
						"	inner join eclaim_asuransi cc on cc.kode_asuransi = a.kode_asuransi and cc.kode_lokasi = a.kode_lokasi "+
						"	left outer join karyawan g on g.kode_lokasi = a.kode_lokasi and g.nik = a.nik_buat "+
						"	left outer join eclaim_obyek c on c.kode_lokasi = a.kode_lokasi and c.kode_obyek = a.kode_obyek and c.kode_ttg = a.kode_ttg "+
						"	left outer join eclaim_sebab d on d.kode_lokasi = a.kode_lokasi and d.kode_sebab = a.kode_sebab and d.kode_ttg = a.kode_ttg "+
						"	left outer join eclaim_adjust e on e.kode_lokasi = a.kode_lokasi and e.no_klaim = a.no_klaim and e.status = '1' "+
						"	left outer join eclaim_bayar f on f.kode_lokasi = a.kode_lokasi and f.no_klaim = a.no_klaim "+
						"where a.kode_lokasi = '"+this.app._lokasi+"' and a.kode_ttg='"+this.app._kodeTtg+"' and cc.nama = '"+filter+"' "+this.filter,
						"select count(*) "+
						" from eclaim_klaim a inner join eclaim_lokasi b on b.kode_lokasi = a.kode_lokasi and b.kode_lok = a.kode_lok and b.kode_ttg = a.kode_ttg "+
						"	inner join eclaim_asuransi cc on cc.kode_asuransi = a.kode_asuransi and cc.kode_lokasi = a.kode_lokasi "+
						"	left outer join karyawan g on g.kode_lokasi = a.kode_lokasi and g.nik = a.nik_buat "+
						"	left outer join eclaim_obyek c on c.kode_lokasi = a.kode_lokasi and c.kode_obyek = a.kode_obyek and c.kode_ttg = a.kode_ttg "+
						"	left outer join eclaim_sebab d on d.kode_lokasi = a.kode_lokasi and d.kode_sebab = a.kode_sebab and d.kode_ttg = a.kode_ttg "+
						"	left outer join eclaim_adjust e on e.kode_lokasi = a.kode_lokasi and e.no_klaim = a.no_klaim and e.status = '1' "+
						"	left outer join eclaim_bayar f on f.kode_lokasi = a.kode_lokasi and f.no_klaim = a.no_klaim "+
						"where a.kode_lokasi = '"+this.app._lokasi+"' and a.kode_ttg='"+this.app._kodeTtg+"' and cc.nama = '"+filter+"' "+this.filter);
					this.trail1.setPanelCaption("Klaim Jenis Asuransi "+filter+" ");
				break;
			}
			this.block(true);
			this.trail1.show();
		}catch(e){
			alert(e);
		}
	},
	doTimer: function(sender){
		this.timer.setEnabled(false);
		if (this.tab.activePage == 0){
			this.getChart(this.fr1.chart.data, this.fr1.chart);
			this.getChart(this.fr2.chart.data, this.fr2.chart);
			this.getChart(this.fr3.chart.data, this.fr3.chart);
			this.getChart(this.fr4.chart.data, this.fr4.chart);
			this.getChart(this.fr5.chart.data, this.fr5.chart);
			this.getChart(this.fr11.chart.data, this.fr11.chart);
			this.fr1.chart.refresh();
			this.fr2.chart.refresh();
			this.fr3.chart.refresh();
			this.fr4.chart.refresh();
			this.fr5.chart.refresh();
			this.fr11.chart.refresh();
		}else {
			this.getChart(this.fr6.chart.data, this.fr6.chart);
			this.getChart(this.fr7.chart.data, this.fr7.chart);
			this.getChart(this.fr8.chart.data, this.fr8.chart);
			this.getChart(this.fr9.chart.data, this.fr9.chart);
			this.getChart(this.fr10.chart.data, this.fr10.chart);
			this.fr6.chart.refresh();
			this.fr7.chart.refresh();
			this.fr8.chart.refresh();
			this.fr9.chart.refresh();
			this.fr10.chart.refresh();				
		}
		
	}
});

window.app_eclaim_dashboard_fTrail1 = function(owner,options,callObj)
{
    if (owner)
    {
		try{
	        window.app_eclaim_dashboard_fTrail1.prototype.parent.constructor.call(this, owner,options);        
            this.className = "app_eclaim_dashboard_fTrail1";			
            this.setCaption("Dashboard");
			this.setColor("");
			this.callObj = callObj;
			this.maximize();			
			this.onClose.set(this,"doClose");						
			this.dbLib = new util_dbLib();
			this.dbLib.addListener(this);
			this.tab = new portalui_panel(this,{bound:[50,30,this.width - 100, this.height - 50], caption:""});						
			this.grid = new portalui_saiGrid(this.tab,{bound:[1,20,this.tab.width - 2,this.tab.height - 50],colCount:9,readOnly:true,dblClick:[this,"doGridDoubleClick"],
				colTitle:["No Klaim","No Dokumen","Tgl Terima","Lokasi","Obyek","Penyebab","Nilai Estimasi","Nilai Adjust","Nilai Bayar"],
				colWidth:[[8,7,6,5,4,3,2,1,0],[100,100,100,150,150,150,80,180,100]], colFormat:[[8,7,6],[cfNilai,cfNilai, cfNilai]],rowSelect:true});            
			this.sgn = new portalui_sgNavigator(this.tab,{bound:[1,this.tab.height - 25,this.tab.width - 2,25],buttonStyle:1,grid:this.grid,pager:[this,"doPager"]});
			this.rowPerPage = 20;
			this.bClose = new portalui_imageButton(this.tab,{bound:[this.tab.width - 60,1,45,16],image:"icon/dynpro/pnlclose.png",click:[this,"doClick"]});			
		}catch(e){
			this.app.alert(e,"");
		}
    }
};
window.app_eclaim_dashboard_fTrail1.extend(window.portalui_childForm);
window.app_eclaim_dashboard_fTrail1.implement({    
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
				result = JSON.parse(result);
				if (typeof result != "string"){
					var line;
					this.grid.clear();
					for (var i in result.rs.rows){
						line = result.rs.rows[i];
						this.grid.appendData([line.no_klaim, line.no_dokumen,line.tanggal,line.nama_lok, line.nama_obyek, line.nama_sebab, floatToNilai(line.nilai), floatToNilai(line.nilai_adjust), floatToNilai(line.nilai_bayar)]);
					}
					this.grid.setNoUrut((this.page - 1) * this.rowPerPage);
				}else system.alert(result);
			}
		}catch(e){
			alert(result);
		}
	},
	doGridDoubleClick: function(sender, col, row){
		if (this.trail2 === undefined){
			this.trail2 = new app_eclaim_dashboard_fTrail2(this.owner,undefined, this);			
		}
		this.block(true);
		this.trail2.setValue({klaim:this.grid.cells(0,row),dok:this.grid.cells(1,row),tgl:this.grid.cells(2,row), lokasi:this.grid.cells(3,row),
			obyek:this.grid.cells(4,row), sebab:this.grid.cells(5,row),nilai:this.grid.cells(6,row), adjust:this.grid.cells(7,row),
			bayar:this.grid.cells(8,row)});
		this.trail2.setPanelCaption("Detail Klaim "+ this.grid.cells(0,row));
		this.trail2.show();
	}
});

window.app_eclaim_dashboard_fTrail2 = function(owner,options, callObj)
{
    if (owner)
    {
		try{
	        window.app_eclaim_dashboard_fTrail2.prototype.parent.constructor.call(this, owner,options);        
            this.className = "app_eclaim_dashboard_fTrail2";
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
window.app_eclaim_dashboard_fTrail2.extend(window.portalui_childForm);
window.app_eclaim_dashboard_fTrail2.implement({    
	doClick: function(sender){
		this.hide();
		this.callObj.unblock();
	},
	setValue: function(value){
		var data = this.dbLib.getDataProvider("select distinct a.no_klaim, a.kode_ttg, a.kode_lokasi, a.no_dokumen,a.no_polis, date_format(a.tanggal,'%d/%m/%Y') as tanggal, a.alamat, a.penyebab, "+
			"   a.nilai, a.kode_curr, a.tindakan, a.tgl_dokumen, a.nik_buat, a.tgl_input, a.kode_obyek, a.kode_sebab, "+
			"   a.kurs, a.kode_asuransi, a.kode_lok, a.periode, a.nik_user, a.pic, a.no_telp, a.no_fax, "+
			"   h.nama as nama_ttg,c.nama as nama_obyek,d.nama as nama_sebab,g.nama as nama_lok "+
						" from eclaim_klaim a inner join eclaim_lokasi b on b.kode_lokasi = a.kode_lokasi and b.kode_lok = a.kode_lok and b.kode_ttg = a.kode_ttg "+						
						"	left outer join eclaim_obyek c on c.kode_lokasi = a.kode_lokasi and c.kode_obyek = a.kode_obyek and c.kode_ttg = a.kode_ttg "+
						"	left outer join eclaim_sebab d on d.kode_lokasi = a.kode_lokasi and d.kode_sebab = a.kode_sebab and d.kode_ttg = a.kode_ttg "+
						"	left outer join eclaim_adjust e on e.kode_lokasi = a.kode_lokasi and e.no_klaim = a.no_klaim and e.status = '1' "+
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