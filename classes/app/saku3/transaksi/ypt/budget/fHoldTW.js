window.app_saku3_transaksi_ypt_budget_fHoldTW = function(owner)
{
	if (owner)
	{
		window.app_saku3_transaksi_ypt_budget_fHoldTW.prototype.parent.constructor.call(this,owner);
		this.className  = "app_saku3_transaksi_ypt_budget_fHoldTW";
		this.itemsValue = new arrayList();
		this.app._mainForm.childFormConfig(this, "mainButtonClick","Form Hold Bugdet", 0);	
		
		uses("portalui_uploader;saiCBBL;saiEdit;datePicker;saiGrid;sgNavigator;pageControl;util_gridLib");		
		this.e_periode = new portalui_saiLabelEdit(this,{bound:[20,11,202,20],caption:"Periode",tag:2,readOnly:true,visible:false});
		this.l_tgl1 = new portalui_label(this,{bound:[20,11,100,18],caption:"Tanggal", underline:true});
		this.dp_d1 = new portalui_datePicker(this,{bound:[120,11,100,18],selectDate:[this,"doSelectDate"]}); 
		
		this.pc2 = new pageControl(this,{bound:[10,10,1000,430], childPage:["Data Hold"]});				
		this.e_nb = new portalui_saiLabelEdit(this.pc2.childPage[0],{bound:[20,12,202,20],caption:"No Bukti",maxLength:30,readOnly:true});
		this.i_gen = new portalui_imageButton(this.pc2.childPage[0],{bound:[225,12,20,20],hint:"Generate",image:"icon/"+system.getThemes()+"/tabCont2.png",click:[this,"doClick"]});
		this.e_dok = new saiLabelEdit(this.pc2.childPage[0],{bound:[20,16,450,20],caption:"No Dokumen", maxLength:50});		
		this.e_ket = new saiLabelEdit(this.pc2.childPage[0],{bound:[20,13,450,20],caption:"Deskripsi", maxLength:150});				
		this.cb_app = new saiCBBL(this.pc2.childPage[0],{bound:[20,17,220,20],caption:"NIK Approve", multiSelection:false, maxLength:10, tag:2});						
		this.cb_lokasi = new saiCBBL(this.pc2.childPage[0],{bound:[20,13,220,20],caption:"Lok. Budget", multiSelection:false, maxLength:10, tag:2,change:[this,"doChange"]});						
		this.c_jenis = new saiCB(this.pc2.childPage[0],{bound:[20,18,200,20],caption:"Jenis",items:["CAPEX"], readOnly:true,tag:2,change:[this,"doChange"]});				
		this.bHitung = new button(this.pc2.childPage[0],{bound:[250,18,80,18],caption:"Hold Bugdet",click:[this,"doHold"]});					
		this.e_total = new saiLabelEdit(this.pc2.childPage[0],{bound:[790,18,200,20],caption:"Total Hold", tag:1, readOnly:true, tipeText:ttNilai, text:"0"});		

		this.pc1 = new pageControl(this.pc2.childPage[0],{bound:[1,5,995,258], childPage:["Data Hold"]});						
		this.sg = new saiGrid(this.pc1.childPage[0],{bound:[1,5,this.pc1.width-5,this.pc1.height-33],colCount:9,tag:0,
		            colTitle:["Kode MTA","Nama MTA","Kode PP","Nama PP","Kode DRK","Nama DRK","Periode","Saldo","Nilai Hold"],
					colWidth:[[8,7,6,5,4,3,2,1,0],[100,100,80,150,80,150,80,150,80]],					
					readOnly:true,
					colFormat:[[7,8],[cfNilai,cfNilai]], autoPaging:true, rowPerPage:50,					
					autoAppend:true,defaultRow:1});
		this.sgn = new portalui_sgNavigator(this.pc1.childPage[0],{bound:[1,this.pc1.height-25,this.pc1.width-1,25],buttonStyle:2,grid:this.sg,pager:[this,"doPager"]});				
		
			
		this.rearrangeChild(10, 23);
		this.pc2.childPage[0].rearrangeChild(10, 23);	
		
		setTipeButton(tbAllFalse);
		this.maximize();		
		this.setTabChildIndex();
		
		uses("server_report_report;portalui_reportViewer");
		this.viewer = new portalui_reportViewer(this, {bound:[0,0,this.getWidth(), this.getHeight()],visible:false});
		this.viewer.hide();
		this.app._mainForm.initReport(this, this.viewer,"doSelectedPage","doCloseReportClick", "doRowPerPageChange", "doPdfClick","doXlsClick",true);
		this.report = new server_report_report();
		this.report.addListener(this);
		
		
		try {
			this.gridLib = new util_gridLib();
			this.dbLib = new util_dbLib();
			this.dbLib.addListener(this);

			uses("util_standar");
			this.standarLib = new util_standar();
			this.stsSimpan = 1;				
			this.doSelectDate(this.dp_d1,this.dp_d1.year,this.dp_d1.month,this.dp_d1.day);

			var data = this.dbLib.getDataProvider("select a.flag,b.nama from spro a inner join karyawan b on a.flag=b.nik and a.kode_lokasi=b.kode_lokasi where kode_spro='GARAPP' and a.kode_lokasi='"+this.app._lokasi+"'",true);
			if (typeof data == "object" && data.rs.rows[0] != undefined){
				var line = data.rs.rows[0];							
				this.cb_app.setText(line.flag,line.nama);
			} else this.cb_app.setText("","");
			
			this.cb_lokasi.setSQL("select kode_lokasi, nama from lokasi where kode_lokasi<>'00'",["kode_lokasi","nama"],false,["Kode","Nama"],"and","Data Lokasi",true);
			this.cb_app.setSQL("select nik, nama from karyawan where flag_aktif='1' and kode_lokasi='"+this.app._lokasi+"'",["nik","nama"],false,["NIK","Nama"],"and","Data NIK Approval",true);

		}catch(e){
			systemAPI.alert(e);
		}
	}
};
window.app_saku3_transaksi_ypt_budget_fHoldTW.extend(window.childForm);
window.app_saku3_transaksi_ypt_budget_fHoldTW.implement({	
	doHold: function() {
		try {		
			var tahun = this.e_periode.getText().substr(0,4);
			
			var strSQL = "select a.kode_akun,a.kode_pp,a.kode_drk,a.rilis-isnull(b.aktual,0) as hold "+
				",c.nama as nama_akun "+
				",d.nama as nama_pp "+
				",e.nama as nama_drk "+
				"from "+ 
				"( "+
				"select a.kode_akun,a.kode_pp,a.kode_drk, "+
				"sum(case a.dc when 'D' then a.nilai else -a.nilai end) as rilis "+
				"from anggaran_d a "+
				"where a.periode between '"+tahun+"01' and '"+tahun+"12' and a.kode_lokasi='"+this.cb_lokasi.getText()+"' "+
				"group by a.kode_akun,a.kode_pp,a.kode_drk "+
				") a "+
			
				"inner join masakun c on a.kode_akun=c.kode_akun and c.kode_lokasi='"+this.cb_lokasi.getText()+"' "+
				"inner join pp d on a.kode_pp=d.kode_pp and d.kode_lokasi='"+this.cb_lokasi.getText()+"' "+
				"inner join drk e on a.kode_drk=e.kode_drk and e.kode_lokasi='"+this.cb_lokasi.getText()+"' and tahun='"+tahun+"' "+
			
				"left join "+
				"( "+
				"select a.kode_akun,a.kode_pp,a.kode_drk, "+
				"sum(case a.dc when 'D' then a.nilai else -a.nilai end) as aktual "+
				"from angg_r a "+
				"where a.periode1 between '"+tahun+"01' and '"+tahun+"12' and a.kode_lokasi='"+this.cb_lokasi.getText()+"' "+
				"group by a.kode_akun,a.kode_pp,a.kode_drk "+
				") b "+
				"on a.kode_akun=b.kode_akun and a.kode_pp=b.kode_pp and a.kode_drk=b.kode_drk ";

			var data1 = this.dbLib.getDataProvider(strSQL,true);	
			if (typeof data1 == "object" && data1.rs.rows[0] != undefined){				
				this.dataGAR = data1;
				this.sgn.setTotalPage(Math.ceil(data1.rs.rows.length/50));
				this.sgn.rearrange();
				this.doTampilData(1);				
				this.pc1.setActivePage(this.pc1.childPage[0]);				
				
				var line;
				var tot = 0;
				for (var i=0;i < this.dataGAR.rs.rows.length;i++){
					line = this.dataGAR.rs.rows[i];
					tot = tot + parseFloat(line.hold);
				}		
				this.e_total.setText(floatToNilai(tot));

			} else this.sg.clear(1);

		}
		catch(e) {
			alert(e);
		}
	},
	doPager: function(sender, page) {
		this.doTampilData(page);
	},
	doTampilData: function(page) {
		this.sg.clear();
		var line;
		this.page = page;
		var start = (page - 1) * 50;
		var finish = (start + 50 > this.dataGAR.rs.rows.length? this.dataGAR.rs.rows.length:start + 50);
		for (var i=start;i<finish;i++){
			line = this.dataGAR.rs.rows[i];		
			this.sg.appendData([line.kode_akun, line.nama_akun, line.kode_pp, line.nama_pp, line.kode_drk, line.nama_drk, this.e_periode.getText(), floatToNilai(line.hold), floatToNilai(line.hold)]);						
		}
		this.sg.setNoUrut(start);
	},	

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
			if (this.stsSimpan == 1) this.doClick();
			if (this.standarLib.checkEmptyByTag(this, [0,1,2])){
				try{														
					uses("server_util_arrayList");
					var sql = new server_util_arrayList();					
					
					sql.add("insert into anggaran_m (no_agg,kode_lokasi,no_dokumen,tanggal,keterangan,tahun,kode_curr,nilai,tgl_input,nik_user,posted,no_del,nik_buat,nik_setuju,jenis) values  "+
						    "('"+this.e_nb.getText()+"','"+this.cb_lokasi.getText()+"','"+this.e_dok.getText()+"','"+this.dp_d1.getDateString()+"','"+this.e_ket.getText()+"','"+this.e_periode.getText().substr(0,4)+"','IDR',"+parseNilai(this.e_total.getText())+",getdate(),'"+this.app._userLog+"','T','-','"+this.app._userLog+"','"+this.cb_app.getText()+"','HOLD')");					
							
					var tahun = this.e_periode.getText().substr(0,4);					
					sql.add("INSERT INTO anggaran_d (no_agg, kode_lokasi, no_urut, kode_pp, kode_akun, kode_drk, volume, periode, nilai, nilai_sat, dc, satuan, tgl_input, nik_user, modul, buffer, nu) "+
							"select '"+this.e_nb.getText()+"','"+this.cb_lokasi.getText()+"',9999,a.kode_pp,a.kode_akun,a.kode_drk,1,'"+this.e_periode.getText()+"',a.rilis-isnull(b.aktual,0) as hold,a.rilis-isnull(b.aktual,0) as hold,'C','-',getdate(),'"+this.app._userLog+"','HOLD',0,0 "+
							"from "+ 
							"( "+
							"select a.kode_akun,a.kode_pp,a.kode_drk, "+
							"sum(case a.dc when 'D' then a.nilai else -a.nilai end) as rilis "+
							"from anggaran_d a "+
							"where periode between '"+tahun+"01' and '"+tahun+"12' "+
							"group by a.kode_akun,a.kode_pp,a.kode_drk "+
							") a "+
						
							"inner join masakun c on a.kode_akun=c.kode_akun and c.kode_lokasi='03' "+
							"inner join pp d on a.kode_pp=d.kode_pp and d.kode_lokasi='03' "+
							"inner join drk e on a.kode_drk=e.kode_drk and e.kode_lokasi='03' and tahun='"+tahun+"' "+
						
							"left join "+
							"( "+
							"select a.kode_akun,a.kode_pp,a.kode_drk, "+
							"sum(case a.dc when 'D' then a.nilai else -a.nilai end) as aktual "+
							"from angg_r a "+
							"where periode1 between '"+tahun+"01' and '"+tahun+"12' "+
							"group by a.kode_akun,a.kode_pp,a.kode_drk "+
							") b "+
							"on a.kode_akun=b.kode_akun and a.kode_pp=b.kode_pp and a.kode_drk=b.kode_drk ");

					sql.add("INSERT INTO anggaran_ori (no_agg, kode_lokasi, no_urut, kode_pp, kode_akun, kode_drk, volume, periode, nilai, nilai_sat, dc, satuan, tgl_input, nik_user, modul, buffer, nu) "+
							"select no_agg, kode_lokasi, no_urut, kode_pp, kode_akun, kode_drk, volume, periode, nilai, nilai_sat, 'D', satuan, tgl_input, nik_user, modul, buffer, nu "+
							"from anggaran_d where no_agg='"+this.e_nb.getText()+"' ");		
					
					setTipeButton(tbAllFalse);					
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
				if (modalResult == mrOk)
					this.standarLib.clearByTag(this, new Array("0","1","9"),this.e_nb);			
					this.sg.clear(1); 															
					setTipeButton(tbAllFalse);													
					this.pc2.setActivePage(this.pc2.childPage[0]);				
					this.pc1.setActivePage(this.pc1.childPage[0]);				
				break;
			case "simpan" :					
			case "ubah" :	
				this.preView = "1";																		
				this.app._periode = this.dbLib.getPeriode(this.app._lokasi);
				this.sg.validasi();			
				
				if (nilaiToFloat(this.e_total.getText()) <= 0) {
					system.alert(this,"Transaksi tidak valid.","Total Hold tidak boleh nol atau kurang.");
					return false;						
				}
				if (this.app._periode.substr(0,4) > this.e_periode.getText().substr(0,4)){
					system.alert(this,"Periode transaksi tidak valid.","Periode transaksi harus dalam tahun anggaran yang sama.["+this.app._periode.substr(0,4)+"]");
					return false;
				}
				else this.simpan();
				break;				
			case "simpancek" : this.simpan();			
				break;										
		}
	},
	doSelectDate: function(sender, y,m,d){
		try {
			if (m < 10) m = "0" + m;			
			this.e_periode.setText(y+""+m);
				
			if (this.stsSimpan == 1) {
				this.doClick();						
			}
		}
		catch(e) {
			alert(e);
		}
	},			
	doClick:function(sender){
		if (this.stsSimpan == 0)  {
			this.standarLib.clearByTag(this, new Array("9"),undefined);			
			this.sg.clear(1);																	
		}
		this.stsSimpan = 1;
		this.e_nb.setText(this.standarLib.noBuktiOtomatis(this.dbLib,"anggaran_m","no_agg",this.app._lokasi+"-HLD"+this.e_periode.getText().substr(2,4)+".","0000"));
		this.e_dok.setFocus();
		setTipeButton(tbSimpan);			
	},			  	
	doRequestReady: function(sender, methodName, result){
		if (sender == this.dbLib){
			try{   
				switch(methodName){
	    			case "execArraySQL" :	    				
						if (result.toLowerCase().search("error") == -1){							
							if (this.preView == "1") {																		
								// this.nama_report = "server_report_saku3_rra_rptAggDis";
								// this.filter = " where a.kode_lokasi='" + this.app._lokasi + "' and a.no_pdrk='" + this.e_nb.getText() + "' ";
								this.filter2 = "";
								this.viewer.prepare();
								this.viewer.setVisible(true);
								this.app._mainForm.pButton.setVisible(false);
								this.app._mainForm.reportNavigator.setVisible(true);
								this.viewer.setTotalPage(this.report.getTotalPage(this.nama_report, this.filter, 1, this.filter2));
								this.app._mainForm.reportNavigator.setTotalPage(this.viewer.getTotalPage());
								this.app._mainForm.reportNavigator.rearrange();
								this.showFilter = undefined;
								this.viewer.useIframe(this.report.previewWithHeader(this.nama_report, this.filter, 1, 1, this.showFilter, this.app._namalokasi, this.filter2));
								this.page = 1;
								this.allBtn = false;
								this.pc2.hide();								
							}
							else {
								system.info(this, "Transaksi telah sukses tereksekusi (No Bukti : " + this.e_nb.getText() + ")", "");
								this.clearLayar();
							}
						}						
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
			this.standarLib.clearByTag(this, new Array("0","1","9"),this.e_nb);			
			this.sg.clear(1); 						
			setTipeButton(tbAllFalse);											
			this.pc2.setActivePage(this.pc2.childPage[0]);				
			this.pc1.setActivePage(this.pc1.childPage[0]);				
		} catch(e) {
			alert(e);
		}
	}	
});
