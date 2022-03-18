//***********************************************************************************************
//*	Copyright (c) 2009 SAI
//*	 All rights reserved. This program and the accompanying materials
//*	 are made available under the terms of the Common Public License v1.0
//*	 which accompanies this distribution, and is available at
//*	Contributors 
//* 			SAI, PT											
//***********************************************************************************************
window.app_eclaim_transaksi_fBayarV = function(owner,options){
	try{
		if (owner)
		{
			window.app_eclaim_transaksi_fBayarV.prototype.parent.constructor.call(this, owner,options);
			this.className = "app_eclaim_transaksi_fBayarV";
			this.maximize();
			this.app._mainForm.childFormConfig(this, "mainButtonClick","View Pembayaran",0);
            this.initComponent();
            this.onClose.set(this,"doClose");
			this.app._mainForm.bSimpan.setCaption("Proses");
		}
	}catch(e)
	{
		alert("[app_eclaim_transaksi_fBayarV]::contruct:"+e,"");
	}
};
window.app_eclaim_transaksi_fBayarV.extend(window.portalui_childForm);
window.app_eclaim_transaksi_fBayarV.implement({
	doAfterResize: function(width, height){
	   this.setTop(55);
	   this.setHeight(height + 40);
    },
    doClose: function(sender){
        this.app._mainForm.bSimpan.setCaption("<u>S</u>impan");
    },
    initComponent: function(){
		try{
			uses("util_standar;util_filterRep;portalui_button;portalui_saiGrid;portalui_sgNavigator;portalui_toolbar;portalui_roundPanel;portalui_datePicker;portalui_radioButton;util_filterRep");						
			this.standarLib = new util_standar();
			this.dbLib = new util_dbLib();
			this.dbLib.addListener(this);
			this.toolbar = new portalui_toolbar(this,{bound:[this.width - 170,5,150,25],buttonClick:[this,"doToolBarClick"]});
			this.toolbar.addButton("bFilter","Filter","icon/dynpro/filter2.png","Filter");
			this.toolbar.addButton("bOptions","Options","icon/dynpro/filter2.png","");
			this.toolbar.makeRound(5);
			//this.bMark = new portalui_button(this,{bound:[20,10,80,20],caption:"Mark All",click:"doClick"});
			//this.bUnmark = new portalui_button(this,{bound:[110,10,80,20],caption:"Unmark All",click:"doClick"});
			//this.bProcess = new portalui_button(this,{bound:[200,10,80,20],caption:"Proses",click:"doClick"});
			this.p1mp = new portalui_panel(this,{bound:[10,35,this.width - 25,250],border:3,caption:"Daftar Pembayaran"});
			this.sg1mp = new portalui_saiGrid(this.p1mp,{bound:[1,20,this.p1mp.width - 4,this.p1mp.height - 50],colCount:12,colTitle:["No. Bayar","No. Klaim","Nama Tertanggung","No. Adjust","Tgl Bayar","No. Dokumen","Keterangan","Nilai Estimasi","Nilai Adjust","Nilai Adv Pay","Nilai Bayar","Preview Dok"],
                colWidth:[[10,9,8,7,6,5,4,3,2,1,0],[100,100,100,100,100,100,100,100,100,100,100]],dblClick:[this,"sg1onDblClick"],click:[this,"doSgClick"], colAlign:[[11],[alCenter]],colFormat:[[7,8,9,10,11],[cfNilai,cfNilai,cfNilai,cfNilai,cfButton]],readOnly:true});
            this.sgn = new portalui_sgNavigator(this.p1mp,{bound:[1,this.p1mp.height - 25,this.p1mp.width - 4,25],buttonStyle:3, pager:[this,"doPager"], grid:this.sg1mp});
			this.p1mp2 = new portalui_panel(this,{bound:[10,300,this.width - 25,180],border:3,caption:"Detail File"});
			this.sg1mp2 = new portalui_saiGrid(this.p1mp2,{bound:[1,20,this.p1mp.width - 4,128],colCount:3,readOnly:true,colTitle:["No. Bayar","Nama File","Download"],
                colWidth:[[2,1,0],[100,250,100]],colFormat:[[2],[cfButton]], colAlign:[[2],[alCenter]],click:[this,"doSgBtnClick"]});
			this.sgn2 = new portalui_sgNavigator(this.p1mp2,{bound:[1,this.p1mp2.height - 25,this.p1mp2.width - 2,25],buttonStyle:3, pager:[this,"doPager"],beforePrint:[this,"doBeforePrintSg2"], grid:this.sg1mp2});
            //this.totalmp2 = new portalui_saiLabelEdit(this.sgn2,{bound:[this.p1mp2.width-252,2,250,20],tipeText:ttNilai, alignment:alRight,caption:"Total",readOnly:true});
			this.userLogin="";
			if (this.app._userStatus=='U')
			{
				this.userLogin = " and b.nik_buat='"+this.app._userLog+"'"; 
			}
			this.pager = 50;
			var sql =  "select count(a.no_bayar)	   "+                         
						"from eclaim_bayar a "+
						"inner join eclaim_klaim b on a.no_klaim=b.no_klaim "+
						"inner join eclaim_ttg c on b.kode_ttg=c.kode_ttg "+
						"inner join eclaim_adjust d on a.no_adjust=d.no_adjust "+
						"where a.kode_lokasi='"+this.app._lokasi+"' and b.kode_ttg='"+this.app._kodeTtg+"'"+this.userLogin;	
			this.sqlCount = sql;
			this.rowCount = this.dbLib.getRowCount(sql, this.pager);
            this.sgn.setTotalPage(this.rowCount);            			
            this.sgn.rearrange();
            
            this.pFilter = new portalui_roundPanel(this,{bound:[this.width - 520,35,500,235],caption:"Filter",visible:false,background:"image/themes/dynpro/roundpanelBgCenter.png",icon:"image/themes/dynpro/iconpanel.png",color:"#edf5f8",titleBg:"#95cae8"});          
            
            this.bApply = new portalui_button(this.pFilter,{bound:[10,160,80,20],caption:"Apply",click:[this,"doClick"]});
			this.sgFilter = new portalui_saiGrid(this.pFilter,{bound:[10,0,this.pFilter.width - 30,150],colCount:4,rowCount:5,
				colTitle:["Filter","Type","Value1","Value2"],selectCell:[this,"doSelectFilterCell"],ellipsClick:[this,"doEllipsFilterClick"],change:[this,"sg1onChange"],
				colWidth:[[3,2,1,0],[100,100,60,150]]});
			this.sgFilter.columns.get(1).setButtonStyle(window.bsAuto);
			var val = new portalui_arrayMap({items:["All","=","Range","Like","<="]});			
			this.sgFilter.columns.get(1).setPicklist(val);
            this.pFilter.setTabChildIndex();
			this.sql =  "select a.no_bayar,a.no_klaim,c.nama as nama_ttg,a.no_adjust,date_format(a.tanggal,'%d/%m/%Y') as tanggal, "+
						"a.no_dokumen,a.keterangan,b.nilai,d.nilai as nilai_adjust,d.nilai_dp,a.nilai as nilai_bayar "+                         
						"from eclaim_bayar a "+
						"inner join eclaim_klaim b on a.no_klaim=b.no_klaim "+
						"inner join eclaim_ttg c on b.kode_ttg=c.kode_ttg "+
						"inner join eclaim_adjust d on a.no_adjust=d.no_adjust "+
						"where a.kode_lokasi = '"+this.app._lokasi+"' and b.kode_ttg='"+this.app._kodeTtg+"'"+this.userLogin;	
			this.filter = "";
			this.doPager(this.sgn,1);			
			this.sgFilter.editData(0,["Periode","All","",""]);
			this.sgFilter.editData(1,["Tertanggung","=",this.app._kodeTtg,""]);
			this.sgFilter.editData(2,["No Klaim","All","",""]);
			this.sgFilter.editData(3,["No Adjust","All","",""]);
			this.sgFilter.editData(4,["No Bayar","All","",""]);
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
			    this.filterRep.filterStr("a.no_klaim",this.sgFilter.getCell(1,2),this.sgFilter.getCell(2,2),this.sgFilter.getCell(3,2),"and")+
			    this.filterRep.filterStr("a.no_adjust",this.sgFilter.getCell(1,3),this.sgFilter.getCell(2,3),this.sgFilter.getCell(3,3),"and")+
			    this.filterRep.filterStr("a.no_bayar",this.sgFilter.getCell(1,4),this.sgFilter.getCell(2,4),this.sgFilter.getCell(3,4),"and");
				
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
        if (sender == this.cbSales)
            this.standarLib.showListData(this.getForm(), "Data Sales",sender,undefined,
										  "select kode_sales,nama from portal_sales where kode_lokasi ='"+this.app._lokasi+"' ",
										  "select count(*) from portal_sales where kode_lokasi ='"+this.app._lokasi+"' ",
										  ["kode_sales","nama"],"and",["Kode Sales","Nama"]);
        if (sender == this.cbCust)
            this.standarLib.showListData(this.getForm(), "Data Customer",sender,undefined,
										  "select kode_cust,nama from portal_cust where kode_lokasi ='"+this.app._lokasi+"' ",
										  "select count(*) from portal_cust where kode_lokasi ='"+this.app._lokasi+"' ",
										  ["kode_cust","nama"],"and",["Kode Customer","Nama"]);
    },
	doPager: function(sender,page){
	       this.activePage = page;
	       this.dbLib.getDataProviderPageA(this.sql+this.filter+" order by a.tanggal desc ",page, this.pager);   			 
    },
	doRequestReady: function(sender, methodName, result){
	   try{
	   if (sender === this.dbLib){
	       if (methodName == "getDataProviderPage"){
	            eval("brg = "+result+";");
    			if (typeof(brg) !== "string")
    			{
			        this.sg1mp.clear();
  					this.gridDataTmp = new portalui_arrayMap();
                    if (brg.rs.rows[0]!=undefined)
    				{
    					this.sg1mp.showLoading();
    					var line;
                        for (var i in brg.rs.rows){
                            line = brg.rs.rows[i];
                            this.gridDataTmp.set(line.no_bayar,line);
                            this.sg1mp.appendData([line.no_bayar,line.no_klaim, line.nama_ttg, line.no_adjust,line.tanggal, line.no_dokumen, line.keterangan, floatToNilai(line.nilai), floatToNilai(line.nilai_adjust), floatToNilai(line.nilai_dp),floatToNilai(line.nilai_bayar),"Preview"]);
                            this.sg1mp.rows.get(i).setData(line);
							this.sg1mp.rows.get(i).setCellColor(11,"#ff9900");
							this.sg1mp.rows.get(i).setHint("Double Click untuk menampilkan detail.");
                        }					
    					this.sg1mp.hideLoading();
    				}
    			}	
 			}
 			if (methodName == "execArraySQL"){
 			    if (result.toLowerCase().search("error") != -1)
 			        systemAPI.alert(result);
                else {
                    this.dataPrinted = new portalui_arrayMap();
                    for (var i=0;i < this.sg1mp.getRowCount();i++){
                        if (this.sg1mp.cells(0,i) == "true" && this.gridDataTmp.get(this.sg1mp.cells(1,i)).status == "false"){
                            this.dataPrinted.set(this.sg1mp.cells(1,i),this.sg1mp.rows.get(i).data);
                        }
                    }                                        
                    this.doPager(this.sgn,this.activePage);
                    if (this.dataPrinted.getLength() > 0) this.htmlPrinted = this.printDetail(this.dataPrinted);
                    else system.info(this,"Tidak ada data yang bisa diproses","Cek data anda");
                }
 			}
	   }
	   }catch(e){
			alert(e);
	   }
	},
	doSgBtnClick: function(sender, col, row){
		try{
			if (col === 2)
				window.open("server/media/"+this.sg1mp2.getCell(1,row));
		}catch(e){
			alert(e);
		}
	},
	sg1onDblClick:function(sender, col, row){
		if(col < 11){
			if (this.trail2 === undefined){
				uses("app_eclaim_transaksi_fLapView");
				this.trail2 = new app_eclaim_transaksi_fLapView(this.owner,undefined, this);			
			}
			this.block(true);
			this.trail2.setValue({klaim:sender.cells(1,row)});
			this.trail2.setPanelCaption("Detail Klaim "+ sender.cells(1,row));
			this.trail2.show();				
		}
	},
	doSgClick:function(sender, col, row){		
		if (col == 11){
			try{
				var data = this.dbLib.getDataProvider("select no_bayar,nama as nm from eclaim_bayar_dok "+
						"where no_bayar='"+this.sg1mp.getCell(0,row)+"' and kode_lokasi = '"+this.app._lokasi+"'  ",true);
				this.sg1mp2.clear();
				if (typeof(data) != "string")
				{  
					if (data.rs.rows[0] != undefined)
					{
						this.sg1mp2.showLoading();
						this.sg1mp2.setColWidth([2,1,0],[100,250,100]);
						for (var k in data.rs.rows){
							var line=data.rs.rows[k];
							this.sg1mp2.appendData([line.no_bayar,line.nm,"Download"]);
							this.sg1mp2.rows.get(k).setCellColor(2,"#ff9900");
						}
						this.sg1mp2.hideLoading();
					}
				}
				/*for (var k=0; k < this.sg1mp2.rows.getLength(); k++){
						this.sg1mp2.setCell(2,k,"<a href='server/media/"+this.sg1mp2.getCell(2,k)+"' target='_blank'>Download</a>");			
				}*/
				//this.dataPrinted = new portalui_arrayMap();
				//this.dataPrinted.set(this.sg1mp.cells(0,row),this.sg1mp.rows.get(row).data);
				this.sgn2.setTotalPage(1);
				this.sgn2.rearrange();
				this.htmlPrinted = undefined;
				/*var tot=0;
				for (var k=0; k < this.sg1mp2.rows.getLength(); k++)
					tot+=nilaiToFloat(this.sg1mp2.getCell(7,k));			
				this.totalmp2.setText(floatToNilai(tot));*/
			}catch(e){
				alert(e);
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
			this.filterRep.setSGFilterRowTipe(sender, row,new Array(0,1,2,3,4),new Array("123","123","123","123","123"));
			this.filterRep.setSGFilterRowButtonStyle(sender, row,new Array(0,1,2,3,4),new Array(0,2,2,2,2));
			if (row == 0)
			{
			
				var rs = this.dbLib.runSQL("select distinct periode from eclaim_bayar where kode_lokasi='"+this.app._lokasi+"' order by periode desc ");
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
			this.filterRep.ListDataSGFilter(this, "Data Tertanggung",this.sg1, this.sg1.row, this.sg1.col,
													  "select kode_ttg,nama from eclaim_ttg where kode_lokasi='"+this.app._lokasi+"'",
													  "select count(kode_ttg) from eclaim_ttg where kode_lokasi='"+this.app._lokasi+"'",
													  new Array("kode_ttg","nama"),"and",new Array("kode","nama"));
		}
		if (row == 2)
		{
			this.filterRep.ListDataSGFilter(this, "Data Klaim",this.sg1, this.sg1.row, this.sg1.col,
													  "select no_klaim,no_dokumen,date_format(tanggal,'%d/%m/%Y') as tanggal from eclaim_klaim where kode_lokasi='"+this.app._lokasi+"'",
													  "select count(no_klaim) from eclaim_klaim  where kode_lokasi='"+this.app._lokasi+"'",
													  new Array("no_klaim","no_dokumen","tanggal"),"and",new Array("no klaim","no dokumen","tanggal"));
		}
		if (row == 3)
		{
			this.filterRep.ListDataSGFilter(this, "Data Adjustment",this.sg1, this.sg1.row, this.sg1.col,
													  "select no_adjust,no_dokumen,date_format(tanggal,'%d/%m/%Y') as tanggal from eclaim_adjust where kode_lokasi='"+this.app._lokasi+"'",
													  "select count(no_adjust) from eclaim_adjust  where kode_lokasi='"+this.app._lokasi+"'",
													  new Array("no_adjust","no_dokumen","tanggal"),"and",new Array("no adjust","no dokumen","tanggal"));
		}
		if (row == 4)
		{
			this.filterRep.ListDataSGFilter(this, "Data Pembayaran",this.sg1, this.sg1.row, this.sg1.col,
													  "select no_bayar,no_dokumen,date_format(tanggal,'%d/%m/%Y') as tanggal from eclaim_bayar where kode_lokasi='"+this.app._lokasi+"'",
													  "select count(no_bayar) from eclaim_bayar  where kode_lokasi='"+this.app._lokasi+"'",
													  new Array("no_bayar","no_dokumen","tanggal"),"and",new Array("no bayar","no dokumen","tanggal"));
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