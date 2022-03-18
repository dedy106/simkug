window.app_saku3_transaksi_tu_bmhd_fRekonBMHD = function(owner)
{
	if (owner)
	{
		window.app_saku3_transaksi_tu_bmhd_fRekonBMHD.prototype.parent.constructor.call(this,owner);
		this.className  = "app_saku3_transaksi_tu_bmhd_fRekonBMHD";
		this.itemsValue = new arrayList();
		this.maximize();
		this.app._mainForm.childFormConfig(this, "mainButtonClick","Form Rekon BMHD", 0);	
		
		uses("saiCB;saiCBBL;saiEdit;datePicker;saiGrid;sgNavigator;pageControl;checkBox");
		this.e_periode = new portalui_saiLabelEdit(this,{bound:[20,10,202,20],caption:"Periode",tag:2,readOnly:true,change:[this,"doChange"]});
		this.l_tgl1 = new portalui_label(this,{bound:[20,11,100,18],caption:"Tanggal", underline:true});
		this.dp_d1 = new portalui_datePicker(this,{bound:[120,11,100,18],selectDate:[this,"doSelectDate"]}); 		
		this.cb_bukti = new portalui_saiCBBL(this,{bound:[20,13,222,20],caption:"No Jurnal",tag:1,multiSelection:false,change:[this,"doChange"]});         		
				
		this.pc1 = new pageControl(this,{bound:[20,12,980,305], childPage:["Data Pelunasan"]});				
		this.cb_bmhd = new saiCBBL(this.pc1.childPage[0],{bound:[20,13,220,20],caption:"Bukti BHMD", multiSelection:false, maxLength:10, tag:0,change:[this,"doChange"]});					
		this.e_atensi = new saiLabelEdit(this.pc1.childPage[0],{bound:[20,14,450,20],caption:"Vendor", readOnly:true});						
		this.e_akunbmhd = new saiLabelEdit(this.pc1.childPage[0],{bound:[20,13,450,20],caption:"Akun BMHD", readOnly:true});									
		this.e_saldo= new saiLabelEdit(this.pc1.childPage[0],{bound:[20,20,200,20],caption:"Saldo BMHD", tag:1, readOnly:true, tipeText:ttNilai, text:"0"});		
		this.e_nilai= new saiLabelEdit(this.pc1.childPage[0],{bound:[20,21,200,20],caption:"Nilai KasBank", tag:1, tipeText:ttNilai, text:"0",change:[this,"doChange"]});		
		this.e_ket = new saiLabelEdit(this.pc1.childPage[0],{bound:[20,17,550,20],caption:"Uraian", maxLength:150});								

		this.rearrangeChild(10, 23);
		this.pc1.childPage[0].rearrangeChild(10, 23);

		uses("server_report_report;portalui_reportViewer");
		this.viewer = new portalui_reportViewer(this, {bound:[0,0,this.getWidth(), this.getHeight()],visible:false});
		this.viewer.hide();
		this.app._mainForm.initReport(this, this.viewer,"doSelectedPage","doCloseReportClick", "doRowPerPageChange", "doPdfClick","doXlsClick",true);
		this.report = new server_report_report();
		this.report.addListener(this);
		
		setTipeButton(tbSimpan);
		this.maximize();		
		this.setTabChildIndex();
		try {
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
window.app_saku3_transaksi_tu_bmhd_fRekonBMHD.extend(window.childForm);
window.app_saku3_transaksi_tu_bmhd_fRekonBMHD.implement({
	isiCBbmhd: function() {
		var strSQL = "select a.no_bmhd,a.keterangan "+
					 "from bmhd_m a "+
					 "left join ("+
					 "			select no_bmhd,kode_lokasi,sum(case dc when 'D' then nilai else -nilai end) as bayar "+
					 "			from  bmhd_bayar "+
					 "			where kode_lokasi='"+this.app._lokasi+"' group by no_bmhd,kode_lokasi "+
					 ") d on a.no_bmhd=d.no_bmhd and a.kode_lokasi=d.kode_lokasi "+
					 "where a.kode_lokasi='"+this.app._lokasi+"' and a.nilai > isnull(d.bayar,0) and a.periode<='"+this.e_periode.getText()+"' ";	
		this.cb_bmhd.setSQL(strSQL,["no_bmhd","keterangan"],false,["No BMHD","Deskripsi"],"and","Daftar BMHD",true);						 
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
			if (this.standarLib.checkEmptyByTag(this, [0,1,2])){
				try{														
					uses("server_util_arrayList");
					var sql = new server_util_arrayList();						
					sql.add("insert into bmhd_bayar (no_aju,no_bmhd,kode_lokasi,akun_bmhd,keterangan,kode_pp,modul,periode,kode_curr,kurs,nilai,dc,kode_vendor) values  "+
							"('"+this.cb_bukti.getText()+"','"+this.cb_bmhd.getText()+"','"+this.app._lokasi+"','"+this.e_akunbmhd.getText()+"','"+this.e_ket.getText()+"','"+this.app._kodePP+"','REKON','"+this.e_periode.getText()+"','IDR',1,"+nilaiToFloat(this.e_nilai.getText())+",'D','"+this.kodeVendor+"')");
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
					this.standarLib.clearByTag(this, new Array("0","1"),this.e_nb);					
					this.pc1.setActivePage(this.pc1.childPage[0]);					
					setTipeButton(tbSimpan);					
				break;
			case "simpan" :												
				this.app._periode = this.dbLib.getPeriode(this.app._lokasi);
				if (nilaiToFloat(this.e_nilai.getText()) > nilaiToFloat(this.e_saldo.getText())) {
					system.alert(this,"Transaksi tidak valid.","Nilai tidak boleh melebihi saldo.");
					return false;						
				}
				if (nilaiToFloat(this.e_nilai.getText()) <= 0) {
					system.alert(this,"Transaksi tidak valid.","Total tidak boleh nol atau kurang.");
					return false;						
				}				
				else this.simpan();
				break;				
			case "simpancek" : this.simpan();			
				break;			
		}
	},
	doSelectDate: function(sender, y,m,d){
		if (m < 10) m = "0" + m;			
		this.e_periode.setText(y+""+m);
		this.cb_bukti.setSQL("select distinct no_bukti, keterangan from gldt where periode='"+this.e_periode.getText()+"' and kode_lokasi='"+this.app._lokasi+"' "+
							 "union "+
							 "select distinct no_bukti, keterangan from gldt_h where periode='"+this.e_periode.getText()+"' and kode_lokasi='"+this.app._lokasi+"' "
							 ,["no_bukti","keterangan"],false,["No Bukti","Keterangan"],"and","Daftar Bukti",true);	
	},
	doChange:function(sender){
		if (sender == this.e_periode && this.e_periode.getText()!="") {
			this.isiCBbmhd();
		}								
		if (sender == this.cb_bmhd && this.cb_bmhd.getText()!="") {			
			var strSQL = "select a.no_bmhd,a.kode_akun,a.keterangan,a.kode_vendor,b.nama as nama_vendor,a.nilai-isnull(d.bayar,0) as nilai "+
						"from bmhd_m a "+
						"inner join it_vendor b on a.kode_vendor=b.kode_vendor and a.kode_lokasi=b.kode_lokasi "+					 
						"left join ("+
						"			select no_bmhd,kode_lokasi,sum(case dc when 'D' then nilai else -nilai end) as bayar "+
						"			from  bmhd_bayar "+
						"			where kode_lokasi='"+this.app._lokasi+"' group by no_bmhd,kode_lokasi "+
						") d on a.no_bmhd=d.no_bmhd and a.kode_lokasi=d.kode_lokasi "+
						"where a.kode_lokasi='"+this.app._lokasi+"' and a.nilai > isnull(d.bayar,0) and a.no_bmhd='"+this.cb_bmhd.getText()+"' ";	
			var data = this.dbLib.getDataProvider(strSQL,true);
			if (typeof data == "object"){
				var line = data.rs.rows[0];							
				if (line != undefined){
					this.e_akunbmhd.setText(line.kode_akun);	
					this.kodeVendor = line.kode_vendor;
					this.e_atensi.setText(line.nama_vendor);					
					this.e_saldo.setText(floatToNilai(line.nilai));	
					this.e_nilai.setText(floatToNilai(line.nilai));								
				} 
			}			
		}			
	},
	doRequestReady: function(sender, methodName, result){
		if (sender == this.dbLib){
			try{   
				switch(methodName){
	    			case "execArraySQL" :	    				
						if (result.toLowerCase().search("error") == -1){
							system.info(this,"Transaksi telah sukses tersimpan","");
							this.app._mainForm.bClear.click();
						}else system.info(this,result,"");
	    			break;
	    		}    		
			}
			catch(e){
				systemAPI.alert("step : "+step+"; error = "+e);
			}
	    }
	}
});