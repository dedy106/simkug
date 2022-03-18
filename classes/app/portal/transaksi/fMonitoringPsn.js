//***********************************************************************************************
//*	Copyright (c) 2009 SAI
//*	 All rights reserved. This program and the accompanying materials
//*	 are made available under the terms of the Common Public License v1.0
//*	 which accompanies this distribution, and is available at
//*	Contributors 
//* 			SAI, PT											
//***********************************************************************************************
window.app_portal_transaksi_fMonitoringPsn = function(owner,options){
	try{
		if (owner)
		{
			window.app_portal_transaksi_fMonitoringPsn.prototype.parent.constructor.call(this, owner,options);			
			this.className = "app_portal_transaksi_fMonitoringPsn";														
			this.maximize();
			this.app._mainForm.childFormConfig(this, "mainButtonClick","Monitoring Pemesanan Barang",0);				
            this.initComponent();					
            this.onClose.set(this,"doClose");
			this.app._mainForm.bSimpan.setCaption("Proses");						
		}
	}catch(e)
	{
		alert("[app_portal_transaksi_fMonitoringPsn]::contruct:"+e,"");
	}
};
window.app_portal_transaksi_fMonitoringPsn.extend(window.portalui_childForm);
window.app_portal_transaksi_fMonitoringPsn.implement({
	doAfterResize: function(width, height){
	   this.setTop(55);
	   this.setHeight(height + 40);
    },        
    doClose: function(sender){
        this.app._mainForm.bSimpan.setCaption("<u>S</u>impan");
    },
    initComponent: function(){		
		try{
			uses("util_standar;portalui_button;portalui_saiGrid;portalui_sgNavigator;portalui_toolbar;portalui_roundPanel;portalui_datePicker;portalui_radioButton");						
			this.standarLib = new util_standar();
			this.dbLib = new util_dbLib();
			this.dbLib.addListener(this);
			this.toolbar = new portalui_toolbar(this,{bound:[this.width - 170,5,150,25],buttonClick:[this,"doToolBarClick"]});
			this.toolbar.addButton("bFilter","Filter","icon/dynpro/filter2.png","Filter");
			this.toolbar.addButton("bOptions","Options","icon/dynpro/filter2.png","");
			this.toolbar.makeRound(5);			
			this.bMark = new portalui_button(this,{bound:[20,10,80,20],caption:"Mark All",click:"doClick"});
			this.bUnmark = new portalui_button(this,{bound:[110,10,80,20],caption:"Unmark All",click:"doClick"});
			this.bProcess = new portalui_button(this,{bound:[200,10,80,20],caption:"Proses",click:"doClick"});
			this.p1mp = new portalui_panel(this,{bound:[10,35,this.width - 25,250],border:3,caption:"Daftar Order"});
			this.sg1mp = new portalui_saiGrid(this.p1mp,{bound:[1,20,this.p1mp.width - 4,this.p1mp.height - 50],colCount:10,colTitle:["Proses","No. Order","Tanggal","Keterangan","Kode Sales","Nama Sales","Kode Cust","Nama Customer","Alamat","Kota"],
                colWidth:[[9,8,7,6,5,4,3,2,1,0],[100,200,200,100,200,100,200,80,100,60]],dblClick:[this,"sg1onDblClick"], colFormat:[[0],[cfBoolean]],readOnly:true});
            this.sgn = new portalui_sgNavigator(this.p1mp,{bound:[1,this.p1mp.height - 25,this.p1mp.width - 4,25],buttonStyle:3, pager:[this,"doPager"], grid:this.sg1mp});
			this.p1mp2 = new portalui_panel(this,{bound:[10,300,this.width - 25,180],border:3,caption:"Detail Order"});
			this.sg1mp2 = new portalui_saiGrid(this.p1mp2,{bound:[1,20,this.p1mp.width - 4,128],colCount:6,readOnly:true,colTitle:["Kode Barang","Nama Barang","Harga","Jumlah","Bonus","Sub Total"],
                colWidth:[[5,4,3,2,1,0],[100,100,100,100,250,100]],colFormat:[[4,5],[cfNilai, cfNilai]]});
			this.sgn2 = new portalui_sgNavigator(this.p1mp2,{bound:[1,this.p1mp2.height - 25,this.p1mp2.width - 2,25],buttonStyle:3, pager:[this,"doPager"],beforePrint:[this,"doBeforePrintSg2"], grid:this.sg1mp2});
            this.totalmp2 = new portalui_saiLabelEdit(this.sgn2,{bound:[this.p1mp2.width-252,2,250,20],tipeText:ttNilai, alignment:alRight,caption:"Total",readOnly:true});
			this.pager = 50;
			this.rowCount = this.dbLib.getRowCount("select count(*) as tot from portal_order_m a "+
    				"   left outer join portal_cust b on b.kode_cust = a.kode_cust and b.kode_lokasi  = a.kode_lokasi "+
    				"   left outer join portal_sales  c on c.kode_sales = a.sales and c.kode_lokasi = a.kode_lokasi "+
    				"where a.kode_lokasi = '"+this.app._lokasi+"' ", this.pager);
            this.sgn.setTotalPage(this.rowCount);            			
            this.sgn.rearrange();
            
            this.pFilter = new portalui_roundPanel(this,{bound:[this.width - 420,35,400,200],caption:"Filter",visible:false,background:"image/themes/dynpro/roundpanelBgCenter.png",icon:"image/themes/dynpro/iconpanel.png",color:"#edf5f8",titleBg:"#95cae8"});          
            this.lTgl = new portalui_label(this.pFilter,{bound:[10,10,100,18],caption:"Tanggal",underline:true});
            this.dp1 = new portalui_datePicker(this.pFilter,{bound:[110,10,100,18]});
            this.lTgl = new portalui_label(this.pFilter,{bound:[220,10,30,18],caption:"s/d"});
            this.dp2 = new portalui_datePicker(this.pFilter,{bound:[250,10,100,18]});
            this.cbCust = new portalui_saiCBBL(this.pFilter,{bound:[10,33,180,20],caption:"Customer",btnClick:[this,"FindBtnClick"]});
            this.cbSales = new portalui_saiCBBL(this.pFilter,{bound:[10,56,180,20],caption:"Sales",btnClick:[this,"FindBtnClick"]});
            this.lTgl = new portalui_label(this.pFilter,{bound:[10,79,100,18],caption:"Status Proses",underline:true});
            this.cbProc1 = new portalui_radioButton(this.pFilter,{bound:[110,79,80,20],caption:"Sudah"});    
            this.cbProc2 = new portalui_radioButton(this.pFilter,{bound:[200,79,80,20],caption:"Belum"});    
            this.cbProc3 = new portalui_radioButton(this.pFilter,{bound:[300,79,80,20],caption:"Semua Status",selected:true});    
            this.bApply = new portalui_button(this.pFilter,{bound:[10,120,80,20],caption:"Apply",click:[this,"doClick"]});
            this.pFilter.setTabChildIndex();
            this.sql = "select a.no_order,date_format(a.tanggal,'%d-%m-%Y') as tgl,a.keterangan,case when a.status = '0' then 'false' else 'true' end as status, c.kode_sales, c.nama as namasls, b.kode_cust, b.nama, b.alamat, ifnull(d.nama,'-') as kota, ifnull(e.nama,'-') as cabang  "+
    				"from portal_order_m a "+
    				"   left outer join portal_cust b on b.kode_cust = a.kode_cust and b.kode_lokasi  = a.kode_lokasi "+
    				"   left outer join portal_sales  c on c.kode_sales = a.sales and c.kode_lokasi = a.kode_lokasi "+
    				"   left outer join portal_kota d on d.kode_kota = b.kota "+
    				"   left outer join portal_cabang e on e.kode_cab = d.kode_cab  "+
    				"where a.kode_lokasi = '"+this.app._lokasi+"' order by a.no_order";			
			this.doPager(this.sgn,1);
			this.bMark.setFocus();
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
                var status = this.cbProc1.isSelected() ? "1" : this.cbProc2.isSelected() ? "0" : "";
    			this.rowCount = this.dbLib.getRowCount("select count(*) as tot from portal_order_m a "+
        				"   left outer join portal_cust b on b.kode_cust = a.kode_cust and b.kode_lokasi  = a.kode_lokasi "+
        				"   left outer join portal_sales  c on c.kode_sales = a.sales and c.kode_lokasi = a.kode_lokasi "+
        				"where a.kode_lokasi = '"+this.app._lokasi+"' and a.tanggal between '"+this.dp1.getDateString()+"' and '"+this.dp2.getDateString()+"' "+
                        "   and a.kode_cust like '"+this.cbCust.getText()+"%' and a.sales like '"+this.cbSales.getText()+"%' and a.status like '"+status+"%' ", this.pager);
                this.sgn.setTotalPage(this.rowCount);            			
                this.sgn.rearrange();
                
                this.sql = "select a.no_order,date_format(a.tanggal,'%d-%m-%Y') as tgl,a.keterangan,case when a.status = '0' then 'false' else 'true' end as status, c.kode_sales, c.nama as namasls, b.kode_cust, b.nama, b.alamat, ifnull(d.nama,'-') as kota, ifnull(e.nama,'-') as cabang  "+
        				"from portal_order_m a "+
        				"   left outer join portal_cust b on b.kode_cust = a.kode_cust and b.kode_lokasi  = a.kode_lokasi "+
        				"   left outer join portal_sales  c on c.kode_sales = a.sales and c.kode_lokasi = a.kode_lokasi "+
        				"   left outer join portal_kota d on d.kode_kota = b.kota "+
    				    "   left outer join portal_cabang e on e.kode_cab = d.kode_cab  "+
        				"where a.kode_lokasi = '"+this.app._lokasi+"' and a.tanggal between '"+this.dp1.getDateString()+"' and '"+this.dp2.getDateString()+"' "+
                        "   and a.kode_cust like '"+this.cbCust.getText()+"%' and a.sales like '"+this.cbSales.getText()+"%' and a.status like '"+status+"%' order by a.no_order desc ";			
    	       this.doPager(this.sgn,1);		        
    	       this.pFilter.hide();
            }
            if (sender == this.bMark){
                for (var i= 0;i < this.sg1mp.getRowCount();i++){
                    this.sg1mp.cells(0,i,"true");
                }
                this.markStatus = "Mark";
            }
            if (sender == this.bUnmark){
                for (var i= 0;i < this.sg1mp.getRowCount();i++){
                    if (this.gridDataTmp.get(this.sg1mp.cells(1,i)).status == "true")
                        this.sg1mp.cells(0,i,"true");
                    else  this.sg1mp.cells(0,i,"false");
                }
                this.markStatus = "Unmark";
            }
            if (sender == this.bProcess){
               var sql = new server_util_arrayList(); 
               var sqlText = "update portal_order_m set status = '1' where no_order in (";
               var first = true;
               for (var i= 0;i < this.sg1mp.getRowCount();i++){
                    if (this.sg1mp.cells(0,i) == "true") {
                        if (!first) sqlText += ",";
                        sqlText += "'"+this.sg1mp.cells(1,i)+"'";
                        first = false;
                    }
               } 
               sqlText += ") and kode_lokasi = '"+this.app._lokasi+"' ";
               sql.add(sqlText);
               this.dbLib.execArraySQL(sql);
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
	       this.dbLib.getDataProviderPageA(this.sql,page, this.pager);   			 
    },
	doRequestReady: function(sender, methodName, result){				
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
                            this.gridDataTmp.set(line.no_order,line);
                            this.sg1mp.appendData([line.status, line.no_order, line.tgl, line.keterangan, line.kode_sales, line.namasls, line.kode_cust, line.nama, line.alamat, line.kota]);
                            this.sg1mp.rows.get(i).setData(line);
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
	},
	sg1onDblClick:function(sender, col, row){
		try{
			var data = this.dbLib.getDataProvider("select a.kode_produk,b.nama as nmbrg,a.harga,diskon,(a.harga * (100 - a.diskon) / 100) as hargadisc,a.jumlah,a.bonus,(a.jumlah*(a.harga * (100 - a.diskon) / 100)) as tot "+
					"from portal_order_d a inner join portal_produk b on a.kode_produk=b.kode_produk and a.kode_lokasi = b.kode_lokasi "+
					"where a.no_order='"+this.sg1mp.getCell(1,row)+"'  and a.kode_lokasi = '"+this.app._lokasi+"'  ",true);			
			if (typeof(data) != "string")
			{  
				if (data.rs.rows[0] != undefined)
				{
					this.sg1mp2.clear();
					//this.sg1mp2.setColTitle(["Kode Barang","Nama Barang","Bonus","Jumlah","Harga","Diskon","Harga Disc","Sub Total"]);   
					this.sg1mp2.setColTitle(["Kode Barang","Nama Barang","Harga","Diskon","Harga Disc","Jumlah","Bonus","Sub Total"]);   
					this.sg1mp2.showLoading();
					this.sg1mp2.setData(data);										
					this.sg1mp2.setColWidth([7,6,5,4,3,2,1,0],[100,100,100,100,100,100,250,100]);
					this.sg1mp2.columns.get(2).setColumnFormat(cfNilai);
					this.sg1mp2.columns.get(3).setColumnFormat(cfNilai);
					this.sg1mp2.columns.get(4).setColumnFormat(cfNilai);
					this.sg1mp2.columns.get(5).setColumnFormat(cfNilai);
					this.sg1mp2.columns.get(6).setColumnFormat(cfNilai);
					this.sg1mp2.columns.get(7).setColumnFormat(cfNilai);
				}
			}
			this.dataPrinted = new portalui_arrayMap();
			this.dataPrinted.set(this.sg1mp.cells(1,row),this.sg1mp.rows.get(row).data);
			this.sgn2.setTotalPage(1);
			this.sgn2.rearrange();
			this.htmlPrinted = undefined;
			var tot=0;
			for (var k=0; k < this.sg1mp2.rows.getLength(); k++)
				tot+=nilaiToFloat(this.sg1mp2.getCell(7,k));			
			this.totalmp2.setText(floatToNilai(tot));
		}catch(e){
			alert(e);
		}
	},
	mainButtonClik: function(sender){
	   if (sender == this.app._mainForm.bSimpan) system.confirm(this, "simpan", "Apa data sudah benar?","data di form ini akan di proses.");	
    },
    printDetail: function(dataPrinted){
        var noorder = [];
        for (var i in dataPrinted.objList) noorder[noorder.length] = "'"+i+"'";
        var data = this.dbLib.getDataProvider("select a.no_order, a.kode_produk,b.nama as nmbrg, a.bonus,a.jumlah,a.harga,a.diskon,(a.harga * (100 - a.diskon)/100) as hargadisc,(a.jumlah*(a.harga * (100 - a.diskon)/100)) as tot "+
					"from portal_order_d a inner join portal_produk b on a.kode_produk=b.kode_produk and a.kode_lokasi = b.kode_lokasi "+
					"where a.no_order in ("+noorder+")  and a.kode_lokasi = '"+this.app._lokasi+"'  order by a.no_order",true);			  
	    var dataOrder,line,htmlHeader = "",no_order = "",htmlAll = "",total = 0;
        for (var i in data.rs.rows){
	       line = data.rs.rows[i];	
	       if (no_order != line.no_order){
	           if (no_order != ""){
	               html+="<tr align='right' bgcolor='#EEEEEE'><td class='isi_laporan' colspan='6'>Total Harga</td>"+
    			 	   "<td class='isi_laporan'>"+floatToNilai(total)+"</td></tr>";
    	           html += "</table>";
    	           htmlAll += "<table border='1' cellspacing='0' cellpadding='0' class='kotak'>"+
    						"<tr><td>"+htmlHeader+"</td></tr>"+
    						"<tr><td>"+html+"</td></tr></table></br></br>";        
				  htmlHeader = "";
                  html = "";  
               }
	           no_order = line.no_order;
    	       dataOrder = dataPrinted.get(line.no_order);
        	   htmlHeader += "<table border='0' cellspacing='0' cellpadding='0'>";
        				htmlHeader += "<tr>";
        				htmlHeader += "<td height='20' class='isi_laporan' valign='top'>No. Pemesanan</td>";
        				htmlHeader += "<td height='20' class='isi_laporan' valign='top'>:</td>";
        				htmlHeader += "<td height='20' class='isi_laporan' valign='top'>"+line.no_order+"</td>";
        				htmlHeader += "</tr>";
        				htmlHeader += "<tr>";
        				htmlHeader += "<td height='20' class='isi_laporan' valign='top'>Tanggal</td>";
        				htmlHeader += "<td height='20' class='isi_laporan' valign='top'>:</td>";
        				htmlHeader += "<td height='20' class='isi_laporan' valign='top'>"+dataOrder.tgl+"</td>";
        				htmlHeader += "</tr>";
        				htmlHeader += "<tr>";
        				htmlHeader += "<td height='20' class='isi_laporan' valign='top'>Cabang</td>";
        				htmlHeader += "<td height='20' class='isi_laporan' valign='top'>:</td>";
        				htmlHeader += "<td height='20' class='isi_laporan' valign='top'>"+dataOrder.cabang+"</td>";
        				htmlHeader += "</tr>";
        				htmlHeader += "<tr>";
        				htmlHeader += "<td height='20' class='isi_laporan' valign='top'>Kota</td>";
        				htmlHeader += "<td height='20' class='isi_laporan' valign='top'>:</td>";
        				htmlHeader += "<td height='20' class='isi_laporan' valign='top'>"+dataOrder.kota+"</td>";
        				htmlHeader += "</tr>";
        				htmlHeader += "<tr>";
        				htmlHeader += "<td height='20' class='isi_laporan' valign='top'>Customer</td>";
        				htmlHeader += "<td height='20' class='isi_laporan' valign='top'>:</td>";
        				htmlHeader += "<td height='20' class='isi_laporan' valign='top'>"+dataOrder.nama+"</td>";
        				htmlHeader += "</tr>";
        				htmlHeader += "<tr>";
        				htmlHeader += "<td height='20' class='isi_laporan' valign='top'>Sales</td>";
        				htmlHeader += "<td height='20' class='isi_laporan' valign='top'>:</td>";
        				htmlHeader += "<td height='20' class='isi_laporan' valign='top'>"+dataOrder.namasls+"</td>";
        				htmlHeader += "</tr>";
        				htmlHeader += "<tr>";
        				htmlHeader += "<td height='20' class='isi_laporan' valign='top'>Keterangan</td>";
        				htmlHeader += "<td height='20' class='isi_laporan' valign='top'>:</td>";
        				htmlHeader += "<td height='20' class='isi_laporan' valign='top'>"+dataOrder.keterangan+"</td>";
        				htmlHeader += "</tr>";
        				htmlHeader += "</table>";
 				var html = "<table border='1' cellspacing='0' cellpadding='0' class='kotak'>"+
    					"<tr bgcolor='#cccccc'>"+
    					"<td class='header_laporan' align='center' width=25>No</td>";    	   
				for (var i in this.sg1mp2.title)
                    html += "<td class='header_laporan' align='center' width="+this.sg1mp2.columns.get(i).width+">"+this.sg1mp2.title[i]+"</td>";
                html += "</tr>"; 
                total = 0;
            }    	              
   	        html += "<tr><td height='20' class='isi_laporan' valign='top'>"+(i+1)+".</td>";
   	        html += "<td height='20' class='isi_laporan' valign='top' >"+line.kode_produk+"</td>";	    		
   	        html += "<td height='20' class='isi_laporan' valign='top' >"+line.nmbrg+"</td>";	    		
 			html += "<td height='20' class='isi_laporan' align='right' valign='top' >"+line.bonus+"</td>";            
 			html += "<td height='20' class='isi_laporan' align='right' valign='top' >"+line.jumlah+"</td>";            
 			html += "<td height='20' class='isi_laporan' align='right' valign='top' >"+floatToNilai(parseFloat(line.harga))+"</td>";            
 			html += "<td height='20' class='isi_laporan' align='right' valign='top' >"+floatToNilai(parseFloat(line.diskon))+"</td>";            
 			html += "<td height='20' class='isi_laporan' align='right' valign='top' >"+floatToNilai(parseFloat(line.hargadisc))+"</td>";            
 			html += "<td height='20' class='isi_laporan' align='right' valign='top' >"+floatToNilai(parseFloat(line.tot))+"</td>";            
 			html += "</tr>";
 			total += parseFloat(line.tot); 			
           }               	   
           html+="<tr align='right' bgcolor='#EEEEEE'><td class='isi_laporan' colspan='6'>Total Harga</td>"+
    			 	   "<td class='isi_laporan'>"+floatToNilai(total)+"</td></tr>";
           html += "</table>";
           htmlAll += "<table border='1' cellspacing='0' cellpadding='0' class='kotak'>"+
					"<tr><td>"+htmlHeader+"</td></tr>"+
					"<tr><td>"+html+"</td></tr></table></br></br>";
	        this.sg1mp2.clear();
	        //this.sg1mp2.setColTitle(["No Order","Kode Barang","Nama Barang","Bonus","Jumlah","Harga","Diskon","Harga Disc","Sub Total"]);   
			this.sg1mp2.setColTitle(["No Order","Kode Barang","Nama Barang","Harga","Diskon","Harga Disc","Jumlah","Bonus","Sub Total"]);   
			this.sg1mp2.showLoading();
			this.sg1mp2.setData(data);										
			this.sg1mp2.setColWidth([8,7,6,5,4,3,2,1,0],[100,100,100,100,100,100,250,100,100]);
			this.sg1mp2.columns.get(3).setColumnFormat(cfNilai);
			this.sg1mp2.columns.get(4).setColumnFormat(cfNilai);
			this.sg1mp2.columns.get(5).setColumnFormat(cfNilai);
			this.sg1mp2.columns.get(6).setColumnFormat(cfNilai);
			this.sg1mp2.columns.get(7).setColumnFormat(cfNilai);
			this.sg1mp2.columns.get(8).setColumnFormat(cfNilai);
			this.sgn2.setTotalPage(1);
			this.sgn2.rearrange();
            this.sg1mp2.print("",htmlAll); 	                    
         return htmlAll;
    },
    doBeforePrintSg2: function(sender){
	   try{
	       if (this.htmlPrinted){
	           var htmlAll = this.htmlPrinted;
           }else{
        	   var line = this.sg1mp.rows.get(this.sg1mp.row).data;
        	   var htmlHeader = "<table border='0' cellspacing='0' cellpadding='0'>";
        				htmlHeader += "<tr>";
        				htmlHeader += "<td height='20' class='isi_laporan' valign='top'>No. Pemesanan</td>";
        				htmlHeader += "<td height='20' class='isi_laporan' valign='top'>:</td>";
        				htmlHeader += "<td height='20' class='isi_laporan' valign='top'>"+this.sg1mp.cells(1,this.sg1mp.row)+"</td>";
        				htmlHeader += "</tr>";
        				htmlHeader += "<tr>";
        				htmlHeader += "<td height='20' class='isi_laporan' valign='top'>Tanggal</td>";
        				htmlHeader += "<td height='20' class='isi_laporan' valign='top'>:</td>";
        				htmlHeader += "<td height='20' class='isi_laporan' valign='top'>"+this.sg1mp.cells(2,this.sg1mp.row)+"</td>";
        				htmlHeader += "</tr>";
        				htmlHeader += "<tr>";
        				htmlHeader += "<td height='20' class='isi_laporan' valign='top'>Cabang</td>";
        				htmlHeader += "<td height='20' class='isi_laporan' valign='top'>:</td>";
        				htmlHeader += "<td height='20' class='isi_laporan' valign='top'>"+line.cabang+"</td>";
        				htmlHeader += "</tr>";
        				htmlHeader += "<tr>";
        				htmlHeader += "<td height='20' class='isi_laporan' valign='top'>Kota</td>";
        				htmlHeader += "<td height='20' class='isi_laporan' valign='top'>:</td>";
        				htmlHeader += "<td height='20' class='isi_laporan' valign='top'>"+line.kota+"</td>";
        				htmlHeader += "</tr>";
        				htmlHeader += "<tr>";
        				htmlHeader += "<td height='20' class='isi_laporan' valign='top'>Customer</td>";
        				htmlHeader += "<td height='20' class='isi_laporan' valign='top'>:</td>";
        				htmlHeader += "<td height='20' class='isi_laporan' valign='top'>"+line.nama+"</td>";
        				htmlHeader += "</tr>";
        				htmlHeader += "<tr>";
        				htmlHeader += "<td height='20' class='isi_laporan' valign='top'>Sales</td>";
        				htmlHeader += "<td height='20' class='isi_laporan' valign='top'>:</td>";
        				htmlHeader += "<td height='20' class='isi_laporan' valign='top'>"+line.namasls+"</td>";
        				htmlHeader += "</tr>";
        				htmlHeader += "<tr>";
        				htmlHeader += "<td height='20' class='isi_laporan' valign='top'>Keterangan</td>";
        				htmlHeader += "<td height='20' class='isi_laporan' valign='top'>:</td>";
        				htmlHeader += "<td height='20' class='isi_laporan' valign='top'>"+line.keterangan+"</td>";
        				htmlHeader += "</tr>";
        				htmlHeader += "</table>";
        	   var html = "<table border='1' cellspacing='0' cellpadding='0' class='kotak'>"+
        					"<tr bgcolor='#cccccc'>"+
        					"<td class='header_laporan' align='center' width=25>No</td>";
        	   for (var i in this.sg1mp2.title)
                    html += "<td class='header_laporan' align='center' width="+this.sg1mp2.columns.get(i).width+">"+this.sg1mp2.title[i]+"</td>";
               html += "</tr>";     
               var total = 0;
        	   for (var i=0;i < this.sg1mp2.getRowCount();i++){
        	        html += "<tr><td height='20' class='isi_laporan' valign='top'>"+(i+1)+".</td>";
        			for (var c in this.sg1mp2.columns.objList){
                        if (this.sg1mp2.columns.get(c).columnFormat == cfNilai)
                            html += "<td height='20' class='isi_laporan' align='right' valign='top' >"+this.sg1mp2.cells(c,i)+"</td>";
                        else html += "<td height='20' class='isi_laporan' valign='top' >"+this.sg1mp2.cells(c,i)+"</td>";	
        			}
        			html += "</tr>";
        			total += nilaiToFloat(this.sg1mp2.cells(7,i));
               }
               html+="<tr align='right' bgcolor='#EEEEEE'><td class='isi_laporan' colspan='6'>Total Harga</td>"+
        				"<td class='isi_laporan'>"+floatToNilai(total)+"</td></tr>";
        	   html += "</table>";
        	   var htmlAll = "<table border='1' cellspacing='0' cellpadding='0' class='kotak'>"+
        						"<tr><td>"+htmlHeader+"</td></tr>"+
        						"<tr><td>"+html+"</td></tr></table></br></br>";
			}
            this.sgn2.outerHtml = htmlAll;
        }catch(e){
            alert(e);
        }
    }
	
});
