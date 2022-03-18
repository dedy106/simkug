//***********************************************************************************************
//*	Copyright (c) 2009 SAI
//*	 All rights reserved. This program and the accompanying materials
//*	 are made available under the terms of the Common Public License v1.0
//*	 which accompanies this distribution, and is available at
//*	Contributors 
//* 			SAI, PT											
//***********************************************************************************************
window.app_eclaim2_transaksi_fBASTParsialV = function(owner,options){
	try{
		if (owner)
		{
			window.app_eclaim2_transaksi_fBASTParsialV.prototype.parent.constructor.call(this, owner,options);
			this.className = "app_eclaim2_transaksi_fBASTParsialV";
			this.maximize();
			this.app._mainForm.childFormConfig(this, "mainButtonClick","View Testing",0);
            this.initComponent();
            this.onClose.set(this,"doClose");
			this.app._mainForm.bSimpan.setCaption("Proses");
		}
	}catch(e)
	{
		alert("[app_eclaim2_transaksi_fBASTParsialV]::contruct:"+e,"");
	}
};
window.app_eclaim2_transaksi_fBASTParsialV.extend(window.childForm);
window.app_eclaim2_transaksi_fBASTParsialV.implement({
	doAfterResize: function(width, height){
	   this.setTop(55);
	   this.setHeight(height + 40);
    },
    doClose: function(sender){
        this.app._mainForm.bSimpan.setCaption("<u>S</u>impan");
    },
    initComponent: function(){
		try{
			uses("util_standar;util_filterRep;button;saiGrid;sgNavigator;toolbar;roundPanel;datePicker;radioButton");						
			this.standarLib = new util_standar();
			this.dbLib = new util_dbLib();
			this.dbLib.addListener(this);
			this.toolbar = new toolbar(this,{bound:[this.width - 170,5,150,25],buttonClick:[this,"doToolBarClick"]});
			this.toolbar.addButton("bFilter","Filter","icon/dynpro/filter2.png","Filter");
			this.toolbar.addButton("bOptions","Options","icon/dynpro/filter2.png","");
			this.toolbar.makeRound(5);			
			this.p1mp = new panel(this,{bound:[10,35,this.width - 25,250],border:3,caption:"Daftar BAST"});
			this.sg1mp = new saiGrid(this.p1mp,{bound:[1,20,this.p1mp.width - 4,this.p1mp.height - 50],colCount:7,colTitle:["No. BAST","No. Klaim","Tertanggung","Tgl BAST","No. Dokumen","Keterangan","Preview History"],
                colWidth:[[6,5,4,3,2,1,0],[100,100,100,100,0,100,100]],dblClick:[this,"sg1onDblClick"], selectCell:[this,"doSgClick"], colAlign:[[6],[alCenter]],colFormat:[[6],[cfButton]],readOnly:true});
            this.sgn = new sgNavigator(this.p1mp,{bound:[1,this.p1mp.height - 25,this.p1mp.width - 4,25],buttonStyle:3, pager:[this,"doPager"], grid:this.sg1mp});
					
			this.p1mp2 = new panel(this,{bound:[20,300,500,180],border:3,caption:"Detail File"});
			this.sg1mp2 = new saiGrid(this.p1mp2,{bound:[1,20,this.p1mp.width - 4,128],colCount:2,readOnly:true,colTitle:["Nama File","Download"],
                colWidth:[[1,0],[100,250]],colFormat:[[1],[cfButton]],click:[this,"doSgBtnClick"], colAlign:[[1],[alCenter]]});
			this.sgn2 = new sgNavigator(this.p1mp2,{bound:[1,this.p1mp2.height - 25,this.p1mp2.width - 2,25],buttonStyle:3, pager:[this,"doPager"],beforePrint:[this,"doBeforePrintSg2"], grid:this.sg1mp2});            
					
			this.userLogin="";
			if (this.app._userStatus=='U')
			{
				this.userLogin = " and b.nik_buat='"+this.app._userLog+"'"; 
			}
			
			this.pager = 50;
			var sql = "select count(a.no_bast)	   "+                         
					"from tlk_bast a "+
					"inner join tlk_klaim b on a.no_klaim=b.no_klaim "+
					"inner join tlk_ttg c on b.kode_ttg=c.kode_ttg "+					
					"where a.kode_lokasi='"+this.app._lokasi+"' and b.kode_ttg='"+this.app._kodeTtg+"'  "+this.userLogin;
			this.sqlCount = sql;
			this.rowCount = this.dbLib.getRowCount(sql, this.pager);
            this.sgn.setTotalPage(this.rowCount);
            this.sgn.rearrange();
                        
			this.pFilter = new roundPanel(this,{bound:[this.width - 520,35,500,235],caption:"Filter",visible:false,background:"image/themes/dynpro/roundpanelBgCenter.png",icon:"image/themes/dynpro/iconpanel.png",color:"#edf5f8",titleBg:"#95cae8"});          
            
            this.bApply = new button(this.pFilter,{bound:[10,160,80,20],caption:"Apply",click:[this,"doClick"]});
			this.sgFilter = new saiGrid(this.pFilter,{bound:[10,0,this.pFilter.width - 30,150],colCount:4,rowCount:4,
				colTitle:["Filter","Type","Value1","Value2"],selectCell:[this,"doSelectFilterCell"],ellipsClick:[this,"doEllipsFilterClick"],change:[this,"sg1onChange"],
				colWidth:[[3,2,1,0],[100,100,60,150]]});
			this.sgFilter.columns.get(1).setButtonStyle(window.bsAuto);
			var val = new arrayMap({items:["All","=","Range","Like","<="]});			
			this.sgFilter.columns.get(1).setPicklist(val);
            this.pFilter.setTabChildIndex();
			this.sql =  "select a.no_bast,a.no_klaim,c.nama as nama_ttg,date_format(a.tanggal,'%d/%m/%Y') as tanggal, "+
						"a.no_dokumen,a.keterangan    "+
						"from tlk_bast a "+
						"inner join tlk_klaim b on a.no_klaim=b.no_klaim "+
						"inner join tlk_ttg c on b.kode_ttg=c.kode_ttg "+			
						"where a.kode_lokasi = '"+this.app._lokasi+"' and b.kode_ttg='"+this.app._kodeTtg+"'  "+this.userLogin;	
			
			this.filter = "";
			this.doPager(this.sgn,1);			
			this.sgFilter.editData(0,["Periode","All","",""]);
			this.sgFilter.editData(1,["Tertanggung","=",this.app._kodeTtg,""]);
			this.sgFilter.editData(2,["No Klaim","All","",""]);			
			this.sgFilter.editData(3,["No BAST","All","",""]);			
			this.filterRep = new util_filterRep();			
		}catch(e){
			alert(e);
		}
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
                this.filter = this.filterRep.filterStr("a.periode",this.sgFilter.getCell(1,0),this.sgFilter.getCell(2,0),this.sgFilter.getCell(3,0),"and") +			    
			    this.filterRep.filterStr("b.kode_ttg",this.sgFilter.getCell(1,1),this.sgFilter.getCell(2,1),this.sgFilter.getCell(3,1),"and")+
			    this.filterRep.filterStr("b.no_klaim",this.sgFilter.getCell(1,2),this.sgFilter.getCell(2,2),this.sgFilter.getCell(3,2),"and")+
			    this.filterRep.filterStr("a.no_bast",this.sgFilter.getCell(1,3),this.sgFilter.getCell(2,3),this.sgFilter.getCell(3,3),"and");
				
    			this.rowCount = this.dbLib.getRowCount(this.sqlCount+this.filter, this.pager);				
				
                this.sgn.setTotalPage(this.rowCount);            			
                this.sgn.rearrange();
                
    	        this.doPager(this.sgn,1);		        
    	        this.pFilter.hide();
            }
       }catch(e){
            alert(e);
       }
    },
    FindBtnClick: function(sender){        
    },
	doPager: function(sender,page){
			this.senderPager = sender;
			if (sender == this.sgn){
				this.activePage = page;
				this.dbLib.getDataProviderPageA(this.sql+" "+this.filter+" order by a.tanggal desc",page, this.pager);   			 
			}
    },
	doRequestReady: function(sender, methodName, result){				
	   try{
	   if (sender === this.dbLib){
	       if (methodName == "getDataProviderPage"){
	            var brg = JSON.parse(result);
    			if (typeof(brg) !== "string"){
			        if (this.senderPager == this.sgn){
						this.sg1mp.clear();
						this.gridDataTmp = new arrayMap();
						if (brg.rs.rows[0]!=undefined)
						{
							this.sg1mp.showLoading();
							var line;
							for (var i in brg.rs.rows){
								line = brg.rs.rows[i];
								this.gridDataTmp.set(line.no_bast,line);
								this.sg1mp.appendData([line.no_bast,line.no_klaim, line.nama_ttg, line.tanggal, line.no_dokumen, line.keterangan,"Preview"]);
								this.sg1mp.rows.get(i).setData(line);
								this.sg1mp.rows.get(i).setCellColor(6,"#ff9900");
								this.sg1mp.rows.get(i).setHint("Double Click untuk menampilkan detail.");
							}					
							this.sg1mp.hideLoading();
						}
					}else if (this.senderPager == this.sgnHist){
						this.this.sg1mp2.clear();					
						if (brg.rs.rows[0]!=undefined){
							this.sgHist.showLoading();
							var line;
							for (var i in brg.rs.rows){
								line = brg.rs.rows[i];								
								this.sgHist.appendData([(line.status == "1" ? "<img width=18 height=18 src='image/ok.png' />." :"<img width=18 height=18 src='image/error.png' />." ),line.no_bast,line.no_bast, line.tanggal, line.no_dokumen, line.keterangan, floatToNilai(line.nilai), floatToNilai(line.nilai_adjust)]);								
							}					
							this.sgHist.hideLoading();
						}
					}
    			}	
 			} 			
	   }
	   }catch(e){
			alert(e+"\r\n"+result);
	   }
	},
	doSgBtnClick: function(sender, col, row){
		try{
			if (col === 1)
				window.open("server/media/"+this.sg1mp2.getCell(0,row));
		}catch(e){
			alert(e);
		}
	},
	sg1onDblClick:function(sender, col, row){
		if(col < 10){
			if (this.trail2 === undefined){
				uses("app_eclaim2_transaksi_fLapView");
				this.trail2 = new app_eclaim2_transaksi_fLapView(this.owner,undefined, this);			
			}
			this.block(true);
			this.trail2.setValue({klaim:sender.cells(1,row)});
			this.trail2.setPanelCaption("Detail Klaim "+ sender.cells(1,row));
			this.trail2.show();				
		}
	},
	doSgClick:function(sender, col, row){		
		if (sender == this.sg1mp){
			try{
				var data = this.dbLib.getDataProvider("select nama as nm from tlk_bast_dok "+
						"where no_bast='"+this.sg1mp.getCell(0,row)+"' and kode_lokasi = '"+this.app._lokasi+"'  ",true);
				this.sg1mp2.clear();
				if (typeof(data) != "string")
				{  
					if (data.rs.rows[0] != undefined)
					{
						this.sg1mp2.showLoading();
						this.sg1mp2.setColWidth([1,0],[100,250]);
						for (var k in data.rs.rows){
							var line=data.rs.rows[k];
							this.sg1mp2.appendData([line.nm,"Download"]);
							this.sg1mp2.rows.get(k).setCellColor(1,"#ff9900");							
						}
						this.sg1mp2.hideLoading();
					}
				}				
				this.sgn2.setTotalPage(1);
				this.sgn2.rearrange();						
			}catch(e){
				alert(e);
			}
		}else{
			if (col == 10){
				var sql =  "select a.status, a.no_bast,a.no_klaim,c.nama as nama_ttg,date_format(a.tanggal,'%d/%m/%Y') as tanggal, "+
					"a.no_dokumen,a.keterangan   "+                         
					"from tlk_bast a "+
					"inner join tlk_klaim b on a.no_klaim=b.no_klaim "+
					"inner join tlk_ttg c on b.kode_ttg=c.kode_ttg "+					
					"where a.kode_lokasi = '"+this.app._lokasi+"' and b.kode_ttg='"+this.app._kodeTtg+"' and a.no_bast = '"+this.sg1mp.cells(3,row)+"' ";
					
				var sqlCount =  "select count(a.no_bast) "+                         
					"from tlk_bast a "+
					"inner join tlk_klaim b on a.no_klaim=b.no_klaim "+
					"inner join tlk_ttg c on b.kode_ttg=c.kode_ttg "+					
					"where a.kode_lokasi = '"+this.app._lokasi+"' and b.kode_ttg='"+this.app._kodeTtg+"' and a.no_bast = '"+this.sg1mp.cells(3,row)+"'  ";
				var rowCount = this.dbLib.getRowCount(sqlCount, this.pager);
				this.sgnHist.setTotalPage(rowCount);
				this.sgnHist.rearrange();
				this.senderPager = this.sgnHist;
				this.dbLib.getDataProviderPageA(sql,1,this.pager);
				this.lastSurvey = this.sg1mp.cells(3,row);
			}else if (this.lastSurvey != this.sg1mp.cells(3,row)){
				this.sgHist.clear(1);
				this.sgnHist.setTotalPage(0);
				this.sgnHist.rearrange();
			}			
		}
	},
	mainButtonClik: function(sender){
	   if (sender == this.app._mainForm.bSimpan) system.confirm(this, "simpan", "Apa data sudah benar?","data di form ini akan di proses.");	
    },	
	doSelectFilterCell: function(sender, col, row){
		try{
			sender.columns.get(2).setReadOnly(false);
			sender.columns.get(2).setReadOnly(true);
			this.filterRep.setSGFilterRowTipe(sender, row,new Array(0,1,2,3,4,5),new  Array("123","123","123","123","123","123"));			
			this.filterRep.setSGFilterRowButtonStyle(sender, row,new Array(0,1,2,3,4,5),new  Array(0,2,2,2,2,2));
			if (row == 0)
			{
			
				var rs = this.dbLib.runSQL("select distinct periode from tlk_bnatek where kode_lokasi='"+this.app._lokasi+"' order by periode desc ");
				if (rs instanceof arrayMap){
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
													  "select kode_ttg,nama from tlk_ttg where kode_lokasi='"+this.app._lokasi+"'",
													  "select count(kode_ttg) from tlk_ttg where kode_lokasi='"+this.app._lokasi+"'",
													  new Array("kode_ttg","nama"),"and",new Array("kode","nama"));
		}
		if (row == 2)
		{
			this.filterRep.ListDataSGFilter(this, "Data Klaim",sender, sender.row, sender.col,
													  "select no_klaim,no_dokumen,date_format(tanggal,'%d/%m/%Y') as tanggal from tlk_klaim a where kode_lokasi='"+this.app._lokasi+"'"+
													  this.filterRep.filterStr("a.periode",this.sgFilter.getCell(1,0),this.sgFilter.getCell(2,0),this.sgFilter.getCell(3,0),"and") +			    
													  this.filterRep.filterStr("a.kode_ttg",this.sgFilter.getCell(1,1),this.sgFilter.getCell(2,1),this.sgFilter.getCell(3,1),"and"),
													  "select count(no_klaim) from tlk_klaim a where kode_lokasi='"+this.app._lokasi+"' "+
													  this.filterRep.filterStr("a.periode",this.sgFilter.getCell(1,0),this.sgFilter.getCell(2,0),this.sgFilter.getCell(3,0),"and") +			    
													  this.filterRep.filterStr("a.kode_ttg",this.sgFilter.getCell(1,1),this.sgFilter.getCell(2,1),this.sgFilter.getCell(3,1),"and"),
													  new Array("no_klaim","no_dokumen","tanggal"),"and",new Array("no klaim","no dokumen","tanggal"));
		}
		if (row == 3)
		{
			this.filterRep.ListDataSGFilter(this, "Data BAST",sender, sender.row, sender.col,
													  "select a.no_bast,a.no_dokumen,date_format(a.tanggal,'%d/%m/%Y') as tanggal from tlk_bast a "+
													  "	inner join tlk_klaim b on b.no_klaim = a.no_klaim and b.kode_lokasi = a.kode_lokasi "+
													  " where a.kode_lokasi='"+this.app._lokasi+"' "+
													  this.filterRep.filterStr("a.periode",this.sgFilter.getCell(1,0),this.sgFilter.getCell(2,0),this.sgFilter.getCell(3,0),"and") +			    
													  this.filterRep.filterStr("b.kode_ttg",this.sgFilter.getCell(1,1),this.sgFilter.getCell(2,1),this.sgFilter.getCell(3,1),"and")+
													  this.filterRep.filterStr("a.no_klaim",this.sgFilter.getCell(1,2),this.sgFilter.getCell(2,2),this.sgFilter.getCell(3,2),"and"),
													  "select count(no_bast) from tlk_bast a "+
													  "	inner join tlk_klaim b on b.no_klaim = a.no_klaim and b.kode_lokasi = a.kode_lokasi "+
													  " where a.kode_lokasi='"+this.app._lokasi+"' "+
													  this.filterRep.filterStr("a.periode",this.sgFilter.getCell(1,0),this.sgFilter.getCell(2,0),this.sgFilter.getCell(3,0),"and") +			    
													  this.filterRep.filterStr("b.kode_ttg",this.sgFilter.getCell(1,1),this.sgFilter.getCell(2,1),this.sgFilter.getCell(3,1),"and")+
													  this.filterRep.filterStr("a.no_klaim",this.sgFilter.getCell(1,2),this.sgFilter.getCell(2,2),this.sgFilter.getCell(3,2),"and"),
													  ["no_bast","no_dokumen","tanggal"],"and",["No BAST","no dokumen","tanggal"]);
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
	}
});
