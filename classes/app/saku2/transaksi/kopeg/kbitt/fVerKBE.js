window.app_saku2_transaksi_kopeg_kbitt_fVerKBE = function(owner)
{
	if (owner)
	{
		window.app_saku2_transaksi_kopeg_kbitt_fVerKBE.prototype.parent.constructor.call(this,owner);
		this.className  = "app_saku2_transaksi_kopeg_kbitt_fVerKBE";
		this.itemsValue = new arrayList();
		this.maximize();
		this.app._mainForm.childFormConfig(this, "mainButtonClick","Form Verifikasi Pengajuan : Edit", 0);	
		
		uses("saiCB;saiMemo;saiCBBL;saiEdit;datePicker;saiGrid;sgNavigator;pageControl;checkBox");
		this.e_periode = new portalui_saiLabelEdit(this,{bound:[20,11,202,20],caption:"Periode",tag:2,readOnly:true,visible:false,change:[this,"doChange"]});
		this.l_tgl1 = new portalui_label(this,{bound:[20,11,100,18],caption:"Tanggal", underline:true});
		this.dp_d1 = new portalui_datePicker(this,{bound:[120,11,100,18],selectDate:[this,"doSelectDate"]}); 		
		this.e_nb = new saiCBBL(this,{bound:[20,12,223,20],caption:"No Bukti", multiSelection:false, maxLength:10, tag:1, readOnly:true,change:[this,"doChange"]});		
		
		this.pc1 = new pageControl(this,{bound:[20,18,980,480], childPage:["Detail Pengajuan"]});										
		this.c_status = new saiCB(this.pc1.childPage[0],{bound:[20,10,202,20],caption:"Status Approval",items:["APPROVE","REVISI"], readOnly:true,tag:2});
		this.e_noaju = new saiLabelEdit(this.pc1.childPage[0],{bound:[20,13,450,20],caption:"No Agenda", readOnly:true});						
		this.e_modul = new saiLabelEdit(this.pc1.childPage[0],{bound:[520,13,450,20],caption:"Modul", readOnly:true});						
		this.e_akun = new saiLabelEdit(this.pc1.childPage[0],{bound:[20,15,450,20],caption:"Akun", readOnly:true});								
		this.e_pp = new saiLabelEdit(this.pc1.childPage[0],{bound:[520,15,450,20],caption:"Bagian/Unit", readOnly:true});												
		this.e_ket = new saiLabelEdit(this.pc1.childPage[0],{bound:[20,16,450,20],caption:"Deskripsi", readOnly:true});								
		this.e_drk = new saiLabelEdit(this.pc1.childPage[0],{bound:[520,16,450,20],caption:"DRK", readOnly:true});												
		this.e_tgl = new saiLabelEdit(this.pc1.childPage[0],{bound:[20,18,450,20],caption:"Tanggal", readOnly:true});								
		this.e_tglinput = new saiLabelEdit(this.pc1.childPage[0],{bound:[520,18,450,20],caption:"Tgl Input", readOnly:true});												
		this.e_user = new saiLabelEdit(this.pc1.childPage[0],{bound:[20,19,450,20],caption:"User Input", readOnly:true});								
		this.e_total = new saiLabelEdit(this.pc1.childPage[0],{bound:[20,17,200,20],caption:"Nilai Pengajuan", tag:1, readOnly:true, tipeText:ttNilai, text:"0"});		
		this.e_memo = new saiMemo(this.pc1.childPage[0],{bound:[20,12,450,80],caption:"Catatan",tag:9,readOnly:true});
	
		this.rearrangeChild(10, 23);
		this.pc1.childPage[0].rearrangeChild(10, 23);	
					
		setTipeButton(tbUbahHapus);
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
window.app_saku2_transaksi_kopeg_kbitt_fVerKBE.extend(window.childForm);
window.app_saku2_transaksi_kopeg_kbitt_fVerKBE.implement({
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
					sql.add("delete from ver_m where no_ver='"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
					sql.add("delete from ver_d where no_ver='"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");						
					sql.add("update it_aju_m set progress='0',no_ver='-' where no_aju='"+this.e_noaju.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
					
					if (this.c_status.getText()=="APPROVE")  var prog = "1";
					if (this.c_status.getText()=="REVISI")  var prog = "R";
					
					sql.add("update a set no_verseb ='"+this.e_nb.getText()+"' "+
					        "from ver_m a inner join ver_d b on a.no_ver=b.no_ver and a.kode_lokasi=b.kode_lokasi and a.no_verseb='-' "+
							"where b.no_bukti ='"+this.e_noaju.getText()+"' and b.modul='ITKBAJU' and b.kode_lokasi='"+this.app._lokasi+"'");
												
					sql.add("update it_aju_m set progress='"+prog+"',no_ver='"+this.e_nb.getText()+"' where no_aju='"+this.e_noaju.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
					sql.add("insert into ver_m (no_ver,tanggal,kode_lokasi,periode,nik_user,tgl_input,status,modul) values "+
						    "('"+this.e_nb.getText()+"','"+this.dp_d1.getDateString()+"','"+this.app._lokasi+"','"+this.e_periode.getText()+"','"+this.app._userLog+"',getdate(),'"+this.c_status.getText()+"','ITKBAJU')");
					
					sql.add("insert into ver_d (no_ver,status,modul,no_bukti,kode_lokasi,catatan) values "+
						    "('"+this.e_nb.getText()+"','"+prog+"','ITKBAJU','"+this.e_noaju.getText()+"','"+this.app._lokasi+"','"+this.e_memo.getText()+"')");					
							
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
					this.e_memo.setText("-");
					setTipeButton(tbUbahHapus);
				break;
			case "ubah" :									
				if (nilaiToFloat(this.e_total.getText()) <= 0) {
					system.alert(this,"Transaksi tidak valid.","Nilai tidak boleh nol atau kurang.");
					return false;						
				}				
				if (parseFloat(this.app._periode) < parseFloat(this.e_periode.getText())){
					if (this.app._pernext == "1")
					  system.confirm(this, "simpancek", "Periode transaksi melebihi periode aktif sistem.["+this.app._periode+"]","Data akan disimpan?");
					else{
						system.alert(this,"Periode transaksi tidak valid.","Periode transaksi tidak boleh melebihi periode aktif sistem.["+this.app._periode+"]");
						return false;
					}
				} 
				else
				this.simpan();
				break;				
			case "simpancek" : this.simpan();			
				break;
			case "hapus" :					
				uses("server_util_arrayList");
				var sql = new server_util_arrayList();								
				sql.add("delete from ver_m where no_ver='"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
				sql.add("delete from ver_d where no_ver='"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");						
				sql.add("update it_aju_m set progress='0',no_ver='-' where no_aju='"+this.e_noaju.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
				setTipeButton(tbAllFalse);	
				this.dbLib.execArraySQL(sql);				
				break;				
		}
	},
	doSelectDate: function(sender, y,m,d){
		if (m < 10) m = "0" + m;			
		if (parseFloat(this.app._periode.substr(4,2)) <= 12) this.e_periode.setText(y+""+m);
		else {
			if (m == "12") this.e_periode.setText(this.app._periode);
			else this.e_periode.setText(y+""+m);
		}
	},		
	doChange:function(sender){
		if (sender == this.e_periode && this.e_periode.getText() != "") {										 
			this.e_nb.setSQL("select b.no_ver, b.no_bukti from ver_d b inner join it_aju_m a on a.no_aju=b.no_bukti and a.kode_lokasi=b.kode_lokasi and b.modul='ITKBAJU' "+
							 "       inner join ver_m c on b.no_ver=c.no_ver and a.kode_lokasi=c.kode_lokasi and c.no_verseb='-' "+ 							 
			                 "where c.status in ('APPROVE','REVISI') and a.progress in ('1','R','F') and c.periode='"+this.e_periode.getText()+"' and b.kode_lokasi='"+this.app._lokasi+"'",["b.no_ver","b.no_bukti"],false,["No Bukti","Deskripsi"],"and","Daftar Bukti",true);
		}
		if (sender == this.e_nb && this.e_nb.getText()!="") {					
			var strSQL = "select a.tanggal as tgl,b.catatan,case c.progress when '1' then 'APPROVE' when 'R' then 'REVISI' end as progress, "+
						 "c.no_aju,convert(varchar,c.tanggal,103) as tanggal,c.modul,bb.kode_pp+' - '+bb.nama as pp,cc.kode_akun+' - '+isnull(cc.nama,'-') as akun,'-' as drk,c.keterangan,c.nilai,convert(varchar,c.tgl_input,103) as tgl_input,c.user_input as nik_user  "+
						 "from ver_m a inner join ver_d b on a.no_ver=b.no_ver and a.kode_lokasi=b.kode_lokasi "+
						 "             inner join it_aju_m c on b.no_bukti=c.no_aju and b.kode_lokasi=c.kode_lokasi "+						 						 
						 "			   inner join pp bb on c.kode_pp=bb.kode_pp and c.kode_lokasi=bb.kode_lokasi "+						 						 
						 "             left join masakun cc on c.kode_akun=cc.kode_akun and c.kode_lokasi=cc.kode_lokasi "+
						 "where a.no_ver='"+this.e_nb.getText()+"' and a.kode_lokasi='"+this.app._lokasi+"'";
			var data = this.dbLib.getDataProvider(strSQL,true);
			if (typeof data == "object"){
				var line = data.rs.rows[0];							
				if (line != undefined){															
					this.dp_d1.setText(line.tgl);										
					this.c_status.setText(line.progress.toUpperCase());
					this.e_noaju.setText(line.no_aju);			
					this.e_modul.setText(line.modul);			
					this.e_akun.setText(line.akun);			
					this.e_pp.setText(line.pp);			
					this.e_ket.setText(line.keterangan);			
					this.e_drk.setText(line.drk);			
					this.e_tgl.setText(line.tanggal);			
					this.e_tglinput.setText(line.tgl_input);			
					this.e_user.setText(line.nik_user);			
					this.e_total.setText(floatToNilai(line.nilai));																
					this.e_memo.setText(line.catatan);
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
							system.info(this,"Transaksi telah sukses tereksekusi (No Bukti : "+ this.e_nb.getText()+")","");
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