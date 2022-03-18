window.app_saku3_transaksi_ginas_barang_fClosingBrg = function(owner)
{
	if (owner)
	{
		window.app_saku3_transaksi_ginas_barang_fClosingBrg.prototype.parent.constructor.call(this,owner);
		this.className  = "app_saku3_transaksi_ginas_barang_fClosingBrg";
		this.itemsValue = new portalui_arrayList();
		this.maximize();	
		this.app._mainForm.childFormConfig(this, "mainButtonClick","Form Closing Tahunan Barang", 0);	
		
		uses("portalui_uploader;saiCBBL;saiEdit;datePicker;saiGrid;sgNavigator;pageControl;checkBox");
		this.e_periode = new portalui_saiLabelEdit(this,{bound:[20,10,200,20],caption:"Periode",readOnly:true,tag:2});
		this.l_tgl = new portalui_label(this,{bound:[20,11,100,18],caption:"Tanggal", underline:true});
		this.dp_d1 = new portalui_datePicker(this,{bound:[120,11,98,18],selectDate:[this,"doSelectDate"]});
		this.pc2 = new pageControl(this,{bound:[10,10,1000,400], childPage:["Data Item Barang"]});				
		
		this.e_nb = new portalui_saiLabelEdit(this.pc2.childPage[0],{bound:[20,12,200,20],caption:"No Bukti",maxLength:30,readOnly:true});
		this.i_gen = new portalui_imageButton(this.pc2.childPage[0],{bound:[225,12,20,20],hint:"Generate",image:"icon/"+system.getThemes()+"/tabCont2.png",click:[this,"doClick"]});
		this.e_ket = new portalui_saiLabelEdit(this.pc2.childPage[0],{bound:[20,14,450,20],caption:"Keterangan", maxLength:150});				
		this.bTampil = new portalui_button(this.pc2.childPage[0],{bound:[650,14,80,18],caption:"Load Data",click:[this,"doLoadData"]});		
		this.e_total = new saiLabelEdit(this.pc2.childPage[0],{bound:[760,14,200,20],caption:"Total Persediaan", tag:1, readOnly:true, tipeText:ttNilai, text:"0"});		
				
		this.pc1 = new pageControl(this.pc2.childPage[0],{bound:[5,12,990,320], childPage:["Detail Barang"]});				
		this.sg = new saiGrid(this.pc1.childPage[0],{bound:[1,5,this.pc1.width-5,this.pc1.height-35],colCount:8,tag:0,		            
					colTitle:["Kode Barang","Nama","Pabrik","Kode PP","Satuan","Jumlah","Harga Avg","Total"],					
					colWidth:[[7,6,5,4,3,2,1,0],[80,80,80,60,100,260,170,100]],					
					readOnly:true,colFormat:[[5,6,7],[cfNilai,cfNilai,cfNilai]],autoAppend:false,defaultRow:1});		
		this.sgn = new portalui_sgNavigator(this.pc1.childPage[0],{bound:[1,this.pc1.height-25,this.pc1.width-1,25],buttonStyle:3,grid:this.sg,pager:[this,"doPager"]});		
				 
		this.rearrangeChild(10, 22);
		this.pc2.childPage[0].rearrangeChild(10, 23);	
		
		setTipeButton(tbAllFalse);			
		this.setTabChildIndex();
		
		uses("server_report_report;portalui_reportViewer");
		this.viewer = new portalui_reportViewer(this, {bound:[0,0,this.getWidth(), this.getHeight()],visible:false});
		this.viewer.hide();
		this.app._mainForm.initReport(this, this.viewer,"doSelectedPage","doCloseReportClick", "doRowPerPageChange", "doPdfClick","doXlsClick",true);
		this.report = new server_report_report();
		this.report.addListener(this);
		
		try{			
			this.dbLib = new util_dbLib();
			this.dbLib.addListener(this);
			uses("util_standar");
			this.standarLib = new util_standar();			
			this.doSelectDate(this.dp_d1,this.dp_d1.year,this.dp_d1.month,this.dp_d1.day);									
			
		}catch(e){
			systemAPI.alert(e);
		}
	}
};
window.app_saku3_transaksi_ginas_barang_fClosingBrg.extend(window.portalui_childForm);
window.app_saku3_transaksi_ginas_barang_fClosingBrg.implement({
	mainButtonClick: function(sender){
		if (sender == this.app._mainForm.bClear)
			system.confirm(this, "clear", "screen akan dibersihkan?","form inputan ini akan dibersihkan");	
		if (sender == this.app._mainForm.bSimpan)
			system.confirm(this, "simpan", "Apa data sudah benar?","data diform ini apa sudah benar.");	
		if (sender == this.app._mainForm.bEdit)
			system.confirm(this, "ubah", "Apa perubahan data sudah benar?","perubahan data diform ini akan disimpan.");	
		if (sender == this.app._mainForm.bHapus)
			system.confirm(this, "hapus", "Yakin data akan dihapus?","data yang sudah disimpan tidak bisa di<i>retrieve</i> lagi.");	
	},
	simpan: function(){			
		try{																	
			if (this.standarLib.checkEmptyByTag(this, [0,1,2])){
				try{																								
					uses("server_util_arrayList");
					var sql = new server_util_arrayList();	

					sql.add("insert into trans_m (no_bukti,kode_lokasi,tgl_input,nik_user,periode,modul,form,posted,prog_seb,progress,kode_pp,tanggal,no_dokumen,keterangan,kode_curr,kurs,nilai1,nilai2,nilai3,nik1,nik2,nik3,no_ref1,no_ref2,no_ref3,param1,param2,param3) values "+
							"('"+this.e_nb.getText()+"','"+this.app._lokasi+"',getdate(),'"+this.app._userLog+"','"+this.e_periode.getText()+"','IV','CLOSE','X','0','0','"+this.app._kodePP+"','"+this.dp_d1.getDateString()+"','-','"+this.e_ket.getText()+"','IDR',1,0,0,0,'-','-','-','-','-','-','-','-','"+this.tahunNext+"')");

					sql.add("delete from brg_sawal where periode = '"+this.tahunNext+"01' and kode_lokasi='"+this.app._lokasi+"'");																														
					for (var i=0;i<this.dataJU.rs.rows.length;i++){
						var line = this.dataJU.rs.rows[i];	
						if(parseFloat(line.hpp) != 0) {											
							sql.add("insert into brg_sawal(kode_barang,kode_lokasi,kode_gudang,jumlah,harga,periode) values "+
									"('"+line.kode_barang+"','"+this.app._lokasi+"','"+line.kode_gudang+"',"+parseFloat(line.jumlah)+","+parseFloat(line.h_avg)+",'"+this.tahunNext+"01')");
						}
					}

					this.dbLib.execArraySQL(sql);					
				}
				catch(e){
					system.alert(this, e,"");
				}
			}
		}catch(e){
			systemAPI.alert(e);
		}
	},
	doModalResult: function(event, modalResult){
		if (modalResult != mrOk) return false;
		switch (event){
			case "clear" :
				if (modalResult == mrOk) {
					this.standarLib.clearByTag(this, new Array("0"),this.e_nb);		
					this.sg.clear(1);										
				}
				break;
			case "simpan" :				
				this.preView = "1";								
				if (this.standarLib.doCekPeriode(this.dbLib,"IV",this.app._lokasi,this.app._userStatus,this.e_periode.getText()) == "0") {
					system.alert(this,"Periode transaksi modul tidak valid (IV - LOCKED).","Hubungi Administrator Sistem.");
					return false;
				}
				else this.simpan();
				break;
			case "simpancek" : this.simpan();			
				break;											
		}
	},
	doClick:function(sender){
		if (this.e_periode.getText()!= "") {
			if (this.stsSimpan == 0) {
				this.sg.clear(1);				
				this.e_total.setText("0");
				this.bTampil.setVisible(true);
			}
			this.stsSimpan = 1;
			this.e_nb.setText(this.standarLib.noBuktiOtomatis(this.dbLib,"trans_m","no_bukti",this.app._lokasi+"-CLB"+this.e_periode.getText().substr(2,4)+".","0000"));			
			this.e_ket.setFocus();
			setTipeButton(tbSimpan);			
		}
	},	
	doSelectDate: function(sender, y,m,d){
		try {
			if (m < 10) m = "0" + m;			
			if (parseFloat(this.app._periode.substr(4,2)) <= 12) this.e_periode.setText(y+""+m);
			else {
				if (m == "12") this.e_periode.setText(this.app._periode);
				else this.e_periode.setText(y+""+m);
			}
			this.tahunNext = (parseInt(this.e_periode.getText().substr(0,4)) + 1).toString();	
			this.doClick();		
		}catch(e) {alert(e);}
	},					
	doLoadData:function(sender){		
		this.nik_user=this.app._userLog;								
		var sql = "call sp_brg_hpp ('"+this.e_periode.getText()+"','"+this.app._lokasi+"','"+this.nik_user+"')";
		this.dbLib.execQuerySync(sql);						
		var sql = "call sp_brg_stok_hpp ('"+this.e_periode.getText()+"','"+this.app._lokasi+"','"+this.nik_user+"')";
		this.dbLib.execQuerySync(sql);						

		var strSQL =  "select a.kode_barang,a.nama,a.pabrik,a.kode_gudang,a.kode_pp,a.sat_kecil,isnull(d.sakhir,0) as jumlah, "+
					  "isnull(round(e.h_avg,2),0) as h_avg,round((isnull(d.sakhir,0)) * isnull(e.h_avg,0),0) as hpp "+
					  "from (select a.kode_barang,a.sat_kecil,a.pabrik,a.nama,b.kode_gudang,b.kode_pp,a.kode_lokasi,a.kode_klp "+
      				 		 "from brg_barang a cross join brg_gudang b "+
	 				 		 "where a.kode_lokasi='"+this.app._lokasi+"' and b.kode_lokasi='"+this.app._lokasi+"' "+
					  ") a "+
					  "left join (select kode_barang,kode_gudang,kode_lokasi,sum(stok) as sakhir "+
					             "from brg_stok where kode_lokasi='"+this.app._lokasi+"' and nik_user ='"+this.nik_user+"' "+
							     "group by kode_lokasi,kode_barang,kode_gudang "+
							     ") d on a.kode_barang=d.kode_barang and a.kode_lokasi=d.kode_lokasi and a.kode_gudang=d.kode_gudang "+
					 
					  "left join brg_hpp e on a.kode_barang=e.kode_barang and a.kode_lokasi=e.kode_lokasi and e.nik_user ='"+this.nik_user+"' ";
													
		var data = this.dbLib.getDataProvider(strSQL,true);
		if (typeof data == "object" && data.rs.rows[0] != undefined){
			this.dataJU = data;
			this.sgn.setTotalPage(Math.ceil(data.rs.rows.length/this.app._pageRow));
			this.sgn.rearrange();
			this.doTampilData(1);
		} else this.sg.clear(1);			
		
		var tot=0;
		for (var i=0;i<this.dataJU.rs.rows.length;i++){
			line = this.dataJU.rs.rows[i];												
			tot = tot + parseFloat(line.hpp);
		}
		this.e_total.setText(floatToNilai(tot));
	},
	doTampilData: function(page) {
		this.sg.clear();
		var line;
		this.page = page;
		var start = (page - 1) * this.app._pageRow;
		var finish = (start + this.app._pageRow > this.dataJU.rs.rows.length? this.dataJU.rs.rows.length:start+this.app._pageRow);
		for (var i=start;i<finish;i++){
			line = this.dataJU.rs.rows[i];															
			this.sg.appendData([line.kode_barang,line.nama,line.pabrik,line.kode_pp,line.sat_kecil,floatToNilai(line.jumlah),floatToNilai(line.h_avg),floatToNilai(line.hpp)]); 
		}
		this.sg.setNoUrut(start);
	},
	doPager: function(sender, page) {
		this.doTampilData(page);
	},
	doRequestReady: function(sender, methodName, result){
		if (sender == this.dbLib){
			try{   
				switch(methodName){
	    			case "execArraySQL" :	    				
						if (result.toLowerCase().search("error") == -1){
							if (this.preView == "1") {								
								//this.nama_report="server_report_saku2_gl_rptBuktiJurnal";
								//this.filter2 = " where a.kode_lokasi='"+this.app._lokasi+"' and a.no_jual='"+this.e_nb.getText()+"' ";
								this.filter = this.filter2;
								this.viewer.prepare();
								this.viewer.setVisible(true);
								this.app._mainForm.pButton.setVisible(false);
								this.app._mainForm.reportNavigator.setVisible(true);
								this.viewer.setTotalPage(this.report.getTotalPage(this.nama_report,this.filter,1,this.filter2));
								this.app._mainForm.reportNavigator.setTotalPage(this.viewer.getTotalPage());
								this.app._mainForm.reportNavigator.rearrange();
								this.showFilter = undefined;
								this.viewer.useIframe(this.report.previewWithHeader(this.nama_report,this.filter, 1,  1, this.showFilter, this.app._namalokasi,this.filter2));
								this.page = 1;
								this.allBtn = false;
								this.pc2.hide();
							} 
							else {
								system.info(this,"Transaksi telah sukses tereksekusi (No Bukti : "+ this.e_nb.getText()+")","");							
								this.clearLayar();
							} 
						}else system.info(this,result,"");
	    			break;					
	    		}    		
			}
			catch(e){
				systemAPI.alert("step : "+step+"; error = "+e);
			}
	    }
	},
	doCloseReportClick: function(sender){
		switch(sender.getName()){
			case "PreviewBtn" :        
				window.open(this.report.previewWithHeader(this.nama_report,this.filter,1,1, this.showFilter,this.app._namalokasi,this.filter2));
			break;
			case "PrintBtn" :
				this.viewer.useIframe(this.report.previewWithHeader(this.nama_report,this.filter,1,1, this.showFilter,this.app._namalokasi,this.filter2));
				try
				{
					window.frames[this.viewer.getFullId() +"_iframe"].focus();
					window.frames[this.viewer.getFullId() +"_iframe"].print();
				}catch(e)
				{alert(e);}
			break;
			default :
				this.pc2.show();   
				this.viewer.setVisible(false);
				this.app._mainForm.pButton.setVisible(true);
				this.app._mainForm.reportNavigator.setVisible(false);  
				this.clearLayar();				
			break;
		}
	},
	clearLayar : function(){
		try {
			this.standarLib.clearByTag(this, new Array("0","1"),this.e_nb);			
			this.pc2.setActivePage(this.pc2.childPage[0]);			
			setTipeButton(tbAllFalse);						
			this.sg.clear(1);
		} catch(e) {
			alert(e);
		}
	}		
});