window.app_saku_inventory_transaksi_gudang_fMuttrmk = function(owner)
{
	if (owner)
	{
		window.app_saku_inventory_transaksi_gudang_fMuttrmk.prototype.parent.constructor.call(this,owner);
		this.className  = "app_saku_inventory_transaksi_gudang_fMuttrmk";
		this.itemsValue = new portalui_arrayList();
		this.app._mainForm.childFormConfig(this, "mainButtonClick","Form Mutasi Terima: Koreksi", 0);	
		
		uses("portalui_saiCBB;portalui_saiCBBL;portalui_saiEdit;portalui_datePicker;portalui_saiGrid;portalui_sgNavigator");
		this.e_periode = new portalui_saiLabelEdit(this,{bound:[20,10,200,20],caption:"Periode",readOnly:true,tag:2});
		this.l_tgl = new portalui_label(this,{bound:[20,11,100,18],caption:"Tanggal", underline:true});
		this.dp_d1 = new portalui_datePicker(this,{bound:[120,11,100,18],selectDate:[this,"doSelectDate"],date:new Date().getDateStr()});
		this.cb_perLama = new portalui_saiCB(this,{bound:[723,11,200,20],caption:"Periode Bukti Lama",mustCheck: false, tag:2});
		this.e_nb = new portalui_saiLabelEdit(this,{bound:[20,12,250,20],caption:"No Bukti",maxLength:30,readOnly:true});
		this.b_gen = new portalui_button(this,{bound:[280,12,80,18],caption:"Gen",click:[this,"doClick"],icon:"icon/"+system.getThemes()+"/process.png"});		
		this.cb_nbLama = new portalui_saiCBB(this,{bound:[723,12,200,20],caption:"No Bukti Lama",readOnly:true,btnClick:[this,"doBtnClick"],btnRefreshClick:[this,"doLoadData"],change:[this,"doChange"]});		
		this.e_dok = new portalui_saiLabelEdit(this,{bound:[20,13,343,20],caption:"No Dokumen", maxLength:100,tag:1});				
		this.e_desc = new portalui_saiLabelEdit(this,{bound:[20,14,503,20],caption:"Keterangan", maxLength:150,tag:1});				
		this.cb_kirim = new portalui_saiCBBL(this,{bound:[20,20,270,20],caption:"No Kirim",readOnly:true,tag:1});		
		this.cb_gudang = new portalui_saiCBBL(this,{bound:[20,15,200,20],caption:"Gudang Asal",readOnly: true,tag:1});				
		this.cb_gudang2 = new portalui_saiCBBL(this,{bound:[20,16,200,20],caption:"Gudang Tujuan", readOnly: true,tag:1});				
		this.cb_vend = new portalui_saiCBBL(this,{bound:[20,17,200,20],caption:"Forwarder",readOnly: true,tag:1});				
		this.cb_app = new portalui_saiCBBL(this,{bound:[20,18,200,20],caption:"Penerima",btnClick:[this,"doBtnClick"],tag:1});				
		
		this.p1 = new portalui_panel(this,{bound:[20,19,900,276],caption:"Item Mutasi Barang"});
		this.sg = new portalui_saiGrid(this.p1,{bound:[0,20,895,246],colCount:6,tag:2,colTitle:["Kode","Nama","Tipe","Satuan","Stok","Jumlah"],
					colWidth:[[0,1,2,3,4,5],[100,270,250,50,80,100]],colFormat:[[4,5],[cfNilai,cfNilai]],
					defaultRow:1,readOnly:true,autoAppend:false});
					
		this.rearrangeChild(10, 22);
		setTipeButton(tbUbahHapus);
		this.maximize();		
		this.setTabChildIndex();
		
		try{			
			this.dbLib = new util_dbLib();
			this.dbLib.addListener(this);
			uses("util_standar");
			this.standarLib = new util_standar();
			
			var prd = this.dbLib.getDataProvider("select distinct periode from inv_muttrm_m where kode_lokasi = '"+this.app._lokasi+"'",true);
			if (typeof prd == "object"){						
				var items = [];
				for (var i in prd.rs.rows) items.push(prd.rs.rows[i].periode);			
				this.cb_perLama.setItem(new portalui_arrayMap({items:items}));
			}
			this.cb_perLama.setText(this.app._periode);
		}catch(e){
			systemAPI.alert(e);
		}
	}
};
window.app_saku_inventory_transaksi_gudang_fMuttrmk.extend(window.portalui_childForm);
window.app_saku_inventory_transaksi_gudang_fMuttrmk.implement({
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
			if (parseFloat(this.perLama) < parseFloat(this.app._periode)) this.e_nb.setTag("0");
			else this.e_nb.setTag("9");
			if (this.standarLib.checkEmptyByTag(this, [0,1,2])){
				try{									
					uses("server_util_arrayList");
					var sql = new server_util_arrayList();
					if (parseFloat(this.perLama) < parseFloat(this.app._periode)) {						
						this.e_nb.setText(this.standarLib.noBuktiOtomatis(this.dbLib,"inv_muttrm_m","no_terima",this.app._lokasi+"-MT"+this.e_periode.getText().substr(2,4)+".","0000"));
						sql.add("update inv_mutkrm_m set progress='0' where no_kirim ='"+this.cb_kirim.getText()+"' and kode_lokasi = '"+this.app._lokasi+"'");
						sql.add("update inv_mut_d set no_terima='-' where no_kirim ='"+this.cb_kirim.getText()+"' and kode_lokasi = '"+this.app._lokasi+"'");
						sql.add("update inv_muttrm_m set no_link='"+this.e_nb.getText()+"',no_del = concat(no_terima,'r') where no_terima ='"+this.cb_nbLama.getText()+"' and kode_lokasi = '"+this.app._lokasi+"'");
						sql.add("insert into inv_muttrm_m (no_terima,no_kirim,kode_lokasi,tanggal,no_dokumen,keterangan,kode_vendor,nik_buat,kode_gudanga,kode_gudangt,periode,nik_user,tgl_input,no_link,no_del) "+
						        "           select concat(no_terima,'r'),no_kirim,kode_lokasi,'"+this.dp_d1.getDateString()+"',no_dokumen,keterangan,kode_vendor,'"+this.cb_app.getText()+"',kode_gudanga,kode_gudangt,'"+this.e_periode.getText()+"','"+this.app._userLog+"',now(),'-',no_terima "+
								"from inv_muttrm_m where no_terima='"+this.nbLama.getText()+"' and kode_lokasi = '"+this.app._lokasi+"' ");
						sql.add("insert into inv_dt (no_bukti,kode_lokasi,nu,kode_brg,harga,jumlah,bonus,modul,dc,periode,tanggal,kode_gudang,pdisk)"+
						        "           select concat(no_bukti,'r'),kode_lokasi,nu,kode_brg,harga,jumlah,bonus,modul,case dc when 'D' then 'C' else 'D' end,'"+this.e_periode.getText()+"','"+this.dp_d1.getDateString()+"',kode_gudang,pdisk "+
								"from inv_dt where no_bukti='"+this.nbLama.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
						this.nb = this.e_nb.getText();
					}
					else {
						sql.add("update inv_mutkrm_m set progress='0' where no_kirim ='"+this.cb_kirim.getText()+"' and kode_lokasi = '"+this.app._lokasi+"'");
						sql.add("update inv_mut_d set no_terima='-' where no_kirim ='"+this.cb_kirim.getText()+"' and kode_lokasi = '"+this.app._lokasi+"'");
						sql.add("delete from inv_muttrm_m where no_terima ='"+this.cb_nbLama.getText()+"' and kode_lokasi = '"+this.app._lokasi+"'");
						sql.add("delete from inv_dt where no_bukti ='"+this.cb_nbLama.getText()+"' and kode_lokasi = '"+this.app._lokasi+"'");
						this.nb = this.cb_nbLama.getText();
					}
					
					sql.add("update inv_mutkrm_m set progress='1' where no_kirim ='"+this.cb_kirim.getText()+"' and kode_lokasi = '"+this.app._lokasi+"'");
					sql.add("update inv_mut_d set no_terima='"+this.nb+"' where no_kirim ='"+this.cb_kirim.getText()+"' and kode_lokasi = '"+this.app._lokasi+"'");
					sql.add("insert into inv_muttrm_m(no_terima,no_kirim,kode_lokasi,tanggal,no_dokumen,keterangan,kode_vendor,nik_buat,kode_gudanga,kode_gudangt,periode,nik_user,tgl_input,no_link,no_del) values "+
						    "('"+this.nb+"','"+this.cb_kirim.getText()+"','"+this.app._lokasi+"','"+this.dp_d1.getDateString()+"','"+this.e_dok.getText()+"','"+this.e_desc.getText()+"','"+this.cb_vend.getText()+"','"+this.cb_app.getText()+"','"+
							this.cb_gudang.getText()+"','"+this.cb_gudang2.getText()+"','"+this.e_periode.getText()+"','"+this.app._userLog+"',now(),'-','-')");
					
					if (this.sg.getRowValidCount() > 0){		
						var s="insert into inv_dt (no_bukti,kode_lokasi,nu,kode_brg,harga,jumlah,bonus,modul,dc,periode,tanggal,kode_gudang,pdisk) values ";
						for (var i=0;i < this.sg.getRowCount();i++){
							if (this.sg.rowValid(i)){
								if (i > 0) s+= ",";
								s += "('"+this.nb+"','"+this.app._lokasi+"',"+i+",'"+this.sg.cells(0,i)+"',0,"+
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
					this.standarLib.clearByTag(this, new Array("0","1"),this.e_nb);		
					this.sg.clear(1);
				}
				break;
			case "ubah" :	
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
			case "hapus" : 
			    for (var i=0;i < this.sg.getRowCount();i++){
					if (this.sg.rowValid(i)){
					    if (nilaiToFloat(this.sg.cells(5,i)) > nilaiToFloat(this.sg.cells(4,i))) {
							var k = i+1;
							system.alert(this,"Transaksi tidak valid.","Jumlah mutasi yang batal melebihi stok. Baris ["+k+"]");
							return false;
						}
					}
				}
				try{
					uses("server_util_arrayList");
					var sql = new server_util_arrayList();
					if (parseFloat(this.perLama) < parseFloat(this.app._periode)) {						
						sql.add("update inv_mutkrm_m set progress='0' where no_kirim ='"+this.cb_kirim.getText()+"' and kode_lokasi = '"+this.app._lokasi+"'");
						sql.add("update inv_mut_d set no_terima='-' where no_kirim ='"+this.cb_kirim.getText()+"' and kode_lokasi = '"+this.app._lokasi+"'");
						sql.add("update inv_muttrm_m set no_del = concat(no_terima,'r') where no_terima ='"+this.cb_nbLama.getText()+"' and kode_lokasi = '"+this.app._lokasi+"'");
						sql.add("insert into inv_muttrm_m (no_terima,no_kirim,kode_lokasi,tanggal,no_dokumen,keterangan,kode_vendor,nik_buat,kode_gudanga,kode_gudangt,periode,nik_user,tgl_input,no_link,no_del) "+
						        "           select concat(no_terima,'r'),no_kirim,kode_lokasi,'"+this.dp_d1.getDateString()+"',no_dokumen,keterangan,kode_vendor,'"+this.cb_app.getText()+"',kode_gudanga,kode_gudangt,'"+this.e_periode.getText()+"','"+this.app._userLog+"',now(),'-',no_terima "+
								"from inv_muttrm_m where no_terima='"+this.nbLama.getText()+"' and kode_lokasi = '"+this.app._lokasi+"' ");
						sql.add("insert into inv_dt (no_bukti,kode_lokasi,nu,kode_brg,harga,jumlah,bonus,modul,dc,periode,tanggal,kode_gudang,pdisk)"+
						        "           select concat(no_bukti,'r'),kode_lokasi,nu,kode_brg,harga,jumlah,bonus,modul,case dc when 'D' then 'C' else 'D' end,'"+this.e_periode.getText()+"','"+this.dp_d1.getDateString()+"',kode_gudang,pdisk "+
								"from inv_dt where no_bukti='"+this.nbLama.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
					}
					else {
						sql.add("update inv_mutkrm_m set progress='0' where no_kirim ='"+this.cb_kirim.getText()+"' and kode_lokasi = '"+this.app._lokasi+"'");
						sql.add("update inv_mut_d set no_terima='-' where no_kirim ='"+this.cb_kirim.getText()+"' and kode_lokasi = '"+this.app._lokasi+"'");
						sql.add("delete from inv_muttrm_m where no_terima ='"+this.cb_nbLama.getText()+"' and kode_lokasi = '"+this.app._lokasi+"'");
						sql.add("delete from inv_dt where no_bukti ='"+this.cb_nbLama.getText()+"' and kode_lokasi = '"+this.app._lokasi+"'");
					}
					this.dbLib.execArraySQL(sql);
				}catch(e){
					systemAPI.alert(e);
				}
				break;	
		}
	},
	doClick:function(sender){
			this.e_nb.setText(this.standarLib.noBuktiOtomatis(this.dbLib,"inv_muttrm_m","no_terima",this.app._lokasi+"-MT"+this.e_periode.getText().substr(2,4)+".","0000"));
		    this.e_dok.setFocus();
	},
	doChange: function(sender){
		this.kodeGudtuj = this.cb_nbLama.dataFromList[2];
	},
	doLoadData:function(sender){
		if (this.cb_nbLama.getText() != "") {
			var data = this.dbLib.getDataProvider("select z.no_dokumen,z.keterangan,z.nik_buat,i.nama as nama_buat,a.no_kirim,a.keterangan as ket_kirim,a.kode_gudanga,b.nama as nama_gudanga,a.kode_gudangt,c.nama as nama_gudangt,a.kode_vendor,d.nama as nama_vendor,z.periode, "+
			                                      "       f.kode_brg,g.nama as nama_brg,g.tipe,f.sat,ifnull(h.stok,0) as stok,f.jumlah "+
												  "from inv_mutkrm_m a "+
												  "          inner join inv_muttrm_m z on z.no_kirim = a.no_kirim and a.kode_lokasi=z.kode_lokasi "+ 
												  "          inner join karyawan i on i.nik = z.nik_buat and i.kode_lokasi=z.kode_lokasi "+ 
												  "          inner join inv_gudang b on a.kode_gudanga = b.kode_gudang and a.kode_lokasi=b.kode_lokasi "+
												  "          inner join inv_gudang c on a.kode_gudangt = c.kode_gudang and a.kode_lokasi=c.kode_lokasi "+
												  "          inner join vendor d on a.kode_vendor = d.kode_vendor and a.kode_lokasi=d.kode_lokasi "+
												  "          inner join inv_mut_d f on a.no_kirim = f.no_kirim and a.kode_lokasi=f.kode_lokasi "+
												  "          inner join inv_brg g on f.kode_brg=g.kode_brg and f.kode_lokasi=g.kode_lokasi "+
												  "          left outer join (select kode_brg,kode_lokasi,sum(case dc when 'D' then jumlah+bonus else -(jumlah+bonus) end) as stok "+
												  "                           from inv_dt where kode_gudang='"+this.kodeGudtuj+"' and kode_lokasi='"+this.app._lokasi+"' and periode<='"+this.e_periode.getText()+"' group by kode_brg,kode_lokasi) h on g.kode_brg=h.kode_brg and g.kode_lokasi=h.kode_lokasi "+
												  "where z.no_terima = '"+this.cb_nbLama.getText()+"' and z.kode_lokasi = '"+this.app._lokasi+"' ");
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
				    this.e_dok.setText(line.no_dokumen);
					this.e_desc.setText(line.keterangan);
					this.cb_kirim.setText(line.no_kirim, line.ket_kirim);
					this.cb_gudang.setText(line.kode_gudanga, line.nama_gudanga);
					this.cb_gudang2.setText(line.kode_gudangt, line.nama_gudangt);
					this.cb_vend.setText(line.kode_vendor, line.nama_vendor);
					this.cb_app.setText(line.nik_buat, line.nama_buat);
					this.perLama = line.periode;						
				}
			}												  
		}
		else {
			system.alert(this,"No bukti tidak valid.","Bukti Terima harus dipilih.");
		}
	},
	doBtnClick: function(sender, event){
		try
		{
			if (sender == this.cb_nbLama) {   
			    this.standarLib.showListData(this, "Daftar Bukti Terima",sender,undefined, 
											  "select no_terima, no_dokumen, kode_gudangt  from inv_muttrm_m where kode_lokasi='"+this.app._lokasi+"' and periode='"+this.cb_perLama.getText()+"' and no_del='-'", 
											  "select count(no_terima)       from inv_muttrm_m where kode_lokasi='"+this.app._lokasi+"' and periode='"+this.cb_perLama.getText()+"' and no_del='-'", 
											  ["no_terima","no_dokumen","kode_gudangt"],"and",["No Bukti","No Dokumen","Gudang Tuj"],false);				
				this.standarLib.clearByTag(this, new Array("1"),undefined);		
				this.sg.clear(1);
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
							this.app._mainForm.pesan(2,"transaksi telah sukses tersimpan (No : "+ this.nb+")");							
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