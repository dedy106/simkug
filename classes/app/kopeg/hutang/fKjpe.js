window.app_kopeg_hutang_fKjpe = function(owner)
{
	if (owner)
	{
		window.app_kopeg_hutang_fKjpe.prototype.parent.constructor.call(this,owner);
		this.className  = "app_kopeg_hutang_fKjpe";
		this.itemsValue = new portalui_arrayList();
		this.app._mainForm.childFormConfig(this, "mainButtonClick","Form Reklas KJPe: Input", 0);	
		
		uses("portalui_saiCBBL;portalui_saiEdit;portalui_datePicker;portalui_saiGrid;portalui_saiTable");
		this.e_periode = new portalui_saiLabelEdit(this,{bound:[20,10,200,20],caption:"Periode",readOnly:true,change:[this,"doChange"]});
		this.l_tgl = new portalui_label(this,{bound:[20,11,100,18],caption:"Tanggal", underline:true});
		this.dp_d1 = new portalui_datePicker(this,{bound:[120,11,100,18],selectDate:[this,"doSelectDate"],date:new Date().getDateStr()});
		this.e_nb = new portalui_saiLabelEdit(this,{bound:[20,13,250,20],caption:"No Bukti",maxLength:30,readOnly:true});
		this.b_gen = new portalui_button(this,{bound:[280,13,80,18],caption:"Gen",click:[this,"doClick"],icon:"icon/"+system.getThemes()+"/process.png"});		
		this.e_dok = new portalui_saiLabelEdit(this,{bound:[20,14,343,20],caption:"No Dokumen", maxLength:100,tag:1});		
		this.e_desc = new portalui_saiLabelEdit(this,{bound:[20,15,500,20],caption:"Keterangan", maxLength:150,tag:1});						
		this.cb_buat = new portalui_saiCBBL(this,{bound:[20,16,200,20],caption:"Dibuat Oleh",btnClick:[this,"doBtnClick"],tag:2});		
		this.cb_app = new portalui_saiCBBL(this,{bound:[20,17,200,20],caption:"Disetujui Oleh",btnClick:[this,"doBtnClick"],tag:2});		
		this.bTampil = new portalui_button(this,{bound:[620,17,80,18],caption:"Tampil",click:[this,"doTampilClick"]});		
		this.e_spp = new portalui_saiLabelEdit(this,{bound:[720,17,200,20],caption:"Nilai Reklas",tipeText:ttNilai,readOnly: true, tag:1,text:"0"});
		
		this.p1 = new portalui_panel(this,{bound:[20,30,900,290],caption:"Daftar Hutang Bank"});
		this.sg = new portalui_saiGrid(this.p1,{bound:[0,20,895,270],colCount:8,tag:1,
					colTitle:["No Hutang","Bank","Keterangan","Akun KJPa","Akun KJPe","Nilai Hutang","Sisa KJPa","Nilai KJPe"],
					colWidth:[[0,1,2,3,4,5,6,7],[100,130,200,60,60,100,100,100]],colFormat:[[5,6,7],[cfNilai,cfNilai,cfNilai]], 
					columnReadOnly:[true,[1,2,3,4,5,6],[7]],change:[this,"doChangeCell"],
					autoAppend:false,defaultRow:1,nilaiChange:[this,"doSgChange"]});				
		
		this.rearrangeChild(10, 22);
		setTipeButton(tbSimpan);
		this.maximize();		
		this.setTabChildIndex();
		
		try{			
			this.dbLib = new util_dbLib();
			this.dbLib.addListener(this);
			uses("util_standar");
			this.standarLib = new util_standar();
			
			this.cb_buat.setSQL("select nik,nama from karyawan where kode_lokasi = '"+this.app._lokasi+"'",["nik","nama"],true);
			this.cb_app.setSQL("select nik,nama from karyawan where kode_lokasi = '"+this.app._lokasi+"'",["nik","nama"],true);
			
		}catch(e){
			systemAPI.alert(e);
		}
	}
};
window.app_kopeg_hutang_fKjpe.extend(window.portalui_childForm);
window.app_kopeg_hutang_fKjpe.implement({
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
					this.e_nb.setText(this.standarLib.noBuktiOtomatis(this.dbLib,'kop_apkjpe_m','no_kjpe',this.app._lokasi+"-RAP"+this.e_periode.getText().substr(2,4)+".",'0000'));
					uses("server_util_arrayList");
					var sql = new server_util_arrayList();										
					var total = nilaiToFloat(this.e_spp.getText());
					sql.add("insert into kop_apkjpe_m (no_kjpe,no_dokumen,tanggal,keterangan,kode_curr,kurs,nik_buat,nik_app,kode_lokasi,"+
							"jenis,nilai,posted,periode,no_del,no_link,nik_user,tgl_input,kode_pp) values "+
							"('"+this.e_nb.getText()+"','"+this.e_dok.getText()+"','"+this.dp_d1.getDateString()+"','"+this.e_desc.getText()+"','IDR',1,'"+this.cb_buat.getText()+"','"+this.cb_app.getText()+"','"+this.app._lokasi+"',"+
							"'KJPE',"+parseNilai(this.e_spp.getText())+",'F','"+this.e_periode.getText()+"','-','-','"+this.app._userLog+"',now(),'"+this.app._kodePP+"')");
					var idx = 0;
					var scr1 = "";
					var baris1 = true; 
					for (var i=0; i < this.sg.rows.getLength(); i++){
						if (this.sg.rowValid(i)) {
							if (nilaiToFloat(this.sg.cells(7,i)) != 0){
								sql.add("insert into kop_ap_d (no_ap,no_kjpe,akun_kjpe,periode,dc,nilai,kode_lokasi,kurs,kode_curr)  values "+
								        "('"+this.sg.cells(0,i)+"','"+this.e_nb.getText()+"','"+this.sg.cells(4,i)+"','"+this.e_periode.getText()+"','D',"+parseNilai(this.sg.cells(7,i))+",'"+this.app._lokasi+"',1,'IDR')");								
								scr1 = "insert into kop_apkjpe_j (no_kjpe,no_dokumen,tanggal,no_urut,kode_akun,keterangan,dc,nilai,kode_pp,kode_drk,"+
									"kode_lokasi,modul,jenis,periode,kode_curr,kurs,nik_user,tgl_input) values ";
								scr1 += "('"+this.e_nb.getText()+"','"+this.e_dok.getText()+"','"+this.dp_d1.getDate()+"',"+idx+",'"+this.sg.getCell(3,i)+
										"','"+this.e_desc.getText()+"','D',"+parseNilai(this.sg.getCell(7,i))+",'"+this.app._kodePP+"','-',"+
										"'"+this.app._lokasi+"','APBANK','KJPA','"+this.e_periode.getText()+"','IDR',1,'"+this.app._userLog+"',now())";
								sql.add(scr1);
								idx++;
								scr1 = "insert into kop_apkjpe_j (no_kjpe,no_dokumen,tanggal,no_urut,kode_akun,keterangan,dc,nilai,kode_pp,kode_drk,"+
								"kode_lokasi,modul,jenis,periode,kode_curr,kurs,nik_user,tgl_input) values ";
								scr1 += "('"+this.e_nb.getText()+"','"+this.e_dok.getText()+"','"+this.dp_d1.getDate()+"',"+idx+",'"+this.sg.getCell(4,i)+
										"','"+this.e_desc.getText()+"','C',"+parseNilai(this.sg.getCell(7,i))+",'"+this.app._kodePP+"','-',"+
										"'"+this.app._lokasi+"','APBANK','KJPE','"+this.e_periode.getText()+"','IDR',1,'"+this.app._userLog+"',now())";
								baris1 = false;
								idx++;
								sql.add(scr1);
							}
						}
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
					this.standarLib.clearByTag(this, new Array("1","3"),this.e_nb);		
					this.sg.clear(1); 
				}
				break;
			case "simpan" :
                this.sg.validasi();
				if (nilaiToFloat(this.e_spp.getText()) <= 0){
					system.alert(this,"Transaksi tidak valid.","Nilai tidak boleh kurang atau sama dengan nol.");
					return false;
				}
				for (var i=0;i < this.sg.getRowCount();i++){
					if (nilaiToFloat(this.sg.cells(6,i)) < nilaiToFloat(this.sg.cells(7,i))) {
						system.alert(this,"Transaksi tidak valid.","Nilai KJPe melebihi sisa KJPa.");
						return false;   
					}
				}
				if (parseFloat(this.app._periode) > parseFloat(this.e_periode.getText())){
					system.alert(this,"Periode transaksi tidak valid.","Periode transaksi tidak boleh kurang dari periode aktif sistem.["+this.app._periode+"]");
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
				else this.simpan();
				break;
			case "simpancek" : this.simpan();			
				break;
		}
	},
	doClick:function(sender){
		this.e_nb.setText(this.standarLib.noBuktiOtomatis(this.dbLib,'kop_apkjpe_m','no_kjpe',this.app._lokasi+"-RAP"+this.e_periode.getText().substr(2,4)+".",'0000'));
		this.e_dok.setFocus();
	},
	doTampilClick: function(sender){
		try{			
			if (this.e_periode.getText() != ""){				
				var data = this.dbLib.getDataProvider("select a.no_ap,concat(a.kode_vendor,'-',x.nama) as vendor,a.keterangan,a.akun_kjpa,a.akun_kjpe,a.nilai_kjpe+a.nilai_kjpa as nilai,a.nilai_kjpe+a.nilai_kjpa-ifnull(b.tot,0) as sisa_kjpa, "+
													  "case when round(((a.nilai_kjpe+a.nilai_kjpa)/a.jbln)*12) < (a.nilai_kjpe+a.nilai_kjpa - ifnull(b.tot,0)) then round(((a.nilai_kjpe+a.nilai_kjpa)/a.jbln)*12) else a.nilai_kjpe+a.nilai_kjpa - ifnull(b.tot,0) end  as cicil "+
				                                      "from kop_ap_m a inner join vendor x on a.kode_vendor=x.kode_vendor and a.kode_lokasi=x.kode_lokasi "+
													  "     left outer join (select no_ap,kode_lokasi,sum(case dc when 'D' then nilai else -nilai end) as tot "+
													  "                      from kop_ap_d where kode_lokasi='"+this.app._lokasi+"' group by no_ap,kode_lokasi) b on a.no_ap=b.no_ap and a.kode_lokasi=b.kode_lokasi "+
													  "where (a.nilai_kjpe+a.nilai_kjpa > ifnull(b.tot,0)) and a.kode_lokasi='"+this.app._lokasi+"' and a.periode<='"+this.e_periode.getText()+"' "+
													  "order by a.kode_vendor,a.no_ap");
		 
				eval("data = "+data+";");
				if (typeof data == "object"){
					var line;
					this.sg.clear();
					for (var i in data.rs.rows){
						line = data.rs.rows[i];							
						this.sg.appendData([line.no_ap,line.vendor,line.keterangan,line.akun_kjpa,line.akun_kjpe,floatToNilai(line.nilai),floatToNilai(line.sisa_kjpa),floatToNilai(line.cicil)]);
					}
					this.sg.validasi();
				}
			}
			else {
				system.alert(this,"Periode tidak valid.","");
			}
		}catch(e){
			systemAPI.alert(e);
		}
	},
	doBtnClick: function(sender, event){
		try{
			if (sender == this.cb_buat) {   
			    this.standarLib.showListData(this, "Dibuat Oleh",sender,undefined, 
											  "select nik, nama  from karyawan where kode_lokasi='"+this.app._lokasi+"'",
											  "select count(nik) from karyawan where kode_lokasi='"+this.app._lokasi+"'",
											  ["nik","nama"],"and",["NIK","Nama"],false);				
			}
			if (sender == this.cb_app) {   
			    this.standarLib.showListData(this, "Disetujui Oleh",sender,undefined, 
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
	doChangeCell: function(sender, col, row){
		if ((col == 7) && (this.sg.getCell(7,row) != "")){
			this.sg.validasi();
		}
	},
	doSgChange: function(sender, col, row){
		var tot1 = 0;			
		for (var i = 0;i < this.sg.getRowCount();i++){
			if (this.sg.cells(7,i) != "") {
				tot1 += nilaiToFloat(this.sg.cells(7,i));
			}
		}
		this.e_spp.setText(floatToNilai(tot1));
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
	    		}    		
			}
			catch(e){
				systemAPI.alert("step : "+step+"; error = "+e);
			}
	    }
	}	
});
