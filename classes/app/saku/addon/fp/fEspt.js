window.app_saku_addon_fp_fEspt = function(owner)
{
	if (owner)
	{
		window.app_saku_addon_fp_fEspt.prototype.parent.constructor.call(this,owner);
		this.className  = "app_saku_addon_fp_fEspt";
		this.itemsValue = new portalui_arrayList();
		this.app._mainForm.childFormConfig(this, "mainButtonClick","Form Upload ke eSPT", 0);	
		
		uses("portalui_saiCBBL;portalui_saiEdit;portalui_datePicker;portalui_saiGrid");
		this.e_periode = new portalui_saiLabelEdit(this,{bound:[20,10,200,20],caption:"Periode",readOnly:true,tag:5});
		this.l_tgl = new portalui_label(this,{bound:[20,11,100,18],caption:"Tanggal", underline:true});
		this.dp_d1 = new portalui_datePicker(this,{bound:[120,11,100,18],selectDate:[this,"doSelectDate"],date:new Date().getDateStr()});
		this.e_nb = new portalui_saiLabelEdit(this,{bound:[20,13,250,20],caption:"No. eSPT",maxLength:30,readOnly:true});
		this.b_gen = new portalui_button(this,{bound:[280,13,80,18],caption:"Gen",click:[this,"doClick"],icon:"icon/"+system.getThemes()+"/process.png"});
		this.e_dok = new portalui_saiLabelEdit(this,{bound:[20,14,343,20],caption:"No Dokumen", maxLength:100});
		this.e_desc = new portalui_saiLabelEdit(this,{bound:[20,15,343,20],caption:"Keterangan", maxLength:150});
		this.cb_buat = new portalui_saiCBBL(this,{bound:[20,16,200,20],caption:"Dibuat Oleh",btnClick:[this,"doBtnClick"],tag:2});
		this.cb_app = new portalui_saiCBBL(this,{bound:[20,17,200,20],caption:"Disetujui Oleh",btnClick:[this,"doBtnClick"],tag:2});
		this.bTampil = new portalui_button(this,{bound:[840,17,80,18],caption:"Load",click:[this,"doTampilClick"]});
		
		this.p1 = new portalui_panel(this,{bound:[20,30,900,320],caption:"Daftar Faktur Pajak"});
		this.sg = new portalui_saiGrid(this.p1,{bound:[0,20,895,295],colCount:17,tag:9,
					colTitle:["Kode Pajak","Kode Transaksi","Kode Status","Kode Dokumen","NPWP Lawan Transaksi","Nama Lawan Transaksi","Kode Cabang","Digit Tahun/Kode Faktur","Nomor Seri FP/PEB/PIB","Tanggal Faktur","Tanggal SSP","Masa Pajak","Tahun Pajak","Pembetulan","DPP","PPN","PPnBM"],
					colWidth:[[0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16],[100,100,100,100,150,150,100,150,150,100,100,100,100,100,100,100,100]],
					readOnly:true,defaultRow:1});
					
		this.rearrangeChild(10, 22);
		setTipeButton(tbSimpan);
		this.maximize();		
		this.setTabChildIndex();
		
		try{			
			this.dbLib = new util_dbLib();
			this.dbLib.addListener(this);
			uses("util_standar");
			this.standarLib = new util_standar();
		}catch(e){
			systemAPI.alert(e);
		}
	}
};
window.app_saku_addon_fp_fEspt.extend(window.portalui_childForm);
window.app_saku_addon_fp_fEspt.implement({
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
			if (this.standarLib.checkEmptyByTag(this, [0,1,2,9])){
				try{
					uses("server_util_arrayList");
					var sql = new server_util_arrayList();	
					sql.add("insert into fp_espt (no_espt,no_dokumen,nik_buat,keterangan,tanggal,periode,kode_lokasi,nik_app,nik_user,tgl_input) values "+
							"('"+this.e_nb.getText()+"','"+this.e_dok.getText()+"','"+this.cb_buat.getText()+"','"+this.e_desc.getText()+"','"+this.dp_d1.getDateString()+"','"+this.e_periode.getText()+"','"+this.app._lokasi+"','"+this.cb_app.getText()+"','"+this.app._userLog+"',now())");
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
					this.standarLib.clearByTag(this, new Array("0","1","2","9"),this.e_nb);		
					this.sg.clear(1);
				}
			break;
			case "simpan" :
				this.simpan();
			break;
			case "simpancek" : this.simpan();			
			break;
		}
	},
	doClick:function(sender){
		this.e_nb.setText(this.standarLib.noBuktiOtomatis(this.dbLib,'fp_espt','no_espt',this.app._lokasi+"-ESPT"+this.e_periode.getText().substr(2,4)+".",'000'));
		this.e_dok.setFocus();
	},
	doTampilClick: function(sender){
		try{
			var data = this.dbLib.getDataProvider("select b.npwp,b.nama as nmcust, "+
						"date_format(a.tanggal,'%y') as digitthn,a.no_faktur,date_format(a.tanggal,'%d/%m/%Y') as tglfaktur, "+
						"month(a.tanggal) as masapjk,date_format(a.tanggal,'%Y') as thnpjk,a.nilai_dpp,a.nilai_ppn "+
						"from fp_invoice a inner join cust b on a.kode_cust=b.kode_cust and a.kode_lokasi=b.kode_lokasi "+
						"where a.kode_lokasi='"+this.app._lokasi+"' and a.periode='"+this.e_periode.getText()+"' ");
			eval("data = "+data+";");
			if (typeof data == "object"){
				var line;
				this.sg.clear();
				for (var i in data.rs.rows){
					line = data.rs.rows[i];
					this.sg.appendData(["A","2","1","1",line.npwp,line.nmcust,"000",
									line.digitthn,line.no_faktur,line.tglfaktur,"-",
									line.masapjk,line.thnpjk,"0",line.nilai_dpp,line.nilai_ppn,"0"]);
				}
				this.sg.validasi();
			}
		}catch(e){
			systemAPI.alert(e);
		}
	},
	doBtnClick: function(sender, event){
		try{
			if (sender === this.cb_buat) {   
			    this.standarLib.showListData(this, "Daftar Karyawan",sender,undefined, 
											  "select nik, nama  from karyawan where kode_lokasi='"+this.app._lokasi+"'",
											  "select count(nik) from karyawan where kode_lokasi='"+this.app._lokasi+"'",
											  ["nik","nama"],"and",["NIK","Nama"],false);
			}
			if (sender === this.cb_app) {   
			    this.standarLib.showListData(this, "Daftar Karyawan",sender,undefined, 
											  "select nik, nama  from karyawan where kode_lokasi='"+this.app._lokasi+"'",
											  "select count(nik) from karyawan where kode_lokasi='"+this.app._lokasi+"'",
											  ["nik","nama"],"and",["NIK","Nama"],false);				
			}
		}catch(e){
			systemAPI.alert(e);
		}
	},
	doSelectDate: function(sender, y,m,d){
		if (m < 10) m = "0" + m;			
		this.e_periode.setText(y+""+m);
		this.e_nb.setText("");
	},
	doRequestReady: function(sender, methodName, result){
		if (sender == this.dbLib){
			try{   
				switch(methodName){
	    			case "execArraySQL" :	    				
						if (result.toLowerCase().search("error") == -1){
							window.open(download(this.sg.gridToHTML(),"xls"));
							this.app._mainForm.pesan(2,"transaksi telah sukses tersimpan (No : "+ this.e_nb.getText()+")");							
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