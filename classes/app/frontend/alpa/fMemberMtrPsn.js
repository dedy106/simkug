//***********************************************************************************************
//*	Copyright (c) 2009 SAI
//*	 All rights reserved. This program and the accompanying materials
//*	 are made available under the terms of the Common Public License v1.0
//*	 which accompanies this distribution, and is available at
//*	Contributors 
//* 			SAI, PT											
//***********************************************************************************************
window.app_frontend_alpa_fMemberMtrPsn = function(owner,options){
	try{
		if (owner)
		{
			window.app_frontend_alpa_fMemberMtrPsn.prototype.parent.constructor.call(this, owner,options);			
			this.className = "app_frontend_alpa_fMemberMtrPsn";											
			this.initComponent();		
			this.setCaption("Monitoring Pemesanan");
		}
	}catch(e){
		alert("[app_frontend_alpa_fMemberMtrPsn]::contruct:"+e,"");
	}
};
window.app_frontend_alpa_fMemberMtrPsn.extend(window.portalui_roundPanel);
window.app_frontend_alpa_fMemberMtrPsn.implement({
	initComponent: function(){		
		try{
			uses("util_standar;portalui_button;portalui_saiGrid;portalui_sgNavigator;portalui_toolbar;portalui_radioButton");
			this.standarLib = new util_standar();
			this.dbLib = new util_dbUtility();
			this.dbLib.addListener(this);
			this.getClientCanvas().style.top = 5;
			this.toolbar = new portalui_toolbar(this,{bound:[this.width - 100,2,80,25],buttonClick:[this,"doToolBarClick"]});
			this.toolbar.addButton("bFilter","Filter","icon/dynpro/filter2.png","Filter");
			this.toolbar.makeRound(5);			
			this.p1mp = new portalui_panel(this,{bound:[10,35,this.width - 25,200],border:3,caption:"Daftar Order"});
			this.sg1mp = new portalui_saiGrid(this.p1mp,{bound:[1,20,this.p1mp.width - 4,155],colCount:8,colTitle:["Status","No. Order","Tanggal","Keterangan","Kode Cust","Nama Customer","Alamat","Kota"],
                colWidth:[[7,6,5,4,3,2,1,0],[100,200,200,110,300,100,100,80]],dblClick:[this,"sg1onDblClick"], readOnly:true});
			this.sgn = new portalui_sgNavigator(this.p1mp,{bound:[1,this.p1mp.height - 25,this.p1mp.width - 2,25],buttonStyle:3, pager:[this,"doPager"], grid:this.sg1mp});
            this.p1mp2 = new portalui_panel(this,{bound:[10,240,this.width - 25,180],border:3,caption:"Detail Order"});
			this.sg1mp2 = new portalui_saiGrid(this.p1mp2,{bound:[1,20,this.p1mp.width - 4,128],colCount:6,readOnly:true,colTitle:["Kode Barang","Nama Barang","Harga","Diskon","Harga Disc","Jumlah","Bonus","Sub Total"],
                colWidth:[[5,4,3,2,1,0],[100,100,100,100,180,100]],colFormat:[[2,3,4,5],[cfNilai,cfNilai,cfNilai,cfNilai]]});
			this.sgn2 = new portalui_sgNavigator(this.p1mp2,{bound:[1,this.p1mp2.height - 25,this.p1mp2.width - 2,25],buttonStyle:3, pager:[this,"doPager"],beforePrint:[this,"doBeforePrintSg2"], grid:this.sg1mp2});
            this.totalmp2 = new portalui_saiLabelEdit(this.sgn2,{bound:[this.p1mp2.width-252,2,250,20],tipeText:ttNilai, alignment:alRight,caption:"Total",readOnly:true});
			var field = (this.app.statuslog == "sales" ? "a.sales":"a.kode_cust");
			this.pager = 50;
			this.rowCount = this.dbLib.getRowCount("select count(*) as tot from portal_order_m a "+
    				"   left outer join portal_cust b on b.kode_cust = a.kode_cust and b.kode_lokasi  = a.kode_lokasi "+
    				"   left outer join portal_sales  c on c.kode_sales = a.sales and c.kode_lokasi = a.kode_lokasi "+
    				"where "+field+"='"+this.app.userlog+"' and  a.kode_lokasi = '"+this.app._lokasi+"' ", this.pager);
            this.sgn.setTotalPage(this.rowCount);            			
            this.sgn.rearrange();
            
            this.pFilter = new portalui_roundPanel(this,{bound:[this.width - 420,30,400,150],caption:"Filter",visible:false,background:"image/themes/dynpro/roundpanelBgCenter.png",icon:"image/themes/dynpro/iconpanel.png",color:"#edf5f8",titleBg:"#95cae8"});          
            this.lTgl = new portalui_label(this.pFilter,{bound:[10,10,100,18],caption:"Tanggal",underline:true});
            this.dp1 = new portalui_datePicker(this.pFilter,{bound:[110,10,100,18]});
            this.lTgl = new portalui_label(this.pFilter,{bound:[220,10,30,18],caption:"s/d"});
            this.dp2 = new portalui_datePicker(this.pFilter,{bound:[250,10,100,18]});
            this.cbCust = new portalui_saiCBBL(this.pFilter,{bound:[10,33,180,20],caption:"Customer",btnClick:[this,"FindBtnClick"],text:(this.app.statuslog == "sales" ? "":this.app.userlog),btnVisible:(this.app.statuslog == "sales" ? true:false)});     
            this.lTgl = new portalui_label(this.pFilter,{bound:[10,79,100,18],caption:"Status Proses",underline:true});
            this.cbProc1 = new portalui_radioButton(this.pFilter,{bound:[110,79,80,20],caption:"Sudah"});    
            this.cbProc2 = new portalui_radioButton(this.pFilter,{bound:[200,79,80,20],caption:"Belum"});    
            this.cbProc3 = new portalui_radioButton(this.pFilter,{bound:[300,79,80,20],caption:"Semua Status",selected:true});    
            this.bApply = new portalui_button(this.pFilter,{bound:[10,120,80,20],caption:"Apply",click:[this,"doClick"]});
            this.pFilter.rearrangeChild(10,23);
            this.pFilter.setTabChildIndex();
			this.sql = "select a.no_order,date_format(a.tanggal,'%d-%m-%Y') as tgl,a.keterangan,case when a.status = '0' then '-' else 'Proses' end as status, c.kode_sales, c.nama as namasls, b.kode_cust, b.nama, b.alamat, ifnull(d.nama,'-') as kota, ifnull(e.nama,'-') as cabang  "+
    				"from portal_order_m a "+
    				"   left outer join portal_cust b on b.kode_cust = a.kode_cust and b.kode_lokasi  = a.kode_lokasi "+
    				"   left outer join portal_sales  c on c.kode_sales = a.sales and c.kode_lokasi = a.kode_lokasi "+
    				"   left outer join portal_kota d on d.kode_kota = b.kota "+
    				"   left outer join portal_cabang e on e.kode_cab = d.kode_cab  "+
    				"where "+field+"='"+this.app.userlog+"' and  a.kode_lokasi = '"+this.app._lokasi+"' order by a.no_order desc ";			
			this.doPager(this.sgn,1);
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
    doPager: function(sender,page){
	       this.activePage = page;
	       this.dbLib.getDataProviderPageA(this.sql,page, this.pager);   			 
    },	    
	doSizeChange: function(width, height){				
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
                                this.gridDataTmp.set(line.no_order,line);
                                this.sg1mp.appendData([line.status, line.no_order, line.tgl, line.keterangan, line.kode_cust, line.nama, line.alamat, line.kota]);
                                this.sg1mp.rows.get(i).setData(line);
                            }					
        					this.sg1mp.hideLoading();
        				}
        			}	
     			}
     			if (methodName == "execArraySQL"){        	   
     			    if (result.toLowerCase().search("error") != -1)
     			        systemAPI.alert(result);
                    else this.doPager(this.sgn,this.activePage);
     			}
    	   }
	   }catch(e){
	       alert(e + result);
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
                        "   and a.kode_cust like '"+this.cbCust.getText()+"%' and a.sales like '"+this.app.userlog+"' and a.status like '"+status+"%' ", this.pager);
                this.sgn.setTotalPage(this.rowCount);            			
                this.sgn.rearrange();
                
                this.sql = "select a.no_order,date_format(a.tanggal,'%d-%m-%Y') as tgl,a.keterangan,case when a.status = '0' then '-' else 'Proses' end as status, c.kode_sales, c.nama as namasls, b.kode_cust, b.nama, b.alamat, ifnull(d.nama,'-') as kota, ifnull(e.nama,'-') as cabang  "+
        				"from portal_order_m a "+
        				"   left outer join portal_cust b on b.kode_cust = a.kode_cust and b.kode_lokasi  = a.kode_lokasi "+
        				"   left outer join portal_sales  c on c.kode_sales = a.sales and c.kode_lokasi = a.kode_lokasi "+
        				"   left outer join portal_kota d on d.kode_kota = b.kota  "+
    				    "   left outer join portal_cabang e on e.kode_cab = d.kode_cab "+
        				"where a.kode_lokasi = '"+this.app._lokasi+"' and a.tanggal between '"+this.dp1.getDateString()+"' and '"+this.dp2.getDateString()+"' "+
                        "   and a.kode_cust like '"+this.cbCust.getText()+"%' and a.sales like '"+this.app.userlog+"' and a.status like '"+status+"%' order by a.no_order desc ";			
    	       this.doPager(this.sgn,1);		        
    	       this.pFilter.hide();
            }
       }catch(e){
            systemAPI.alert(this+"$doClick()",e);
       }
	},
	FindBtnClick: function(sender){
        if (sender == this.cbCust)
            this.standarLib.showListData(this.getForm(), "Data Customer",sender,undefined,
										  "select kode_cust,nama from portal_cust where kode_lokasi ='"+this.app._lokasi+"' ",
										  "select count(*) from portal_cust where kode_lokasi ='"+this.app._lokasi+"' ",
										  ["kode_cust","nama"],"and",["Kode Customer","Nama"]);
    },	
	sg1onDblClick:function(sender, col, row){
		try{
			var data = this.dbLib.getDataProvider("select a.kode_produk,b.nama as nmbrg,a.harga,a.diskon, (a.harga * (100 - a.diskon)/100) as hargadisc,a.jumlah,a.bonus,(a.jumlah*(a.harga * (100 - a.diskon) / 100)) as tot "+
					"from portal_order_d a inner join portal_produk b on a.kode_produk=b.kode_produk and a.kode_lokasi = b.kode_lokasi "+
					"where a.no_order='"+this.sg1mp.getCell(1,row)+"'  and a.kode_lokasi = '"+this.app._lokasi+"'  ",true);			
			if (typeof(data) != "string")
			{
				if (data.rs.rows[0] != undefined)
				{
					this.sg1mp2.clear();
					this.sg1mp2.showLoading();
					this.sg1mp2.setData(data);										
					this.sg1mp2.setColWidth([7,6,5,4,3,2,1,0],[100,100,100,100,100,100,180,100]);
					this.sg1mp2.columns.get(2).setColumnFormat(cfNilai);
					this.sg1mp2.columns.get(3).setColumnFormat(cfNilai);
					this.sg1mp2.columns.get(4).setColumnFormat(cfNilai);
					this.sg1mp2.columns.get(5).setColumnFormat(cfNilai);
					this.sg1mp2.columns.get(6).setColumnFormat(cfNilai);
					this.sg1mp2.columns.get(7).setColumnFormat(cfNilai);
				}
			}
			this.sgn2.setTotalPage(1);
			this.sgn2.rearrange();
			var tot=0;
			for (var k=0; k < this.sg1mp2.rows.getLength(); k++)
				tot+=nilaiToFloat(this.sg1mp2.getCell(7,k));			
			this.totalmp2.setText(floatToNilai(tot));
		}catch(e){
			alert(e);
		}
	},
	doBeforePrintSg2: function(sender){
	   try{
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
            this.sgn2.outerHtml = htmlAll;
        }catch(e){
            alert(e);
        }
    }
});
