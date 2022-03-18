window.app_kopeg_proyek_fProyek = function(owner)
{
	if (owner)
	{
		window.app_kopeg_proyek_fProyek.prototype.parent.constructor.call(this,owner);
		this.className  = "app_kopeg_proyek_fProyek";
		this.itemsValue = new portalui_arrayList();
		this.app._mainForm.childFormConfig(this, "mainButtonClick","Data Kontrak : Input/Koreksi", 0);	
		
		uses("portalui_saiCB,portalui_saiCBBL;portalui_saiCBB;portalui_saiEdit;portalui_datePicker;portalui_saiTable");
		this.cb_kode = new portalui_saiCBBL(this,{bound:[20,10,290,20],caption:"No Kontrak",btnClick:[this,"doBtnClick"],maxLength:20,rightLabelVisible:false});
		this.bLoad = new portalui_imageButton(this,{bound:[310,10,22,22],click:[this,"doLoadClick"],hint:"Search",image:"icon/"+system.getThemes()+"/reload.png"});
		this.lTgl = new portalui_label(this,{bound:[20,21,100,18],caption:"Tanggal Mulai",underline:true});
		this.dTgl = new portalui_datePicker(this,{bound:[120,21,100,18],selectDate:[this,"doSelectDate"]});
		this.lTgl2 = new portalui_label(this,{bound:[20,22,100,18],caption:"Tanggal Selesai",underline:true});
		this.dTgl2 = new portalui_datePicker(this,{bound:[120,22,100,18],selectDate:[this,"doSelectDate"]});
		this.e_dok = new portalui_saiLabelEdit(this,{bound:[20,11,300,20],caption:"No Dokumen", maxLength:50});		
		this.e_ket = new portalui_saiLabelEdit(this,{bound:[20,12,600,20],caption:"Keterangan", maxLength:150});		
		this.cb_cust = new portalui_saiCBBL(this,{bound:[20,13,200,20],caption:"Customer",btnClick:[this,"doBtnClick"]});
		this.cb_pp = new portalui_saiCBBL(this,{bound:[20,14,200,20],caption:"PP/Unit Kerja",btnClick:[this,"doBtnClick"]});
		this.cb_akun = new portalui_saiCBBL(this,{bound:[20,17,200,20],caption:"Akun Piutang",btnClick:[this,"doBtnClick"]});
		this.e_nilai = new portalui_saiLabelEdit(this,{bound:[20,15,200,20],caption:"Nilai Kontrak",tipeText:ttNilai,tag:1,text:"0"});
		this.e_ppn = new portalui_saiLabelEdit(this,{bound:[20,16,200,20],caption:"Nilai PPN",tipeText:ttNilai,tag:1,text:"0"});
		this.bTampil = new portalui_button(this,{bound:[829,16,80,18],caption:"Tampil",click:[this,"doTampilClick"]});		
		
		this.p1 = new portalui_panel(this,{bound:[10,16,900,293],caption:"Daftar Kontrak"});
		this.sg1 = new portalui_saiTable(this.p1,{bound:[1,20,895,270],tag:"9"});		
		
		this.rearrangeChild(10, 22);
		setTipeButton(tbAllFalse);
		this.maximize();		
		this.setTabChildIndex();
		
		try
		{			
			this.dbLib = new util_dbLib();
			this.dbLib.addListener(this);
			uses("util_standar");
			this.standarLib = new util_standar();
			
			this.cb_cust.setSQL("select kode_cust,nama from cust where kode_lokasi = '"+this.app._lokasi+"'",["kode_cust","nama"],true);
			this.cb_pp.setSQL("select kode_pp,nama from pp where tipe = 'posting' and kode_lokasi = '"+this.app._lokasi+"'",["kode_pp","nama"],true);
			this.cb_akun.setSQL("select a.kode_akun, a.nama from masakun a inner join flag_relasi b on a.kode_akun = b.kode_akun and a.kode_lokasi=b.kode_lokasi where a.block= '0' and a.kode_lokasi = '"+this.app._lokasi+"' and b.kode_flag='003'",["a.kode_akun","a.nama"],true);
		}catch(e){
			systemAPI.alert(e);
		}
	}
};
window.app_kopeg_proyek_fProyek.extend(window.portalui_childForm);
window.app_kopeg_proyek_fProyek.implement({
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
					sql.add("insert into kop_proyek_m(no_proyek,no_dokumen,keterangan,tgl_mulai,tgl_selesai,kode_cust,nilai,nilai_ppn,kode_lokasi,nik_user,tgl_input,kode_pp,akun_ar) values "+
						    "	('"+this.cb_kode.getText()+"','"+this.e_dok.getText()+"','"+this.e_ket.getText()+"','"+this.dTgl.getDateString()+"','"+this.dTgl2.getDateString()+"','"+this.cb_cust.getText()+"',"+parseNilai(this.e_nilai.getText())+","+parseNilai(this.e_ppn.getText())+",'"+this.app._lokasi+"','"+this.app._userLog+"',now(),'"+this.cb_pp.getText()+"','"+this.cb_akun.getText()+"')");
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
	ubah: function(){			
		try{						
			if (this.standarLib.checkEmptyByTag(this, [0,1,2])){
				try{									
					uses("server_util_arrayList");
					var sql = new server_util_arrayList();
					sql.add("update kop_proyek_m set akun_ar='"+this.cb_akun.getText()+"',kode_pp='"+this.cb_pp.getText()+"',no_dokumen='"+this.e_dok.getText()+"',keterangan='"+this.e_ket.getText()+"',kode_cust='"+this.cb_cust.getText()+"',tgl_mulai='"+this.dTgl.getDateString()+"',tgl_selesai='"+this.dTgl.getDateString()+"',nilai="+parseNilai(this.e_nilai.getText())+",nilai_ppn="+parseNilai(this.e_ppn.getText())+",nik_user='"+this.app._userLog+"',tgl_input=now() "+
						    "where no_proyek='"+this.cb_kode.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
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
	hapus: function(){			
		try{						
			if (this.standarLib.checkEmptyByTag(this, [0])){
				try{									
					uses("server_util_arrayList");
					var sql = new server_util_arrayList();
					sql.add("delete from kop_proyek_m where no_proyek='"+this.cb_kode.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
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
		switch (event)
		{
			case "clear" :
				if (modalResult == mrOk)
					this.standarLib.clearByTag(this, new Array("0","1"),this.cb_kode);	
				setTipeButton(tbAllFalse);
				break;
			case "simpan" :	
				if ((new Date()).strToDate(this.dTgl.getDate())  > (new Date()).strToDate(this.dTgl2.getDate())){
					system.alert(this,"Tanggal tidak valid."," Tanggal Mulai melebihi Tgl Selesai.");
					return false;
				}
				this.simpan();
				break;				
			case "simpancek" : this.simpan();			
				break;
			case "ubah" :	
				if ((new Date()).strToDate(this.dTgl.getDate())  > (new Date()).strToDate(this.dTgl2.getDate())){
					system.alert(this,"Tanggal tidak valid."," Tanggal Mulai melebihi Tgl Selesai.");
					return false;
				}
				this.ubah();
				break;				
			case "hapus" :	
				this.hapus();
				break;				
		}
	},
	doLoadClick: function(sender){
		try{
			if (this.cb_kode.getText() != ""){
				var data = this.dbLib.getDataProvider("select a.tgl_mulai,a.tgl_selesai,a.no_dokumen,a.keterangan,a.kode_cust,b.nama,a.nilai,a.nilai_ppn,a.kode_pp,c.nama as nama_pp,a.akun_ar,d.nama as nama_akun "+
				           " from kop_proyek_m a inner join cust b on a.kode_cust = b.kode_cust and a.kode_lokasi=b.kode_lokasi "+
						   " 					 inner join pp c on a.kode_pp = c.kode_pp and a.kode_lokasi=c.kode_lokasi "+
						   " 					 inner join masakun d on a.akun_ar = d.kode_akun and a.kode_lokasi=d.kode_lokasi "+
					       " where a.kode_lokasi = '"+this.app._lokasi+"' and a.no_proyek ='"+this.cb_kode.getText()+"'");
				eval("data = "+data+";");
				if (typeof data == "object"){
					var line = data.rs.rows[0];							
					if (line != undefined){
						this.e_dok.setText(line.no_dokumen);
						this.e_ket.setText(line.keterangan);
						this.cb_cust.setText(line.kode_cust,line.nama);
						this.cb_pp.setText(line.kode_pp,line.nama_pp);
						this.cb_akun.setText(line.akun_ar,line.nama_akun);
						this.e_ket.setText(line.keterangan);
						this.e_nilai.setText(floatToNilai(line.nilai));
						this.e_ppn.setText(floatToNilai(line.nilai_ppn));
						this.dTgl.setText(line.tgl_mulai);
						this.dTgl2.setText(line.tgl_selesai);
						setTipeButton(tbUbahHapus);
					}
					else{
						setTipeButton(tbSimpan);
					}
				}
			}
		}catch(e){
			systemAPI.alert(e);
		}
	},
	doTampilClick: function(sender){
		try{			
			this.sg1.setColTitle(new Array("No","No Kontrak","No Dokumen","Tgl Mulai","Tgl Selesai","Keterangan","Cust","PP","Nilai","PPN"));				
			var data = this.dbLib.runSQL(" select a.no_proyek,a.no_dokumen,a.tgl_mulai,a.tgl_selesai,a.keterangan,concat(b.kode_cust,'-',b.nama)as nama,concat(c.kode_pp,'-',c.nama)as pp,concat(d.kode_akun,'-',d.nama)as nama_akun,a.nilai,a.nilai_ppn from kop_proyek_m a "+
					   " inner join cust b on a.kode_cust=b.kode_cust and a.kode_lokasi = b.kode_lokasi "+
					   " inner join pp c on a.kode_pp=c.kode_pp and a.kode_lokasi = c.kode_lokasi "+
					   " inner join masakun d on a.akun_ar=d.kode_akun and a.kode_lokasi = d.kode_lokasi "+
					   " where a.kode_lokasi = '"+this.app._lokasi+"' ");
			this.sg1.clearAll();
			this.sg1.setData(data);
		}catch(e){
			systemAPI.alert(e);
		}
	},
	doBtnClick: function(sender, event){
		try{
			if (sender == this.cb_kode) {   
			    this.standarLib.showListData(this, "Daftar No Kontrak",sender,undefined, 
											  "select no_proyek, no_dokumen  from kop_proyek_m where kode_lokasi='"+this.app._lokasi+"'",
											  "select count(no_proyek)       from kop_proyek_m where kode_lokasi='"+this.app._lokasi+"'",
											  ["no_proyek","no_dokumen"],"and",["No Kontrak","No Dokumen"],false);				
			}
			if (sender == this.cb_cust) {   
			    this.standarLib.showListData(this, "Daftar Cust",sender,undefined, 
											  "select kode_cust, nama  from cust where kode_lokasi='"+this.app._lokasi+"'",
											  "select count(kode_cust) from cust where kode_lokasi='"+this.app._lokasi+"'",
											  ["kode_cust","nama"],"and",["Kode","Nama"],false);				
			}
			if (sender == this.cb_pp) {   
			    this.standarLib.showListData(this, "Daftar PP",sender,undefined, 
											  "select kode_pp, nama  from pp where tipe='posting' and kode_lokasi='"+this.app._lokasi+"'",
											  "select count(kode_pp) from pp where tipe='posting' and kode_lokasi='"+this.app._lokasi+"'",
											  ["kode_pp","nama"],"and",["Kode","Nama"],false);				
			}
			if (sender == this.cb_akun) {   
			    this.standarLib.showListData(this, "Daftar Akun Piutang",sender,undefined, 
											  "select a.kode_akun, a.nama from masakun a inner join flag_relasi b on a.kode_akun = b.kode_akun and a.kode_lokasi=b.kode_lokasi where a.block= '0' and a.kode_lokasi = '"+this.app._lokasi+"' and b.kode_flag='003' ",
											  "select count(a.kode_akun)  from masakun a inner join flag_relasi b on a.kode_akun = b.kode_akun and a.kode_lokasi=b.kode_lokasi where a.block= '0' and a.kode_lokasi = '"+this.app._lokasi+"' and b.kode_flag='003' ",
											  ["a.kode_akun","a.nama"],"and",["Kode","Nama"],false);
			}
		}catch(e){
			systemAPI.alert(e);
		}
	},
	doRequestReady: function(sender, methodName, result){
		if (sender == this.dbLib)
		{
			try
			{   
				switch(methodName)
	    		{
	    			case "execArraySQL" :	    				
						if (result.toLowerCase().search("error") == -1)					
						{
							this.app._mainForm.pesan(2,"transaksi telah sukses tersimpan (No : "+ this.cb_kode.getText()+")");							
							this.app._mainForm.bClear.click();
						}else system.info(this,result,"");
	    			break;
	      		break;
	    		}    		
			}
			catch(e)
			{
				systemAPI.alert("step : "+step+"; error = "+e);
			}
	    }
	}
});