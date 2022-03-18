window.app_saku_logistik_transaksi_fFrBanyak = function(owner)
{
	if (owner)
	{
		window.app_saku_logistik_transaksi_fFrBanyak.prototype.parent.constructor.call(this,owner);
		this.className  = "app_saku_logistik_transaksi_fFrBanyak";
		this.maximize();
		this.itemsValue = new portalui_arrayList();	
		this.app._mainForm.childFormConfig(this, "mainButtonClick","Form Data Final Receive Non PO: Input",0);
		
		uses("portalui_datePicker;util_standar;util_addOnLib");	
		this.ed_period = new portalui_saiLabelEdit(this,{bound:[20,1,182,20],caption:"Periode",readOnly:true});
		this.lbltgl1 = new portalui_label(this,{bound:[20,2,101,18],caption:"Tanggal",underline:true});		
		this.dp_tgl1 = new portalui_datePicker(this,{bound:[120,2,82,18]});
		this.ed_nb = new portalui_saiLabelEdit(this,{bound:[20,4,220,20],caption:"Format No Asset",readOnly:true});
		this.bGen = new portalui_button(this,{bound:[246,4,80,20],caption:"Gen",icon:"url(icon/"+system.getThemes()+"/process.png)"});
		this.ed_jml = new portalui_saiLabelEdit(this,{bound:[350,4,170,20],caption:"Jumlah Asset",tipeText:ttNilai,text:"0"});				
		this.ed_barcode = new portalui_saiLabelEdit(this,{bound:[20,5,220,20],caption:"No Inventori",maxLength:50});				
		this.ed_nama = new portalui_saiLabelEdit(this,{bound:[20,6,500,20],caption:"Deskripsi"});
		this.cb_curr = new portalui_saiCBBL(this,{bound:[20,7,185,20],caption:"Currenct - Kurs",readOnly:true,rightLabelVisible:false,tag:2});
		this.ed_kurs = new portalui_saiLabelEdit(this,{bound:[210,7,50,20],caption:"",labelWidth:0,tipeText:ttNilai, alignment:alRight,tag:2, readOnly:true});
		this.cb_pp = new portalui_saiCBBL(this,{bound:[20,8,185,20],caption:"PP"});
		this.cb_klpfa = new portalui_saiCBBL(this,{bound:[20,9,185,20],caption:"Kelompok Asset"});		
		this.cb_klpakun = new portalui_saiCBBL(this,{bound:[20,10,185,20],caption:"Kelompok Akun"});
		this.cb_lokfa = new portalui_saiCBBL(this,{bound:[20,11,185,20],caption:"Lokasi Asset"});
		this.cb_pnj = new portalui_saiCBBL(this,{bound:[20,12,185,20],caption:"Penanggung Jawab"});				
		this.cb_brg = new portalui_saiCBBL(this,{bound:[20,13,185,20],caption:"Barang"});
		this.cb_kondisi = new portalui_saiCBBL(this,{bound:[20,14,185,20],caption:"Kondisi",tag:2});
		this.lbltgl2 = new portalui_label(this,{bound:[20,15,101,18],caption:"Tgl Awal Susut", underline:true});
		this.dp_tgl2 = new portalui_datePicker(this,{bound:[120,15,82,18]});
		this.ed_nilai = new portalui_saiLabelEdit(this,{bound:[20,16,200,20],caption:"Nilai Assets",tipeText:ttNilai, alignment:alRight});
		this.ed_residu = new portalui_saiLabelEdit(this,{bound:[20,17,200,20],caption:"Nilai Residu",tipeText:ttNilai, alignment:alRight,text:"1"});
		this.ed_akun = new portalui_saiLabelEdit(this,{bound:[520,17,200,20],caption:"Kode Akun",readOnly:true});
		this.ed_merk = new portalui_saiLabelEdit(this,{bound:[20,18,370,20],caption:"Merk"});
		this.ed_umur = new portalui_saiLabelEdit(this,{bound:[520,18,200,20],caption:"Umur Asset",tipeText:ttNilai, alignment:alRight,text:"1",readOnly:true});
		this.ed_tipe = new portalui_saiLabelEdit(this,{bound:[20,19,370,20],caption:"Tipe"});
		this.ed_persen = new portalui_saiLabelEdit(this,{bound:[520,19,200,20],caption:"% Penyusutan",tipeText:ttNilai, alignment:alRight,text:"1",readOnly:true});
		this.ed_seri = new portalui_saiLabelEdit(this,{bound:[20,20,370,20],caption:"No Seri"});
		this.ed_jenis = new portalui_saiLabelEdit(this,{bound:[520,20,200,20],caption:"Jenis", readOnly:true});
		this.rearrangeChild(10,23);
		setTipeButton(tbSimpan);
		this.setTabChildIndex();
		try
		{
			this.dbLib = new util_dbLib();
		    this.dbLib.addListener(this);
			this.standarLib = new util_standar();			
		    this.addOnLib = new util_addOnLib();
			
			this.bGen.onClick.set(this, "genClick");
			this.ed_period.onChange.set(this, "doEditChange");
			this.dp_tgl1.onSelect.set(this,"doSelect");
			this.cb_curr.onBtnClick.set(this, "FindBtnClick");
			this.cb_pp.onBtnClick.set(this, "FindBtnClick");
			this.cb_klpfa.onBtnClick.set(this, "FindBtnClick");
			this.cb_klpakun.onBtnClick.set(this, "FindBtnClick");
			this.cb_klpakun.onChange.set(this, "doEditChange");
			this.cb_lokfa.onBtnClick.set(this, "FindBtnClick");
			this.cb_pnj.onBtnClick.set(this, "FindBtnClick");
			this.cb_kondisi.onBtnClick.set(this, "FindBtnClick");
			this.cb_brg.onBtnClick.set(this, "FindBtnClick");
			this.cb_brg.onChange.set(this, "doEditChange");															
			
			this.cb_pp.setSQL("select kode_pp,nama   from pp where kode_lokasi='"+this.app._lokasi+"' and tipe= 'posting'",["kode_pp","nama"]);
			this.cb_brg.setSQL("select kode_brg,nama   from barang_m where kode_lokasi = '"+this.app._lokasi+"'",["kode_brg","nama"]);
			this.cb_pnj.setSQL("select nik,nama   from karyawan where kode_lokasi='"+this.app._lokasi+"'",["nik","nama"]);
			this.cb_kondisi.setSQL("select kode_status,nama   from fa_status where jenis = 'S'",["kode_status","nama"]);
			this.cb_lokfa.setSQL("select kode_lokfa,nama   from fa_lokasi where kode_lokasi='"+this.app._lokasi+"' and tipe='posting'",["kode_lokfa","nama"]);
			this.cb_klpakun.setSQL("select kode_klpakun,nama   from fa_klpakun where kode_lokasi='"+this.app._lokasi+"'",["kode_klpakun","nama"]);
			this.cb_klpfa.setSQL("select kode_klpfa,nama   from fa_klp where kode_lokasi='"+this.app._lokasi+"' and tipe='posting'",["kode_klpfa","nama"]);
			this.cb_curr.setSQL("select kode_curr,nama   from curr",["kode_curr","nama"]);
			
			this.standarLib.clearByTag(this, new Array("0","1","2"),this.dp_tgl1);
			this.doSelect(this.dp_tgl1,this.dp_tgl1.year,this.dp_tgl1.month,this.dp_tgl1.day);
			this.cb_curr.setText("IDR"); this.ed_kurs.setText("1");
			
			var line,data = this.dbLib.runSQL("select a.kode_status,a.nama from fa_status a inner join spro b on a.kode_status=b.flag where b.kode_spro = 'KDSBAIK' and b.kode_lokasi = '"+this.app._lokasi+"'");
			if (data instanceof portalui_arrayMap)
			{
				line = data.get(0);
				if (line != undefined)
				{
					this.cb_kondisi.setText(line.get("kode_status"));
					this.cb_kondisi.setRightLabelCaption(line.get("nama"));
				} 
			}			
		}catch(e)
		{
			alert(e);
		}
	}
};
window.app_saku_logistik_transaksi_fFrBanyak.extend(window.portalui_childForm);
window.app_saku_logistik_transaksi_fFrBanyak.implement({
	mainButtonClick : function(sender){
		if (sender == this.app._mainForm.bClear)
			system.confirm(this, "clear", "screen akan dibersihkan?","form inputan ini akan dibersihkan");	
		else if (sender == this.app._mainForm.bSimpan)
			system.confirm(this, "simpan", "Apa data sudah benar?","data diform ini apa sudah benar.");
		else if (sender == this.app._mainForm.bEdit)
			system.confirm(this, "ubah", "Apa perubahan data sudah benar?","perubahan data diform ini akan disimpan.");
		else if (sender == this.app._mainForm.bHapus)
			system.confirm(this, "hapus", "Yakin data akan dihapus?","data yang sudah disimpan tidak bisa di<i>retrieve</i> lagi.");	
	},
	simpan: function(){	
		this.bGen.click();
		if (this.standarLib.checkEmptyByTag(this, new Array("0","1","2")))
		{
			try
			{
				var tgl = new Date();
				uses("server_util_arrayList");
				sql = new server_util_arrayList();
				
				var month = this.dp_tgl2.month;
				if (month < 10) month = "0"+ month;
				var psusut = this.dp_tgl2.year + "" + month;
				var script1 = "", script2="", nb = this.ed_nb.getText();
				var nu,format = this.app._lokasi+"-AS"+this.ed_period.getText().substr(2,4)+".";
				for (var i = 0; i < parseInt(this.ed_jml.getText());i++){
					if (i > 0) {script1 += ",", script2+= ",";}
					script1 += "('"+
								nb+"','"+this.ed_barcode.getText()+"','"+this.app._lokasi+"','"+this.cb_pp.getText()+"','"+this.cb_klpfa.getText()+"','"+this.cb_klpakun.getText()+"','"+this.cb_lokfa.getText()+"','"+
								this.cb_pnj.getText()+"','"+this.cb_brg.getText()+"','"+
								this.ed_nama.getText()+"','"+this.cb_curr.getText()+"',"+parseNilai(this.ed_kurs.getText())+","+parseNilai(this.ed_nilai.getText())+","+
								parseNilai(this.ed_residu.getText())+",'-','-','0','"+this.dp_tgl1.getDate()+"','"+this.ed_period.getText()+"','"+this.dp_tgl2.getDate()+"','"+
								this.app._userLog+"',now(),"+parseNilai(this.ed_umur.getText())+","+parseNilai(this.ed_persen.getText())+",'"+psusut+"','"+this.ed_merk.getText()+"','"+
								this.ed_tipe.getText()+"','"+this.ed_seri.getText()+"','"+this.cb_kondisi.getText()+"','"+this.ed_akun.getText()+"','"+this.ed_jenis.getText()+"')";
					script2 += "('NONPO','"+nb+"',1,'"+this.ed_barcode.getText()+"','-','"+this.app._lokasi+"')";
					nu = parseInt(nb.substring(format.length),10);										
					nu++;
					nb = format;
					for (var c=nu.toString().length; c <= 3;c++){
						nb+="0";
					}
					nb += nu;					
				}
				sql.add("insert into fa_asset(no_fa,barcode,kode_lokasi,kode_pp,kode_klpfa,kode_klpakun,kode_lokfa,nik_pnj,kode_brg,nama,kode_curr,kurs,nilai,nilai_residu,kode_drk,catatan,"+
					    "                     progress,tgl_perolehan,periode,tgl_susut,nik_user,tgl_input,umur,persen,periode_susut,merk,tipe,no_seri,kode_status,kode_akun,jenis) values "+script1);
				sql.add("insert into fa_d (no_fr,no_fa,no_urut,barcode,no_tag,kode_lokasi) values  "+script2);
				this.dbLib.execArraySQL(sql);	
			}
			catch(e)
			{
				system.alert(this, e,"");
			}
		}
	},
	doModalResult: function(event, modalResult){
		if (modalResult != mrOk) return false;
		
		switch (event)
		{
			case "clear" :
				if (modalResult == mrOk)
				{
					this.standarLib.clearByTag(this, new Array("0","1"),this.dp_tgl1);	
					this.doSelect(this.dp_tgl1,this.dp_tgl1.year,this.dp_tgl1.month,this.dp_tgl1.day);
					this.cb_curr.setText("IDR"); this.ed_kurs.setText("1");
				}
				break;
			
			case "simpan" :	
				if (nilaiToFloat(this.ed_jml.getText()) <= 0){
					system.alert(this,"Jumlah Asset tidak valid.","Jumlah tidak boleh kurang dari atau sama dengan nol.");
					return false;
				}
				if (nilaiToFloat(this.ed_nilai.getText()) < nilaiToFloat(this.ed_residu.getText()))
				{
					system.alert(this,"Nilai tidak valid.","Nilai asset kurang dari nilai residu.");
					return false;
				}
				if (parseFloat(this.app._periode) > parseFloat(this.ed_period.getText()))
				{
					system.alert(this,"Periode transaksi tidak valid.","Periode transaksi tidak boleh kurang dari periode aktif sistem.["+this.app._periode+"]");
					return false;
				}
				if ( (new Date()).strToDate(this.dp_tgl1.getDate())  > (new Date()).strToDate(this.dp_tgl2.getDate()))
				{
					system.alert(this,"Tanggal awal penyusutan tidak valid.","Tanggal awal susut kurang dari tanggal transaksi.");
					return false;
				}
				if (parseFloat(this.app._periode) < parseFloat(this.ed_period.getText())) 
				{
					if (this.app._pernext == "1")
					  system.confirm(this, "simpancek", "Periode transaksi melebihi periode aktif sistem.["+this.app._periode+"]","Data akan disimpan?");
					else
					{
						system.alert(this,"Periode transaksi tidak valid.","Periode transaksi tidak boleh melebihi periode aktif sistem.["+this.app._periode+"]");
						return false;
					}
				}		
				else this.simpan();
				break;
				
			case "simpancek" : this.simpan();			
				break;
				
		}
	},
	genClick: function(sender){
		try
		{
			if (this.ed_period.getText() != "")
			{
				this.ed_nb.setText(this.standarLib.noBuktiOtomatis(this.dbLib,'fa_asset','no_fa',this.app._lokasi+"-AS"+this.ed_period.getText().substr(2,4)+".",'0000'));
				this.ed_barcode.setFocus();
			}
			else
			{
				system.alert(this,"Periode harus valid.","");			
			}
		}
		catch (e)
		{
			alert(e);
		}
	},
	doSelect: function(sender, year, month, day){
		if (month < 10)
			month = "0"+month;
		this.ed_period.setText(year.toString()+month);
		this.dp_tgl2.setText(this.dp_tgl1.getText());
	},
	doEditChange: function(sender){
		if (sender == this.ed_period)
		{
			this.ed_nb.setText("");
			//if (this.ed_period.getText() != "") this.bGen.click();
		}
		if (sender == this.cb_klpakun)
		{
			this.ed_umur.setText("0");
			this.ed_persen.setText("0");
			var line,data = this.dbLib.runSQL(" select kode_akun,umur,persen from fa_klpakun "+
											  " where kode_lokasi='"+this.app._lokasi+"' and kode_klpakun='"+this.cb_klpakun.getText()+"'");
			if (data instanceof portalui_arrayMap)
			{
				line = data.get(0);
				if (line != undefined)
				{
					this.ed_akun.setText(line.get("kode_akun"));
					this.ed_umur.setText(floatToNilai(parseFloat(line.get("umur"))));
					this.ed_persen.setText(floatToNilai(parseFloat(line.get("persen"))));
				} 
			}
		}
		if (sender == this.cb_brg)
		{
			this.ed_jenis.setText("");
			var line,data = this.dbLib.runSQL(" select a.jenis from barang_klp a inner join barang_m b on a.kode_klpbrg = b.kode_klpbrg and a.kode_lokasi=b.kode_lokasi "+
											  " where a.kode_lokasi='"+this.app._lokasi+"' and b.kode_brg='"+this.cb_brg.getText()+"'");
			if (data instanceof portalui_arrayMap)
			{
				line = data.get(0);
				if (line != undefined)
				{
					this.ed_jenis.setText(line.get("jenis"));
				} 
			}
		}
	},
	FindBtnClick: function(sender, event){
		try
		{
			if (sender == this.cb_brg) 
			{   
				this.standarLib.showListData(this, "Daftar Barang",sender,undefined, 
											  "select kode_brg,nama   from barang_m where kode_lokasi = '"+this.app._lokasi+"'",
											  "select count(kode_brg) from barang_m where kode_lokasi = '"+this.app._lokasi+"'",
											  new Array("kode_brg","nama"),"and",new Array("Kode Barang","Nama Barang"),false);
			}			
			if (sender == this.cb_kondisi) 
			{   
				this.standarLib.showListData(this, "Daftar Status Kondisi",this.cb_kondisi,undefined, 
											  "select kode_status,nama   from fa_status where jenis = 'S'",
											  "select count(kode_status) from fa_status where jenis = 'S'",
											  new Array("kode_status","nama"),"and",new Array("Kode","Deskripsi"),false);
			}
			if (sender == this.cb_pnj) 
			{   
				this.standarLib.showListData(this, "Daftar Karyawan Penanggung Jawab",this.cb_pnj,undefined, 
											  "select nik,nama   from karyawan where kode_lokasi='"+this.app._lokasi+"'",
											  "select count(nik) from karyawan where kode_lokasi='"+this.app._lokasi+"'",
											  new Array("nik","nama"),"and",new Array("NIK","Nama"),false);
			}
			if (sender == this.cb_lokfa) 
			{   
				this.standarLib.showListData(this, "Daftar Lokasi Asset",this.cb_lokfa,undefined, 
											  "select kode_lokfa,nama   from fa_lokasi where kode_lokasi='"+this.app._lokasi+"' and tipe='posting'",
											  "select count(kode_lokfa) from fa_lokasi where kode_lokasi='"+this.app._lokasi+"' and tipe='posting'",
											  new Array("kode_lokfa","nama"),"and",new Array("Kode Lokasi Asset","Deskripsi"),false);
			}
			if (sender == this.cb_klpakun) 
			{   
				this.standarLib.showListData(this, "Daftar Kelompok Akun Asset",this.cb_klpakun,undefined, 
											  "select kode_klpakun,nama   from fa_klpakun where kode_lokasi='"+this.app._lokasi+"'",
											  "select count(kode_klpakun) from fa_klpakun where kode_lokasi='"+this.app._lokasi+"'",
											  new Array("kode_klpakun","nama"),"and",new Array("Kode Klp Akun Asset","Deskripsi"),false);
			}
			if (sender == this.cb_klpfa) 
			{   
				this.standarLib.showListData(this, "Daftar Kelompok Asset",this.cb_klpfa,undefined, 
											  "select kode_klpfa,nama   from fa_klp where kode_lokasi='"+this.app._lokasi+"' and tipe='posting'",
											  "select count(kode_klpfa) from fa_klp where kode_lokasi='"+this.app._lokasi+"' and tipe='posting'",
											  new Array("kode_klpfa","nama"),"and",new Array("Kode Klp Asset","Deskripsi"),false);
			}
			if (sender == this.cb_curr) 
			{   
				this.standarLib.showListData(this, "Daftar Currency",this.cb_curr,undefined, 
											  "select kode_curr,nama   from curr",
											  "select count(kode_curr) from curr",
											  new Array("kode_curr","nama"),"and",new Array("Kode Curr","Deskripsi"),false);
			}
			if (sender == this.cb_pp) 
			{   
				this.standarLib.showListData(this, "Daftar PP",this.cb_pp,undefined, 
											  "select kode_pp,nama   from pp where kode_lokasi='"+this.app._lokasi+"' and tipe= 'posting'",
											  "select count(kode_pp) from pp where kode_lokasi='"+this.app._lokasi+"' and tipe= 'posting'",
											  new Array("kode_pp","nama"),"and",new Array("Kode PP","Deskripsi"),false);
			}			
		}
		catch(e)
		{
			alert(e);
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
						step="info";
					if (result.toLowerCase().search("error") == -1)					
					{
						this.app._mainForm.pesan(2,"transaksi telah sukses tersimpan (no bukti : "+ this.ed_nb.getText()+")");
						this.app._mainForm.bClear.click();              
					}else system.info(this,result,"");
					break;
				break;
				}    		
			}
			catch(e)
			{
				alert("step : "+step+"; error = "+e);
			}
		}
	}
});
