window.app_saku_inventory_transaksi_gudang_fIok = function(owner)
{
	if (owner)
	{
		window.app_saku_inventory_transaksi_gudang_fIok.prototype.parent.constructor.call(this,owner);
		this.className  = "app_saku_inventory_transaksi_gudang_fIok";
		this.itemsValue = new portalui_arrayList();
		this.app._mainForm.childFormConfig(this, "mainButtonClick","Form I/O Barang: Koreksi", 0);	
		
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
		this.cb_app = new portalui_saiCBBL(this,{bound:[20,15,200,20],caption:"Pembuat",btnClick:[this,"doBtnClick"],tag:1});				
		this.cb_gudang = new portalui_saiCBBL(this,{bound:[20,16,200,20],caption:"Gudang",btnClick:[this,"doBtnClick"],tag:1});				
		
		this.p1 = new portalui_panel(this,{bound:[20,19,900,338],caption:"Item Barang"});
		this.sg = new portalui_saiGrid(this.p1,{bound:[0,20,895,288],colCount:7,tag:2,colTitle:["Kode","Nama","Tipe","Satuan","Stok","I/O","Jumlah"],
					colWidth:[[0,1,2,3,4,5,6],[100,250,220,50,80,50,100]],colFormat:[[4,6],[cfNilai,cfNilai]],
					ellipsClick:[this,"doEllipseClick"],columnReadOnly:[true,[1,2,3,4],[0,5,6]],change:[this,"doChangeCell"],
					buttonStyle:[[0,5],[bsEllips,bsAuto]],picklist:[[5],[new portalui_arrayMap({items:["I","O"]})]],
					defaultRow:1,autoAppend:true});
		this.sgn = new portalui_sgNavigator(this.p1,{bound:[0,310,900,25],buttonStyle:2,grid:this.sg});
		
		this.rearrangeChild(10, 22);
		setTipeButton(tbUbahHapus);
		this.maximize();		
		this.setTabChildIndex();
		
		try{			
			this.dbLib = new util_dbLib();
			this.dbLib.addListener(this);
			uses("util_standar");
			this.standarLib = new util_standar();
			var prd = this.dbLib.getDataProvider("select distinct periode from inv_io_m where kode_lokasi = '"+this.app._lokasi+"'",true);
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
window.app_saku_inventory_transaksi_gudang_fIok.extend(window.portalui_childForm);
window.app_saku_inventory_transaksi_gudang_fIok.implement({
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
						this.e_nb.setText(this.standarLib.noBuktiOtomatis(this.dbLib,"inv_io_m","no_io",this.app._lokasi+"-IO"+this.e_periode.getText().substr(2,4)+".","0000"));
						sql.add("update inv_io_m set no_link='"+this.e_nb.getText()+"',no_del = concat(no_io,'r') where no_io ='"+this.cb_nbLama.getText()+"' and kode_lokasi = '"+this.app._lokasi+"'");
						sql.add("insert into inv_io_m (no_io,kode_lokasi,tanggal,no_dokumen,keterangan,nik_buat,kode_gudang,periode,nik_user,tgl_input,no_link,no_del) "+
						        "           select concat(no_io,'r'),kode_lokasi,'"+this.dp_d1.getDateString()+"',no_dokumen,keterangan,'"+this.cb_app.getText()+"',kode_gudang,'"+this.e_periode.getText()+"','"+this.app._userLog+"',now(),'-',no_io "+
								"from inv_io_m where no_io='"+this.nbLama.getText()+"' and kode_lokasi = '"+this.app._lokasi+"' ");
						sql.add("insert into inv_dt (no_bukti,kode_lokasi,nu,kode_brg,harga,jumlah,bonus,modul,dc,periode,tanggal,kode_gudang,pdisk)"+
						        "           select concat(no_bukti,'r'),kode_lokasi,nu,kode_brg,harga,jumlah,bonus,modul,case dc when 'D' then 'C' else 'D' end,'"+this.e_periode.getText()+"','"+this.dp_d1.getDateString()+"',kode_gudang,pdisk "+
								"from inv_dt where no_bukti='"+this.nbLama.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
						this.nb = this.e_nb.getText();
					}
					else {
						sql.add("delete from inv_io_m where no_io ='"+this.cb_nbLama.getText()+"' and kode_lokasi = '"+this.app._lokasi+"'");
						sql.add("delete from inv_io_d where no_io ='"+this.cb_nbLama.getText()+"' and kode_lokasi = '"+this.app._lokasi+"'");
						sql.add("delete from inv_dt where no_bukti ='"+this.cb_nbLama.getText()+"' and kode_lokasi = '"+this.app._lokasi+"'");
						this.nb = this.cb_nbLama.getText();
					}

					
					sql.add("insert into inv_io_m(no_io,kode_lokasi,tanggal,no_dokumen,keterangan,nik_buat,kode_gudang,periode,nik_user,tgl_input,no_link,no_del) values "+
						    "('"+this.nb+"','"+this.app._lokasi+"','"+this.dp_d1.getDateString()+"','"+this.e_dok.getText()+"','"+this.e_desc.getText()+"','"+this.cb_app.getText()+"','"+this.cb_gudang.getText()+"','"+this.e_periode.getText()+"','"+this.app._userLog+"',now(),'-','-')");															
					
					if (this.sg.getRowValidCount() > 0){
						var dc = "";
						var d="insert into inv_io_d (no_io,kode_lokasi,periode,kode_gudang,nu,kode_brg,sat,jumlah,dc) values ";
						var s="insert into inv_dt (no_bukti,kode_lokasi,nu,kode_brg,harga,jumlah,bonus,modul,dc,periode,tanggal,kode_gudang,pdisk) values ";
						for (var i=0;i < this.sg.getRowCount();i++){
							if (this.sg.rowValid(i)){
								if (this.sg.cells(6,i) != "0") {
									if (i > 0) d+= ",";
									if (i > 0) s+= ",";
									if (this.sg.cells(5,i) == "I") dc = "D"; else dc = "C";
									
									d += "('"+this.nb+"','"+this.app._lokasi+"','"+this.e_periode.getText()+"','"+this.cb_gudang.getText()+"',"+i+",'"+this.sg.cells(0,i)+"','"+this.sg.cells(3,i)+"',"+parseNilai(this.sg.cells(6,i))+",'"+dc+"')";									
									s += "('"+this.nb+"','"+this.app._lokasi+"',"+i+",'"+this.sg.cells(0,i)+"',0,"+
									          parseNilai(this.sg.cells(6,i))+",0,'IO','"+dc+"','"+this.e_periode.getText()+"','"+this.dp_d1.getDateString()+"','"+this.cb_gudang.getText()+"',0)";
								}
							}
						}						
						sql.add(d);
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
			    for (var i=0;i < this.sg.getRowCount();i++){
					if (this.sg.rowValid(i)){
						if ((this.sg.cells(5,i).toUpperCase() == "O") && (nilaiToFloat(this.sg.cells(4,i)) < nilaiToFloat(this.sg.cells(6,i)))) {
							var k = i+1;
							system.alert(this,"Transaksi tidak valid.","Jumlah barang keluar melebihi stok. Baris ["+k+"]");
							return false;
						}
						for (var j=i;j < this.sg.getRowCount();j++){
							if (this.sg.cells(0,j) == this.sg.cells(0,i) && (i != j)) {
							    var k = i+1;
								system.alert(this,"Transaksi tidak valid.","Duplikasi data barang untuk baris ["+k+"]");
								return false;
							}
						}
					}
				}
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
				try{
					uses("server_util_arrayList");
					var sql = new server_util_arrayList();
					if (parseFloat(this.perLama) < parseFloat(this.app._periode)) {						
						sql.add("update inv_io_m set no_del = concat(no_io,'r') where no_io ='"+this.cb_nbLama.getText()+"' and kode_lokasi = '"+this.app._lokasi+"'");
						sql.add("insert into inv_io_m (no_io,kode_lokasi,tanggal,no_dokumen,keterangan,nik_buat,kode_gudang,periode,nik_user,tgl_input,no_link,no_del) "+
						        "           select concat(no_io,'r'),kode_lokasi,'"+this.dp_d1.getDateString()+"',no_dokumen,keterangan,'"+this.cb_app.getText()+"',kode_gudang,'"+this.e_periode.getText()+"','"+this.app._userLog+"',now(),'-',no_io "+
								"from inv_io_m where no_io='"+this.nbLama.getText()+"' and kode_lokasi = '"+this.app._lokasi+"' ");
						sql.add("insert into inv_dt (no_bukti,kode_lokasi,nu,kode_brg,harga,jumlah,bonus,modul,dc,periode,tanggal,kode_gudang,pdisk)"+
						        "           select concat(no_bukti,'r'),kode_lokasi,nu,kode_brg,harga,jumlah,bonus,modul,case dc when 'D' then 'C' else 'D' end,'"+this.e_periode.getText()+"','"+this.dp_d1.getDateString()+"',kode_gudang,pdisk "+
								"from inv_dt where no_bukti='"+this.nbLama.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
					}
					else {
						sql.add("delete from inv_io_m where no_io ='"+this.cb_nbLama.getText()+"' and kode_lokasi = '"+this.app._lokasi+"'");
						sql.add("delete from inv_io_d where no_io ='"+this.cb_nbLama.getText()+"' and kode_lokasi = '"+this.app._lokasi+"'");
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
			this.e_nb.setText(this.standarLib.noBuktiOtomatis(this.dbLib,"inv_io_m","no_io",this.app._lokasi+"-IO"+this.e_periode.getText().substr(2,4)+".","0000"));
		    this.e_dok.setFocus();
	},
	doChange: function(sender){
		this.kodeGud = this.cb_nbLama.dataFromList[2];
	},
	doLoadData:function(sender){
		if (this.cb_nbLama.getText() != "") {
			var data = this.dbLib.getDataProvider("select a.no_dokumen,a.keterangan,a.nik_buat,i.nama as nama_buat,a.kode_gudang,b.nama as nama_gudang,a.periode, "+
			                                      "       f.kode_brg,g.nama as nama_brg,g.tipe,f.sat,ifnull(h.stok,0) as stok,case f.dc when 'D' then 'I' else 'O' end as dc,f.jumlah "+
												  "from inv_io_m a "+
												  "          inner join karyawan i on i.nik = a.nik_buat and i.kode_lokasi=a.kode_lokasi "+ 
												  "          inner join inv_gudang b on a.kode_gudang = b.kode_gudang and a.kode_lokasi=b.kode_lokasi "+
												  "          inner join inv_io_d f on a.no_io = f.no_io and a.kode_lokasi=f.kode_lokasi "+
												  "          inner join inv_brg g on f.kode_brg=g.kode_brg and f.kode_lokasi=g.kode_lokasi "+
												  "          left outer join (select kode_brg,kode_lokasi,sum(case dc when 'D' then jumlah+bonus else -(jumlah+bonus) end) as stok "+
												  "                           from inv_dt where no_bukti <> '"+this.cb_nbLama.getText()+"' and kode_gudang='"+this.kodeGud+"' and kode_lokasi='"+this.app._lokasi+"' and periode<='"+this.e_periode.getText()+"' group by kode_brg,kode_lokasi) h on g.kode_brg=h.kode_brg and g.kode_lokasi=h.kode_lokasi "+
												  "where a.no_io = '"+this.cb_nbLama.getText()+"' and a.kode_lokasi = '"+this.app._lokasi+"' ");
			eval("data = "+data+";");
			if (typeof data == "object"){
				var line;
				this.sg.clear();
				for (var i in data.rs.rows){
					line = data.rs.rows[i];							
					this.sg.appendData([line.kode_brg,line.nama_brg,line.tipe,line.sat,floatToNilai(line.stok),line.dc.toUpperCase(),floatToNilai(line.jumlah)]);
				}
				this.sg.validasi();
				if (line !== undefined){				
				    this.e_dok.setText(line.no_dokumen);
					this.e_desc.setText(line.keterangan);
					this.cb_gudang.setText(line.kode_gudang, line.nama_gudang);
					this.cb_app.setText(line.nik_buat, line.nama_buat);
					this.perLama = line.periode;						
				}
			}												  
		}
		else {
			system.alert(this,"No bukti tidak valid.","Bukti IO harus dipilih.");
		}
	},
	doBtnClick: function(sender, event){
		try{
			if (sender == this.cb_nbLama) {   
			    this.standarLib.showListData(this, "Daftar Bukti I/O",sender,undefined, 
											  "select no_io, no_dokumen, kode_gudang  from inv_io_m where kode_lokasi='"+this.app._lokasi+"' and periode='"+this.cb_perLama.getText()+"' and no_del='-'", 
											  "select count(no_io)                    from inv_io_m where kode_lokasi='"+this.app._lokasi+"' and periode='"+this.cb_perLama.getText()+"' and no_del='-'", 
											  ["no_io","no_dokumen","kode_gudang"],"and",["No Bukti","No Dokumen","Gudang"],false);				
				this.standarLib.clearByTag(this, new Array("1"),undefined);		
				this.sg.clear(1);
			}
			if (sender == this.cb_gudang) {   
			    this.standarLib.showListData(this, "Daftar Gudang",sender,undefined, 
											  "select kode_gudang, nama  from inv_gudang where kode_lokasi='"+this.app._lokasi+"'",
											  "select count(kode_gudang) from inv_gudang where kode_lokasi='"+this.app._lokasi+"'",
											  ["kode_gudang","nama"],"and",["Kode","Nama"],false);				
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
	doEllipseClick: function(sender, col, row){
		try{			
			if (col == 0){
				this.standarLib.showListData(this, "Daftar Item Barang",sender,undefined, 
											  "select a.kode_brg, a.nama, a.tipe, a.sat, ifnull(b.jml,0) as stok  "+
											  "from inv_brg a left outer join (select kode_brg,kode_lokasi,sum(case dc when 'D' then jumlah+bonus else -(jumlah+bonus) end) as jml "+
											  "                                from inv_dt where kode_gudang='"+this.cb_gudang.getText()+"' and kode_lokasi='"+this.app._lokasi+"' and periode<='"+this.e_periode.getText()+"' group by kode_brg,kode_lokasi) b on a.kode_brg=b.kode_brg and a.kode_lokasi=b.kode_lokasi "+
											  "where a.kode_lokasi='"+this.app._lokasi+"'",
											  "select count(kode_brg) from inv_brg where kode_lokasi='"+this.app._lokasi+"' ",
											  ["kode_brg","nama","tipe","sat","stok"],"and",["Kode","Nama","Tipe","Satuan","Stok"],false);				
			}
		}catch(e){
			systemAPI.alert(e);
		}
	},
	doChangeCell: function(sender, col, row){
		if (col == 0) {
			this.sg.setCell(2,row,this.sg.dataFromList[2]);
			this.sg.setCell(3,row,this.sg.dataFromList[3]);
			this.sg.setCell(4,row,this.sg.dataFromList[4]);
		}
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