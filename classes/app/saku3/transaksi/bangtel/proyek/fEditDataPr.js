window.app_saku3_transaksi_bangtel_proyek_fEditDataPr = function(owner)
{
	if (owner)
	{
		window.app_saku3_transaksi_bangtel_proyek_fEditDataPr.prototype.parent.constructor.call(this,owner);
		this.className  = "app_saku3_transaksi_bangtel_proyek_fEditDataPr";
		this.itemsValue = new arrayList();
		this.app._mainForm.childFormConfig(this, "mainButtonClick","Edit Data Proyek", 0);	
		
		uses("portalui_uploader;saiCBBL;saiEdit;datePicker;saiGrid;sgNavigator;pageControl;checkBox");
		uses("saiGrid",true);		
		
		this.c_status = new saiCB(this,{bound:[20,22,200,20],caption:"Jenis",items:["PBR","HUTANG","REKLAS","PIUTANG","PJ_PRY","PTG_PRY"], readOnly:true,tag:2, change:[this,"doChange"]});
		
		this.cb_bukti = new saiCBBL(this,{bound:[20,12,220,20],caption:"No Bukti", multiSelection:false, maxLength:20, tag:2, change:[this,"doChange"]});	
		this.e_prlama = new saiLabelEdit(this,{bound:[20,13,200,20],caption:"No PR Lama", maxLength:50, readOnly:true, tag:1});
		this.cb_prbaru = new saiCBBL(this,{bound:[20,12,220,20],caption:"No PR Baru", multiSelection:false, maxLength:20, tag:2});	
		this.bUpdate = new button(this,{bound:[120,14,98,20],caption:"Update",click:[this,"doUpdate"]});			

		this.rearrangeChild(10, 23);
		
		setTipeButton(tbAllFalse);
		this.maximize();		
		this.setTabChildIndex();
		try {
			this.dbLib = new util_dbLib();
			this.dbLib.addListener(this);
			uses("util_standar");
			this.standarLib = new util_standar();
			this.c_status.setText("");
			
		}catch(e){
			systemAPI.alert(e);
		}
	}
};
window.app_saku3_transaksi_bangtel_proyek_fEditDataPr.extend(window.childForm);
window.app_saku3_transaksi_bangtel_proyek_fEditDataPr.implement({
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
	doModalResult: function(event, modalResult){
		if (modalResult != mrOk) return false;
		switch (event){
			case "clear" :
				if (modalResult == mrOk)
					this.standarLib.clearByTag(this, new Array("0","1"),undefined);					
				setTipeButton(tbAllFalse);
				break;							
		}
	},
	doUpdate: function() {
		try {		
		uses("server_util_arrayList");
		var sql = new server_util_arrayList();												

		if (this.c_status.getText() == "PBR") {
			sql.add("update yk_pb_m set kode_proyek='"+this.cb_prbaru.getText()+"' where no_pb='"+this.cb_bukti.getText()+"' and kode_proyek='"+this.e_prlama.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");												
			sql.add("update spm_proyek_bdd set kode_proyek='"+this.cb_prbaru.getText()+"' where no_bukti='"+this.cb_bukti.getText()+"' and kode_proyek='"+this.e_prlama.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");												
		}	
		if (this.c_status.getText() == "HUTANG") {
			sql.add("update hutang_m set kode_proyek='"+this.cb_prbaru.getText()+"' where no_hutang='"+this.cb_bukti.getText()+"' and kode_proyek='"+this.e_prlama.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");												
			sql.add("update yk_pb_m set kode_proyek='"+this.cb_prbaru.getText()+"' where no_pb='"+this.cb_bukti.getText()+"' and kode_proyek='"+this.e_prlama.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");												
			sql.add("update spm_proyek_bdd set kode_proyek='"+this.cb_prbaru.getText()+"' where no_bukti='"+this.cb_bukti.getText()+"' and kode_proyek='"+this.e_prlama.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");												
		}	
		if (this.c_status.getText() == "REKLAS") {
			sql.add("update spm_proyek_reklas_m set ref1='"+this.cb_prbaru.getText()+"' where no_reklas='"+this.cb_bukti.getText()+"' and ref1='"+this.e_prlama.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");												
			sql.add("update spm_proyek_reklas_d set kode_proyek='"+this.cb_prbaru.getText()+"' where no_reklas='"+this.cb_bukti.getText()+"' and kode_proyek='"+this.e_prlama.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");												
		}
		if (this.c_status.getText() == "PIUTANG") {
			sql.add("update spm_piutang_m set kode_proyek='"+this.cb_prbaru.getText()+"' where no_piutang='"+this.cb_bukti.getText()+"' and kode_proyek='"+this.e_prlama.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");												
			sql.add("update spm_piutang_d set kode_proyek='"+this.cb_prbaru.getText()+"' where no_piutang='"+this.cb_bukti.getText()+"' and kode_proyek='"+this.e_prlama.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");												
		}

		if (this.c_status.getText() == "PJ_PRY") {
			sql.add("update panjar2_m set kode_proyek='"+this.cb_prbaru.getText()+"' where no_panjar='"+this.cb_bukti.getText()+"' and kode_proyek='"+this.e_prlama.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");												
			sql.add("update spm_proyek_bdd set kode_proyek='"+this.cb_prbaru.getText()+"' where no_bukti='"+this.cb_bukti.getText()+"' and kode_proyek='"+this.e_prlama.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");	
		}
		if (this.c_status.getText() == "PTG_PRY") {												
			sql.add("update spm_proyek_bdd set kode_proyek='"+this.cb_prbaru.getText()+"' where no_bukti='"+this.cb_bukti.getText()+"' and kode_proyek='"+this.e_prlama.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
		}

		this.dbLib.execArraySQL(sql);	

		}
		catch(e) {
			alert(e);
		}
	},
	doChange: function(sender){
		try{			
			if (sender == this.c_status && this.c_status.getText() != "") {
				if (this.c_status.getText() == "PBR") this.cb_bukti.setSQL("select no_pb,keterangan from yk_pb_m where modul='PBPR' and kode_lokasi='"+this.app._lokasi+"'",["no_pb","keterangan"],false,["No Bukti","Deskripsi"],"and","Data Bukti",true);	
				if (this.c_status.getText() == "HUTANG") this.cb_bukti.setSQL("select no_hutang,keterangan from hutang_m where kode_lokasi='"+this.app._lokasi+"'",["no_hutang","keterangan"],false,["No Bukti","Deskripsi"],"and","Data Bukti",true);	
				if (this.c_status.getText() == "REKLAS") this.cb_bukti.setSQL("select no_reklas,keterangan from spm_proyek_reklas_m where kode_lokasi='"+this.app._lokasi+"'",["no_reklas","keterangan"],false,["No Bukti","Deskripsi"],"and","Data Bukti",true);	
				if (this.c_status.getText() == "PIUTANG") this.cb_bukti.setSQL("select no_piutang,keterangan from spm_piutang_m where kode_lokasi='"+this.app._lokasi+"'",["no_piutang","keterangan"],false,["No Bukti","Deskripsi"],"and","Data Bukti",true);
				if (this.c_status.getText() == "PJ_PRY") this.cb_bukti.setSQL("select no_panjar,keterangan from panjar2_m where kode_lokasi='"+this.app._lokasi+"'",["no_panjar","keterangan"],false,["No Bukti","Deskripsi"],"and","Data Bukti",true);	
				if (this.c_status.getText() == "PTG_PRY") this.cb_bukti.setSQL("select no_ptg,keterangan from panjarptg2_m where kode_lokasi='"+this.app._lokasi+"'",["no_ptg","keterangan"],false,["No Bukti","Deskripsi"],"and","Data Bukti",true);	
			}
			
			if (sender == this.cb_bukti && this.cb_bukti.getText() != "") {
				if (this.c_status.getText() == "PBR")  var strSQL = "select kode_proyek,kode_pp from yk_pb_m where no_pb='"+this.cb_bukti.getText()+"' and kode_lokasi='"+this.app._lokasi+"'";
				if (this.c_status.getText() == "HUTANG") var strSQL = "select kode_proyek,kode_pp from hutang_m where no_hutang='"+this.cb_bukti.getText()+"' and kode_lokasi='"+this.app._lokasi+"'";
				if (this.c_status.getText() == "REKLAS") var strSQL = "select ref1 as kode_proyek,kode_pp from spm_proyek_reklas_m where no_reklas='"+this.cb_bukti.getText()+"' and kode_lokasi='"+this.app._lokasi+"'";
				if (this.c_status.getText() == "PIUTANG") var strSQL = "select kode_proyek,kode_pp from spm_piutang_m where no_piutang='"+this.cb_bukti.getText()+"' and kode_lokasi='"+this.app._lokasi+"'";
				if (this.c_status.getText() == "PJ_PRY") var strSQL = "select kode_proyek,kode_pp from panjar2_m where no_panjar='"+this.cb_bukti.getText()+"' and kode_lokasi='"+this.app._lokasi+"'";
				if (this.c_status.getText() == "PTG_PRY") var strSQL = "select a.kode_proyek,b.kode_pp from spm_proyek_bdd a inner join panjarptg2_m b on a.no_bukti=b.no_ptg and a.kode_lokasi=b.kode_lokasi where a.no_bukti='"+this.cb_bukti.getText()+"' and a.kode_lokasi='"+this.app._lokasi+"'";


				var data = this.dbLib.getDataProvider(strSQL,true);
				if (typeof data == "object"){
					var line = data.rs.rows[0];							
					if (line != undefined){						
						this.e_prlama.setText(line.kode_proyek);	
						this.kodepp = line.kode_pp;		
						
						//-- di open tgl 23-9-21-rudi kode_pp='"+this.kodepp+"' and 
						this.cb_prbaru.setSQL("select kode_proyek,nama from spm_proyek where kode_lokasi='"+this.app._lokasi+"'",["kode_proyek","nama"],false,["Kode","Nama"],"and","Data Proyek",true);
					}
				}
			}

		}catch(e){
			systemAPI.alert(e);
		}
	},		
	doRequestReady: function(sender, methodName, result){
		if (sender == this.dbLib){
			try{   
				switch(methodName){
	    			case "execArraySQL" :	    				
						if (result.toLowerCase().search("error") == -1)					
						{
							this.app._mainForm.pesan(2,"transaksi telah sukses tereksekusi");							
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