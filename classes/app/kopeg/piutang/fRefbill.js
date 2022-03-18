window.app_kopeg_piutang_fRefbill = function(owner)
{
	if (owner)
	{
		window.app_kopeg_piutang_fRefbill.prototype.parent.constructor.call(this,owner);
		this.className  = "app_kopeg_piutang_fRefbill";
		this.itemsValue = new portalui_arrayList();
		this.app._mainForm.childFormConfig(this, "mainButtonClick","Referensi Jurnal Piutang Umum : Input/Koreksi", 0);	
		
		uses("portalui_saiCBBL;portalui_saiEdit;portalui_datePicker;portalui_saiTable");
		this.cb_kode = new portalui_saiCBBL(this,{bound:[20,10,200,20],caption:"Kode Transaksi",btnClick:[this,"doBtnClick"],rightLabelVisible:false});
		this.bLoad = new portalui_imageButton(this,{bound:[220,10,22,22],click:[this,"doLoadClick"],hint:"Search",image:"icon/"+system.getThemes()+"/reload.png"});	
		this.e_nama = new portalui_saiLabelEdit(this,{bound:[20,11,400,20],caption:"Nama", maxLength:50});				
		this.cb_pp = new portalui_saiCBBL(this,{bound:[20,12,200,20],caption:"Unit Kerja",btnClick:[this,"doBtnClick"]});
		this.cb_akun = new portalui_saiCBBL(this,{bound:[20,13,200,20],caption:"Akun Piutang",btnClick:[this,"doBtnClick"]});
		this.cb_ppn = new portalui_saiCBBL(this,{bound:[20,14,200,20],caption:"Akun PPN",btnClick:[this,"doBtnClick"]});
		this.cb_pph = new portalui_saiCBBL(this,{bound:[20,15,200,20],caption:"Akun PPh",btnClick:[this,"doBtnClick"]});
		this.p1 = new portalui_panel(this,{bound:[20,30,900,330],caption:"Daftar Item Jurnal Pendapatan"});
		this.sg = new portalui_saiGrid(this.p1,{bound:[0,20,895,285],colCount:9,tag:2,
		            colTitle:["Kode Akun","Nama Akun","Keterangan","DC","Nilai","Kode PP","Nama PP","Kode RKM","Nama RKM"],
					colWidth:[[0,1,2,3,4,5,6,7,8],[80,100,200,50,100,60,100,60,100]],colFormat:[[4],[cfNilai]],
					buttonStyle:[[0,3,5,7],[bsEllips,bsAuto,bsEllips,bsEllips]], 
					picklist:[[3],[new portalui_arrayMap({items:["C"]})]],ellipsClick:[this,"doEllipseClick"],
					columnReadOnly:[true,[1,6,8],[0]],change:[this,"doChangeCell"],autoAppend:true,defaultRow:1});
		this.sgn = new portalui_sgNavigator(this.p1,{bound:[0,305,900,25],buttonStyle:2,grid:this.sg});		
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
						
		}catch(e){
			systemAPI.alert(e);
		}
	}
};
window.app_kopeg_piutang_fRefbill.extend(window.portalui_childForm);
window.app_kopeg_piutang_fRefbill.implement({
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
			if (this.standarLib.checkEmptyByTag(this, [0])){
				try{									
					uses("server_util_arrayList");
					var sql = new server_util_arrayList();
					sql.add("insert into kop_arref_m(kode_ref,nama,kode_pp,akun_ar,akun_ppn,akun_pph,kode_lokasi,tgl_input,nik_user) values "+
						    "	('"+this.cb_kode.getText()+"','"+this.e_nama.getText()+"','"+this.cb_pp.getText()+"','"+this.cb_akun.getText()+"','"+this.cb_ppn.getText()+"','"+this.cb_pph.getText()+"','"+this.app._lokasi+"',now(),'"+this.app._userLog+"')");	
                    for (var i=0; i < this.sg.rows.getLength(); i++){			
						if (this.sg.rowValid(i)){
							sql.add("insert into kop_arref_j (kode_ref,no_urut,kode_akun,keterangan,dc,nilai,kode_pp,kode_drk,kode_lokasi) values "+	
								    "('"+this.cb_kode.getText()+"',"+i+",'"+this.sg.getCell(0,i)+"','"+this.sg.getCell(2,i)+"','"+this.sg.getCell(3,i).toUpperCase()+"',"+parseNilai(this.sg.getCell(4,i))+",'"+this.sg.getCell(5,i)+"','"+this.sg.getCell(7,i)+"','"+this.app._lokasi+"')");
						}
					} 							
					this.dbLib.execArraySQL(sql);
				}
				catch(e)
				{
					system.alert(this, e,"");
				}
			}
		}catch(e){
			systemAPI.alert(e);
		}
	},
	ubah: function(){			
		try{						
			if (this.standarLib.checkEmptyByTag(this, [0]))
			{
				try
				{									
					uses("server_util_arrayList");
					var sql = new server_util_arrayList();
					sql.add("delete from kop_arref_j where kode_ref='"+this.cb_kode.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
					sql.add("update kop_arref_m set kode_pp='"+this.cb_pp.getText()+"',nama='"+this.e_nama.getText()+"',akun_ar='"+this.cb_akun.getText()+"',akun_ppn='"+this.cb_ppn.getText()+"',akun_pph='"+this.cb_pph.getText()+"',tgl_input=now(),nik_user='"+this.app._userLog+"' "+
						    "where kode_ref = '"+this.cb_kode.getText()+"' and kode_lokasi = '"+this.app._lokasi+"'");
					for (var i=0; i < this.sg.rows.getLength(); i++){			
						if (this.sg.rowValid(i)){
							sql.add("insert into kop_arref_j (kode_ref,no_urut,kode_akun,keterangan,dc,nilai,kode_pp,kode_drk,kode_lokasi) values "+	
								    "('"+this.cb_kode.getText()+"',"+i+",'"+this.sg.getCell(0,i)+"','"+this.sg.getCell(2,i)+"','"+this.sg.getCell(3,i).toUpperCase()+"',"+parseNilai(this.sg.getCell(4,i))+",'"+this.sg.getCell(5,i)+"','"+this.sg.getCell(7,i)+"','"+this.app._lokasi+"')");
						}
					}
					this.dbLib.execArraySQL(sql);
				}
				catch(e)
				{
					system.alert(this, e,"");
				}
			}
		}catch(e){
			systemAPI.alert(e);
		}
	},
	hapus: function(){			
		try{						
			if (this.standarLib.checkEmptyByTag(this, [0]))
			{
				try
				{									
					uses("server_util_arrayList");
					var sql = new server_util_arrayList();
					sql.add("delete from kop_arref_m where kode_ref='"+this.cb_kode.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
					sql.add("delete from kop_arref_j where kode_ref='"+this.cb_kode.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
					this.dbLib.execArraySQL(sql);
				}
				catch(e)
				{
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
					this.standarLib.clearByTag(this, new Array("0"),this.cb_kode);
					this.sg.clear(1);
				setTipeButton(tbAllFalse);
				break;
			case "simpan" :	
				this.simpan();
				break;				
			case "simpancek" : this.simpan();			
				break;
			case "ubah" :	
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
				var data = this.dbLib.getDataProvider("select a.nama,a.kode_pp,h.nama  as nama_pp,a.akun_ar,b.nama as nama_ar,a.akun_ppn,c.nama as nama_ppn,a.akun_pph,e.nama as nama_pph, "+
						   "x.kode_akun,y.nama as nama_akun,x.dc,x.keterangan,x.nilai,x.kode_pp,z.nama as nama_pp,x.kode_drk,ifnull(zz.nama,'-') as nama_drk "+
				           "from kop_arref_m a inner join masakun b on a.akun_ar=b.kode_akun and a.kode_lokasi=b.kode_lokasi "+
						   "                  inner join masakun c on a.akun_ppn=c.kode_akun and a.kode_lokasi=c.kode_lokasi "+
						   "                  inner join masakun e on a.akun_pph=e.kode_akun and a.kode_lokasi=e.kode_lokasi "+
						   "	              inner join pp h on a.kode_pp=h.kode_pp and a.kode_lokasi=h.kode_lokasi "+
						   "	              inner join kop_arref_j x on a.kode_ref=x.kode_ref and a.kode_lokasi=x.kode_lokasi "+
						   "                  inner join masakun y on x.kode_akun=y.kode_akun and x.kode_lokasi=y.kode_lokasi "+
						   "	              inner join pp z on x.kode_pp=z.kode_pp and x.kode_lokasi=z.kode_lokasi "+
						   "                  left outer join drk zz on x.kode_drk=zz.kode_drk and x.kode_lokasi=zz.kode_lokasi and zz.tahun=substring('"+this.app._periode+"',1,4) "+
					       " where a.kode_lokasi = '"+this.app._lokasi+"' and a.kode_ref ='"+this.cb_kode.getText()+"'");
				eval("data = "+data+";");				
				if (typeof data == "object" && data.rs.rows[0] != undefined){
					var line;
					this.sg.clear();
					for (var i in data.rs.rows){
						line = data.rs.rows[i];							
						this.sg.appendData([line.kode_akun,line.nama_akun,line.keterangan,line.dc.toUpperCase(),floatToNilai(line.nilai),line.kode_pp,line.nama_pp,line.kode_drk,line.nama_drk]);
					}
					this.e_nama.setText(line.nama);
					this.cb_pp.setText(line.kode_pp,line.nama_pp);
					this.cb_akun.setText(line.akun_ar,line.nama_ar);
					this.cb_ppn.setText(line.akun_ppn,line.nama_ppn);
					this.cb_pph.setText(line.akun_pph,line.nama_pph);
					setTipeButton(tbUbahHapus);					
				}
				else{
					setTipeButton(tbSimpan);
				}
			}
		}catch(e){
			systemAPI.alert(e);
		}
	},
	doBtnClick: function(sender, event){
		try{
			if (sender == this.cb_pp) {   
			    this.standarLib.showListData(this, "Daftar PP/Unit Kerja",sender,undefined, 
											  "select kode_pp, nama  from pp where kode_lokasi='"+this.app._lokasi+"' and tipe='posting'",
											  "select count(kode_pp) from pp where kode_lokasi='"+this.app._lokasi+"' and tipe='posting'",
											  ["kode_pp","nama"],"and",["Kode PP","Nama"],false);				
			}
			if (sender == this.cb_kode) {   
			    this.standarLib.showListData(this, "Daftar Referensi Piutang",sender,undefined, 
											  "select kode_ref, nama  from kop_arref_m where kode_lokasi='"+this.app._lokasi+"'",
											  "select count(kode_ref) from kop_arref_m where kode_lokasi='"+this.app._lokasi+"'",
											  ["kode_ref","nama"],"and",["Kode Ref","Nama"],false);				
			}
			if (sender == this.cb_akun) {   
			    this.standarLib.showListData(this, "Daftar Akun Piutang",sender,undefined, 
											  "select a.kode_akun, a.nama from masakun a inner join flag_relasi b on a.kode_akun = b.kode_akun and a.kode_lokasi=b.kode_lokasi where a.block= '0' and a.kode_lokasi = '"+this.app._lokasi+"' and b.kode_flag='003' ",
											  "select count(a.kode_akun)  from masakun a inner join flag_relasi b on a.kode_akun = b.kode_akun and a.kode_lokasi=b.kode_lokasi where a.block= '0' and a.kode_lokasi = '"+this.app._lokasi+"' and b.kode_flag='003' ",
											  ["kode_akun","nama"],"and",["Kode Akun","Nama Akun"],false);				
			}
			if (sender == this.cb_ppn) {   
			    this.standarLib.showListData(this, "Daftar Akun PPN",sender,undefined, 
											  "select a.kode_akun, a.nama from masakun a inner join flag_relasi b on a.kode_akun = b.kode_akun and a.kode_lokasi=b.kode_lokasi where a.block= '0' and a.kode_lokasi = '"+this.app._lokasi+"' and b.kode_flag='021' ",
											  "select count(a.kode_akun)  from masakun a inner join flag_relasi b on a.kode_akun = b.kode_akun and a.kode_lokasi=b.kode_lokasi where a.block= '0' and a.kode_lokasi = '"+this.app._lokasi+"' and b.kode_flag='021' ",
											  ["kode_akun","nama"],"and",["Kode Akun","Nama Akun"],false);				
			}
			if (sender == this.cb_pph) {   
			    this.standarLib.showListData(this, "Daftar Akun PPh",sender,undefined, 
											  "select a.kode_akun, a.nama from masakun a inner join flag_relasi b on a.kode_akun = b.kode_akun and a.kode_lokasi=b.kode_lokasi where a.block= '0' and a.kode_lokasi = '"+this.app._lokasi+"' and b.kode_flag='015'",
											  "select count(a.kode_akun)  from masakun a inner join flag_relasi b on a.kode_akun = b.kode_akun and a.kode_lokasi=b.kode_lokasi where a.block= '0' and a.kode_lokasi = '"+this.app._lokasi+"' and b.kode_flag='015'",
											  ["kode_akun","nama"],"and",["Kode Akun","Nama Akun"],false);				
			}
		}catch(e){
			systemAPI.alert(e);
		}
	},
	doEllipseClick: function(sender, col, row){
		try{			
			if (sender == this.sg) {
				if (col == 0){
					this.standarLib.showListData(this, "Daftar Akun Pendapatan",sender,undefined, 
												  "select a.kode_akun, a.nama from masakun a inner join flag_relasi b on a.kode_akun = b.kode_akun and a.kode_lokasi=b.kode_lokasi where a.block= '0' and a.kode_lokasi = '"+this.app._lokasi+"' and b.kode_flag='022'",
												  "select count(a.kode_akun)  from masakun a inner join flag_relasi b on a.kode_akun = b.kode_akun and a.kode_lokasi=b.kode_lokasi where a.block= '0' and a.kode_lokasi = '"+this.app._lokasi+"' and b.kode_flag='022'",
												  ["a.kode_akun","a.nama"],"and",["Kode","Nama"],false);				
				}
				if (col == 5){
					this.standarLib.showListData(this, "Daftar PP/Unit",sender,undefined, 
												  "select kode_pp, nama  from pp where kode_lokasi = '"+this.app._lokasi+"' and tipe='posting'",
												  "select count(kode_pp) from pp where kode_lokasi = '"+this.app._lokasi+"' and tipe='posting'",
												  ["kode_pp","nama"],"and",["Kode","Nama"],false);				
				}
				if (col == 7){
					this.standarLib.showListData(this, "Daftar Anggaran",sender,undefined, 
													  "select distinct a.kode_drk, a.nama from drk a inner join anggaran_d b on a.kode_drk=b.kode_drk where a.tahun=substring(b.periode,1,4) and b.periode like '"+this.app._periode.substr(0,4)+"%' and b.kode_pp = '"+this.sg.getCell(5,row)+"' and b.kode_akun='"+this.sg.getCell(0,row)+"' and a.kode_lokasi='"+this.app._lokasi+"'",
													  "select count(distinct a.kode_drk)  from drk a inner join anggaran_d b on a.kode_drk=b.kode_drk where a.tahun=substring(b.periode,1,4) and b.periode like '"+this.app._periode.substr(0,4)+"%' and b.kode_pp = '"+this.sg.getCell(5,row)+"' and b.kode_akun='"+this.sg.getCell(0,row)+"' and a.kode_lokasi='"+this.app._lokasi+"'",
													  new Array("a.kode_drk","a.nama"),"and",new Array("Kode Anggaran","Deskripsi"),true);
				}
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
							this.app._mainForm.pesan(2,"transaksi telah sukses tersimpan (Kode : "+ this.cb_kode.getText()+")");							
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