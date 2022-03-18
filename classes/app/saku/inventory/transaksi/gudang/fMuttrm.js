window.app_saku_inventory_transaksi_gudang_fMuttrm = function(owner)
{
	if (owner)
	{
		window.app_saku_inventory_transaksi_gudang_fMuttrm.prototype.parent.constructor.call(this,owner);
		this.className  = "app_saku_inventory_transaksi_gudang_fMuttrm";
		this.itemsValue = new portalui_arrayList();
		this.app._mainForm.childFormConfig(this, "mainButtonClick","Form Mutasi Terima: Input", 0);	
		
		uses("portalui_saiCBB;portalui_saiCBBL;portalui_saiEdit;portalui_datePicker;portalui_saiGrid;portalui_sgNavigator");
		this.e_periode = new portalui_saiLabelEdit(this,{bound:[20,10,200,20],caption:"Periode",readOnly:true,tag:2});
		this.l_tgl = new portalui_label(this,{bound:[20,11,100,18],caption:"Tanggal", underline:true});
		this.dp_d1 = new portalui_datePicker(this,{bound:[120,11,100,18],selectDate:[this,"doSelectDate"],date:new Date().getDateStr()});
		this.e_nb = new portalui_saiLabelEdit(this,{bound:[20,12,250,20],caption:"No Bukti",maxLength:30,readOnly:true});
		this.b_gen = new portalui_button(this,{bound:[280,12,80,18],caption:"Gen",click:[this,"doClick"],icon:"icon/"+system.getThemes()+"/process.png"});		
		this.e_dok = new portalui_saiLabelEdit(this,{bound:[20,13,343,20],caption:"No Dokumen", maxLength:100});				
		this.e_desc = new portalui_saiLabelEdit(this,{bound:[20,14,503,20],caption:"Keterangan", maxLength:150});				
		this.cb_kirim = new portalui_saiCBB(this,{bound:[20,20,270,20],caption:"No Kirim",readOnly:true,btnClick:[this,"doBtnClick"],btnRefreshClick:[this,"doLoadData"]});		
		this.cb_gudang = new portalui_saiCBBL(this,{bound:[20,15,200,20],caption:"Gudang Asal",readOnly: true});				
		this.cb_gudang2 = new portalui_saiCBBL(this,{bound:[20,16,200,20],caption:"Gudang Tujuan", readOnly: true});				
		this.cb_vend = new portalui_saiCBBL(this,{bound:[20,17,200,20],caption:"Forwarder",readOnly: true});				
		this.cb_app = new portalui_saiCBBL(this,{bound:[20,18,200,20],caption:"Penerima",btnClick:[this,"doBtnClick"],tag:2});				
		
		this.p1 = new portalui_panel(this,{bound:[20,19,900,276],caption:"Item Mutasi Barang"});
		this.sg = new portalui_saiGrid(this.p1,{bound:[0,20,895,246],colCount:6,tag:2,colTitle:["Kode","Nama","Tipe","Satuan","Stok","Jumlah"],
					colWidth:[[0,1,2,3,4,5],[100,270,250,50,80,100]],colFormat:[[4,5],[cfNilai,cfNilai]],
					defaultRow:1,readOnly:true,autoAppend:false});
					
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
window.app_saku_inventory_transaksi_gudang_fMuttrm.extend(window.portalui_childForm);
window.app_saku_inventory_transaksi_gudang_fMuttrm.implement({
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
			if (this.standarLib.checkEmptyByTag(this, [0,2])){
				try{									
					this.e_nb.setText(this.standarLib.noBuktiOtomatis(this.dbLib,"inv_muttrm_m","no_terima",this.app._lokasi+"-MT"+this.e_periode.getText().substr(2,4)+".","0000"));
					uses("server_util_arrayList");
					var sql = new server_util_arrayList();
					sql.add("update inv_mutkrm_m set progress='1' where no_kirim ='"+this.cb_kirim.getText()+"' and kode_lokasi = '"+this.app._lokasi+"'");
					sql.add("update inv_mut_d set no_terima='"+this.e_nb.getText()+"' where no_kirim ='"+this.cb_kirim.getText()+"' and kode_lokasi = '"+this.app._lokasi+"'");
					sql.add("insert into inv_muttrm_m(no_terima,no_kirim,kode_lokasi,tanggal,no_dokumen,keterangan,kode_vendor,nik_buat,kode_gudanga,kode_gudangt,periode,nik_user,tgl_input,no_link,no_del) values "+
						    "('"+this.e_nb.getText()+"','"+this.cb_kirim.getText()+"','"+this.app._lokasi+"','"+this.dp_d1.getDateString()+"','"+this.e_dok.getText()+"','"+this.e_desc.getText()+"','"+this.cb_vend.getText()+"','"+this.cb_app.getText()+"','"+
							this.cb_gudang.getText()+"','"+this.cb_gudang2.getText()+"','"+this.e_periode.getText()+"','"+this.app._userLog+"',now(),'-','-')");
					
					if (this.sg.getRowValidCount() > 0){		
						var s="insert into inv_dt (no_bukti,kode_lokasi,nu,kode_brg,harga,jumlah,bonus,modul,dc,periode,tanggal,kode_gudang,pdisk) values ";
						for (var i=0;i < this.sg.getRowCount();i++){
							if (this.sg.rowValid(i)){
								if (i > 0) s+= ",";
								s += "('"+this.e_nb.getText()+"','"+this.app._lokasi+"',"+i+",'"+this.sg.cells(0,i)+"',0,"+
								          parseNilai(this.sg.cells(5,i))+",0,'TERIMA','D','"+this.e_periode.getText()+"','"+this.dp_d1.getDateString()+"','"+this.cb_gudang2.getText()+"',0)";
							}
						}						
						sql.add(s);
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
				if (parseFloat(this.app._periode) > parseFloat(this.e_periode.getText())){
					systemAPI.alert(this,"Periode transaksi tidak valid.","Periode transaksi tidak boleh kurang dari periode aktif sistem.["+this.app._periode+"]");
					return false;
				}
				if (parseFloat(this.app._periode) < parseFloat(this.e_periode.getText())) {
					if (this.app._pernext == "1")
					  system.confirm(this, "simpancek", "Periode transaksi melebihi periode aktif sistem.["+this.app._periode+"]","Data akan disimpan?");
					else{
						systemAPI.alert(this,"Periode transaksi tidak valid.","Periode transaksi tidak boleh melebihi periode aktif sistem.["+this.app._periode+"]");
						return false;
					}
				}
				else this.simpan();
				break;
			case "simpancek" : this.simpan();			
				break;
		}
	},
	doClick:function(sender){
			this.e_nb.setText(this.standarLib.noBuktiOtomatis(this.dbLib,"inv_muttrm_m","no_terima",this.app._lokasi+"-MT"+this.e_periode.getText().substr(2,4)+".","0000"));
		    this.e_dok.setFocus();
	},
	doLoadData:function(sender){
		if (this.cb_kirim.getText() != "") {
			var data = this.dbLib.getDataProvider("select a.kode_gudanga,b.nama as nama_gudanga,a.kode_gudangt,c.nama as nama_gudangt,a.kode_vendor,d.nama as nama_vendor,a.periode, "+
			                                      "       f.kode_brg,g.nama as nama_brg,g.tipe,f.sat,ifnull(h.stok,0) as stok,f.jumlah "+
												  "from inv_mutkrm_m a "+
												  "          inner join inv_gudang b on a.kode_gudanga = b.kode_gudang and a.kode_lokasi=b.kode_lokasi "+
												  "          inner join inv_gudang c on a.kode_gudangt = c.kode_gudang and a.kode_lokasi=c.kode_lokasi "+
												  "          inner join vendor d on a.kode_vendor = d.kode_vendor and a.kode_lokasi=d.kode_lokasi "+
												  "          inner join inv_mut_d f on a.no_kirim = f.no_kirim and a.kode_lokasi=f.kode_lokasi "+
												  "          inner join inv_brg g on f.kode_brg=g.kode_brg and f.kode_lokasi=g.kode_lokasi "+
												  "          left outer join (select kode_brg,kode_lokasi,sum(case dc when 'D' then jumlah+bonus else -(jumlah+bonus) end) as stok "+
												  "                           from inv_dt where kode_gudang='"+this.cb_gudang2.getText()+"' and kode_lokasi='"+this.app._lokasi+"' and periode<='"+this.e_periode.getText()+"' group by kode_brg,kode_lokasi) h on g.kode_brg=h.kode_brg and g.kode_lokasi=h.kode_lokasi "+
												  "where a.no_kirim = '"+this.cb_kirim.getText()+"' and a.kode_lokasi = '"+this.app._lokasi+"' ");
			eval("data = "+data+";");
			if (typeof data == "object"){
				var line;
				this.sg.clear();
				for (var i in data.rs.rows){
					line = data.rs.rows[i];							
					this.sg.appendData([line.kode_brg,line.nama_brg,line.tipe,line.sat,floatToNilai(line.stok),floatToNilai(line.jumlah)]);
				}
				this.sg.validasi();
				if (line !== undefined){				
					this.cb_gudang.setText(line.kode_gudanga, line.nama_gudanga);
					this.cb_gudang2.setText(line.kode_gudangt, line.nama_gudangt);
					this.cb_vend.setText(line.kode_vendor, line.nama_vendor);
					this.perLama = line.periode;						
				}
			}												  
		}
		else {
			system.alert(this,"No bukti pengiriman tidak valid.","Bukti Kirim harus dipilih.");
		}
	},
	doBtnClick: function(sender, event){
		try
		{
			if (sender == this.cb_kirim) {   
			    this.standarLib.showListData(this, "Daftar Mutasi Kirim",sender,undefined, 
											  "select no_kirim, keterangan from inv_mutkrm_m where kode_lokasi='"+this.app._lokasi+"' and progress='0' and no_del='-' ",
											  "select count(no_kirim)      from inv_mutkrm_m where kode_lokasi='"+this.app._lokasi+"' and progress='0' and no_del='-' ",
											  ["no_kirim","keterangan"],"and",["No Kirim","Desktipsi"],false);				
			}
			if (sender == this.cb_app) {   
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
							this.app._mainForm.pesan(2,"transaksi telah sukses tersimpan (No : "+ this.e_nb.getText()+")");							
							this.app._mainForm.bClear.click();
						}else system.info(this,result,"");
	    			break;
	      		break;
	    		}    		
			}
			catch(e){
				systemAPI.alert("step : "+step+"; error = "+e);
			}
	    }
	}
});