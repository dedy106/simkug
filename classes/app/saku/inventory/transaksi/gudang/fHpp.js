window.app_saku_inventory_transaksi_gudang_fHpp = function(owner)
{
	if (owner)
	{
		window.app_saku_inventory_transaksi_gudang_fHpp.prototype.parent.constructor.call(this,owner);
		this.className  = "app_saku_inventory_transaksi_gudang_fHpp";
		this.itemsValue = new portalui_arrayList();
		this.app._mainForm.childFormConfig(this, "mainButtonClick","Form Jurnal Penyesuaian HPP: Input", 0);	
		
		uses("portalui_saiCBBL;portalui_saiEdit;portalui_datePicker;portalui_saiGrid;portalui_sgNavigator"),uses("app_saku_fJurnalViewer",true);
		this.e_periode = new portalui_saiLabelEdit(this,{bound:[20,10,200,20],caption:"Periode",readOnly:true,tag:2});
		this.l_tgl = new portalui_label(this,{bound:[20,11,100,18],caption:"Tanggal", underline:true});
		this.dp_d1 = new portalui_datePicker(this,{bound:[120,11,100,18],selectDate:[this,"doSelectDate"],date:new Date().getDateStr()});
		this.e_nb = new portalui_saiLabelEdit(this,{bound:[20,12,250,20],caption:"No Bukti",maxLength:30,readOnly:true});
		this.b_gen = new portalui_button(this,{bound:[280,12,80,18],caption:"Gen",click:[this,"doClick"],icon:"icon/"+system.getThemes()+"/process.png"});		
		this.e_dok = new portalui_saiLabelEdit(this,{bound:[20,13,343,20],caption:"No Dokumen", maxLength:100});				
		this.e_desc = new portalui_saiLabelEdit(this,{bound:[20,14,503,20],caption:"Keterangan", maxLength:150});				
		this.cb_app = new portalui_saiCBBL(this,{bound:[20,15,200,20],caption:"Pembuat",btnClick:[this,"doBtnClick"],tag:2});				
		this.e_total = new portalui_saiLabelEdit(this,{bound:[600,15,200,20],caption:"Total",tipeText:ttNilai,alignment:alLeft, readOnly:true, text:"0"});
		this.bTampil = new portalui_button(this,{bound:[815,15,80,18],caption:"Tampil",click:[this,"doTampilClick"]});
		this.i_viewer = new portalui_imageButton(this,{bound:[900,15,20,20],hint:"Tampil Jurnal",image:"icon/"+system.getThemes()+"/tabCont2.png",click:[this,"doClick"]});
		
		this.p1 = new portalui_panel(this,{bound:[20,19,900,338],caption:"Item Barang"});
		this.sg = new portalui_saiGrid(this.p1,{bound:[0,20,895,313],colCount:9,tag:2,colTitle:["Kode","Nama","Tipe","Satuan","Stok","Hrg Avg","SubTtl","Akun Pers.","Akun HPP"],
					colWidth:[[0,1,2,3,4,5,6,7,8],[80,200,100,50,80,80,100,80,80]],colFormat:[[4,5,6],[cfNilai,cfNilai,cfNilai]],
					nilaiChange:[this, "doSgChange"],readOnly:true,defaultRow:1,autoAppend:false});
		
		this.rearrangeChild(10, 22);
		setTipeButton(tbSimpan);
		this.maximize();		
		this.setTabChildIndex();
		
		try{			
			this.dbLib = new util_dbLib();
			this.dbLib.addListener(this);
			uses("util_standar");
			this.standarLib = new util_standar();
			
			uses("util_addOnLib");
		    this.addOnLib = new util_addOnLib();
			uses("util_gridLib");
			this.gridLib=new util_gridLib();												
			this.jurnal = new app_saku_fJurnalViewer(this.app,{bound:[0,0,system.screenWidth,system.screenHeight],visible:false});
		}catch(e){
			systemAPI.alert(e);
		}
	}
};
window.app_saku_inventory_transaksi_gudang_fHpp.extend(window.portalui_childForm);
window.app_saku_inventory_transaksi_gudang_fHpp.implement({
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
					this.e_nb.setText(this.standarLib.noBuktiOtomatis(this.dbLib,"inv_hpp_m","no_hpp",this.app._lokasi+"-HPP"+this.e_periode.getText().substr(2,4)+".","0000"));
					uses("server_util_arrayList");
					var sql = new server_util_arrayList();
					
					sql.add("insert into inv_hpp_m(no_hpp,kode_lokasi,tanggal,no_dokumen,keterangan,nik_buat,periode,nik_user,tgl_input,no_link,no_del,posted,kode_pp,kode_curr,kurs,nilai) values "+
						    "('"+this.e_nb.getText()+"','"+this.app._lokasi+"','"+this.dp_d1.getDateString()+"','"+this.e_dok.getText()+"','"+this.e_desc.getText()+"','"+this.cb_app.getText()+"','"+this.e_periode.getText()+"','"+this.app._userLog+"',now(),'-','-','F','"+this.app._kodePP+"','IDR',1,"+parseNilai(this.e_total.getText())+")");															
										
					this.createJurnal();
					var d = "insert into inv_hpp_j(no_hpp,kode_lokasi,nu,kode_akun,dc,nilai,keterangan,kode_pp,kode_drk,periode,tanggal,kode_curr,kurs,modul,jenis,no_dokumen,tgl_input,nik_user)values";
					var s = 0;
					for (var i in this.dataJurnal.rs.rows){
						line = this.dataJurnal.rs.rows[i];
						if (line.nilai != 0) {
							if (s >0) d+=",";
							s++;
							d+="('"+this.e_nb.getText()+"','"+this.app._lokasi+"',"+s+",'"+line.kode_akun+"','"+line.dc+"',"+line.nilai+",'"+line.keterangan+"','"+line.kode_pp+"','"+line.kode_drk+"','"+this.e_periode.getText()+"','"+this.dp_d1.getDateString()+"','IDR',1,'HPP','"+line.jenis+"','"+this.e_dok.getText()+"',now(),'"+this.app._userLog+"')";
						}
					}
					sql.add(d);			
					if (this.sg.getRowValidCount() > 0){
						var d="insert into inv_hpp_d (no_hpp,kode_lokasi,periode,nu,kode_brg,sat,stok,havg,kode_akun,akun_hpp) values ";
						var s = 0;
						for (var i=0;i < this.sg.getRowCount();i++){
							if (this.sg.rowValid(i)){
								if (this.sg.cells(6,i) != "0") {
									if (s > 0) d+= ",";
									s++;
									d += "('"+this.e_nb.getText()+"','"+this.app._lokasi+"','"+this.e_periode.getText()+"',"+s+",'"+this.sg.cells(0,i)+"','"+this.sg.cells(3,i)+"',"+parseNilai(this.sg.cells(4,i))+","+parseNilai(this.sg.cells(5,i))+",'"+this.sg.cells(7,i)+"','"+this.sg.cells(8,i)+"')";
								}
							}
						}						
						sql.add(d);
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
	createJurnal: function(){		
		try{
			var rows = [];
			//saldo awal ,,, harus masuk tabel inv_hpp_j
			this.dbLib.execQuery("call sp_glma_hpp_tmp ('"+this.app._lokasi+"','"+this.app._lokasi+"','"+this.app._lokasi+"','"+this.app._periode+"','"+this.app._nikUser+"')");
			var data = this.dbLib.getDataProvider("select distinct a.kode_akun,a.periode,a.kode_lokasi,case when a.so_akhir >= 0 then 'C' else 'D' end as dc,a.so_akhir,b.akun_hpp,case when a.so_akhir >= 0 then 'D' else 'C' end as dchpp "+
			                                      "from glma_tmp a inner join inv_brg_klp b on a.kode_akun = b.kode_akun and a.kode_lokasi=b.kode_lokasi "+
												  "where a.nik_user='"+this.app._nikUser+"' and a.kode_lokasi = '"+this.app._lokasi+"' "); 
			eval("data = "+data+";");
			if (typeof data == "object"){
				var line;
				for (var i in data.rs.rows){
					line = data.rs.rows[i];							
					rows[rows.length] = {kode_akun:line.kode_akun, nama:'-',dc:line.dc.toUpperCase(), keterangan:"Penyesuaian Persediaan Awal Barang", nilai: Math.abs(line.so_akhir),kode_pp:this.app._kodePP, kode_drk:'-', jenis:'BRG'};
					rows[rows.length] = {kode_akun:line.akun_hpp, nama:'-',dc:line.dchpp.toUpperCase(), keterangan:"Penyesuaian Persediaan Awal Barang", nilai: Math.abs(line.so_akhir),kode_pp:this.app._kodePP, kode_drk:'-', jenis:'HPP'};
				}
			}
			
			for (var i=0;i < this.sg.getRowCount();i++){
				if (nilaiToFloat(this.sg.cells(6,i)) != 0){
					var temu = false;
					for (var j in rows){
						if ((rows[j].kode_akun == this.sg.cells(7,i)) && (rows[j].keterangan != "Penyesuaian Persediaan Awal Barang")) {
							rows[j].nilai += nilaiToFloat(this.sg.cells(6,i));
							temu = true;
						}
					}
					if (!temu){
						rows[rows.length] = {kode_akun:this.sg.cells(7,i),nama:'-',dc:"D", keterangan: "Penyesuaian Persediaan Akhir Barang", nilai: nilaiToFloat(this.sg.cells(6,i)),kode_pp:this.app._kodePP, kode_drk:'-', jenis:'BRG'};
					}
					var temu2 = false;
					for (var k in rows){
						if ((rows[k].kode_akun == this.sg.cells(8,i)) && (rows[k].keterangan != "Penyesuaian Persediaan Awal Barang")) {
							rows[k].nilai += nilaiToFloat(this.sg.cells(6,i));
							temu2 = true;
						}
					}
					if (!temu2){
						rows[rows.length] = {kode_akun:this.sg.cells(8,i),nama:'-',dc:"C", keterangan: "Penyesuaian Persediaan Akhir Barang", nilai: nilaiToFloat(this.sg.cells(6,i)),kode_pp:this.app._kodePP, kode_drk:'-', jenis:'HPP'};
					}
				}
			} 
			this.dataJurnal = {rs: { 	rows:rows,
										fields : { 	kode_akun : {type:"S",length:80},
													nama :{type:"S",length:200},
													dc:{type:"S",length:50},
													keterangan:{type:"S",length:200},
													nilai:{type:"N", length:100},
													kode_pp:{type:"S",length:100},
													kode_drk:{type:"S",length:100},
													jenis:{type:"S",length:10}
											}
								   }
							};		
		}catch(e){
			system.alert(this,e,"");
		}
	},
	doClick:function(sender){
		if (sender == this.b_gen){	
			this.e_nb.setText(this.standarLib.noBuktiOtomatis(this.dbLib,"inv_hpp_m","no_hpp",this.app._lokasi+"-HPP"+this.e_periode.getText().substr(2,4)+".","0000"));
		    this.e_dok.setFocus();
		}
		if (sender == this.i_viewer){
			this.createJurnal();			
			this.jurnal.setData(this.dataJurnal);
			this.jurnal.show();
		}
	},
	doTampilClick: function(sender){
		try{									
			var data = this.dbLib.getDataProvider("select a.kode_brg,a.nama,a.tipe,a.sat,ifnull(b.stok,0) as stok,round(ifnull(d.havg,0),0) as havg,round(ifnull(d.havg,0),0)*ifnull(b.stok,0) as subttl,c.kode_akun,c.akun_hpp "+
												  "from inv_brg a inner join inv_brg_klp c on a.kode_klpbrg = c.kode_klpbrg and a.kode_lokasi = c.kode_lokasi "+
												  "               left outer join (select kode_brg,kode_lokasi,sum(case dc when 'D' then jumlah+bonus else -(jumlah+bonus) end) as stok "+
												  "                                from inv_dt where kode_lokasi='"+this.app._lokasi+"' and periode<='"+this.e_periode.getText()+"' group by kode_brg,kode_lokasi) b on a.kode_brg=b.kode_brg and a.kode_lokasi=b.kode_lokasi "+
												  "               left outer join (select kode_brg,kode_lokasi,sum(case dc when 'D' then harga*(jumlah+bonus) else -(harga*(jumlah+bonus)) end) / sum(case dc when 'D' then jumlah+bonus else -(jumlah+bonus) end)  as havg "+
												  "                                from inv_dt where kode_lokasi='"+this.app._lokasi+"' and periode<='"+this.e_periode.getText()+"' "+
												  "                                and modul = 'BELI' group by kode_brg,kode_lokasi) d on a.kode_brg=d.kode_brg and a.kode_lokasi=d.kode_lokasi ");
			eval("data = "+data+";");
			if (typeof data == "object"){
				var line;
				this.sg.clear();
				for (var i in data.rs.rows){
					line = data.rs.rows[i];							
					this.sg.appendData([line.kode_brg,line.nama,line.tipe,line.sat,floatToNilai(line.stok),floatToNilai(line.havg),floatToNilai(line.subttl),line.kode_akun,line.akun_hpp]);
				}
			}
			this.sg.validasi();
		}catch(e){
			systemAPI.alert(e);
		}
	},
	doBtnClick: function(sender, event){
		try
		{
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
	doSgChange: function(sender, col, row){
		var tot = 0;			
		for (var i = 0;i < this.sg.getRowCount();i++){
			if (this.sg.cells(6,i) != "") 
				tot += nilaiToFloat(this.sg.cells(6,i));
		}
		this.e_total.setText(floatToNilai(tot));
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