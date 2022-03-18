window.app_saku2_transaksi_yks_hutang_fLoadOpta2 = function(owner)
{
	if (owner)
	{
		window.app_saku2_transaksi_yks_hutang_fLoadOpta2.prototype.parent.constructor.call(this, owner);
		this.className = "app_saku2_transaksi_yks_hutang_fLoadOpta2";
		this.app._mainForm.childFormConfig(this, "mainButtonClick","Form Load Data Billing Sisfo Yankesta", 0);	
		
		this.maximize();		
		uses("portalui_datePicker;portalui_saiCB;portalui_saiCBBL;portalui_pageControl;portalui_childPage;util_standar;portalui_saiGrid;portalui_sgNavigator");
		uses("portalui_saiGrid",true);		
		
		this.e_periode = new portalui_saiLabelEdit(this,{bound:[20,10,202,20],caption:"Periode",tag:2,readOnly:true,change:[this,"doChange"]});
		this.l_tgl1 = new portalui_label(this,{bound:[20,11,100,18],caption:"Tanggal", underline:true});
		this.dp_d1 = new portalui_datePicker(this,{bound:[120,11,100,18],selectDate:[this,"doSelectDate"]}); 
		this.e_nb = new portalui_saiLabelEdit(this,{bound:[20,12,202,20],caption:"No Bill", readOnly:true});
		this.i_gen = new portalui_imageButton(this,{bound:[225,12,20,20],hint:"Generate",image:"icon/"+system.getThemes()+"/tabCont2.png",click:[this,"doClick"]});
		this.e_dok = new saiLabelEdit(this,{bound:[20,13,450,20],caption:"No Dokumen", maxLength:50});		
		this.e_ket = new saiLabelEdit(this,{bound:[20,14,450,20],caption:"Deskripsi", maxLength:150});			
		this.cb_buat = new saiCBBL(this,{bound:[20,15,204,20],caption:"NIK Pembuat", multiSelection:false, maxLength:10, tag:2});				
		this.cb_app = new saiCBBL(this,{bound:[20,17,204,20],caption:"NIK Approve", multiSelection:false, maxLength:10, tag:2});							
		this.cb_data = new saiCBBL(this,{bound:[20,18,204,20],caption:"Data HR Peserta", multiSelection:false, maxLength:10, tag:2});
		this.l_tgl1 = new portalui_label(this,{bound:[20,11,100,18],caption:"Range Tanggal", underline:true});
		this.dp_d2 = new portalui_datePicker(this,{bound:[120,11,100,18]}); 
		this.dp_d3 = new portalui_datePicker(this,{bound:[240,11,100,18]}); 
		this.i_load = new portalui_imageButton(this,{bound:[345,11,20,20],hint:"Load Data",image:"icon/"+system.getThemes()+"/tabCont2.png",click:[this,"doClick"]});
		this.e_total = new saiLabelEdit(this,{bound:[702,11,220,20],caption:"Total Tagihan", tag:1, readOnly:true, tipeText:ttNilai, text:"0"});						
		
		this.p1 = new portalui_panel(this,{bound:[20,189,900,284],caption:"Data Billing"});
		this.sg = new portalui_saiGrid(this.p1,{bound:[0,20,this.p1.width-5,this.p1.height-50],colCount:10,				          
				colTitle:["Kode Mitra","No Resep","NIK","Nama Kary.","Band","Tgl Periksa","Nikes","Nama Pasien","ICD-X","Biaya"],
				colWidth:[[9,8,7,6,5,4,3,2,1,0],[80,80,150,70,80,70,150,80,80,80]],
				colFormat:[[9],[cfNilai]],
				readOnly:true, defaultRow:1
		});		
		this.sgn = new portalui_sgNavigator(this.p1,{bound:[0,this.p1.height-25,this.p1.width-1,25],buttonStyle:3, grid:this.sg, pager:[this,"doPager"]});
		
		this.dbLib = new util_dbLib();
		this.dbLib.addListener(this);
		this.standarLib = new util_standar();
		this.rearrangeChild(10,23);
		
		this.doSelectDate(this.dp_d1,this.dp_d1.year,this.dp_d1.month,this.dp_d1.day);		
		setTipeButton(tbSimpan);		
		this.setTabChildIndex();		
		
		var data = this.dbLib.getDataProvider("select nik,nama from karyawan where nik='"+this.app._userLog+"' and kode_lokasi='"+this.app._lokasi+"'",true);
		if (typeof data == "object" && data.rs.rows[0] != undefined){
			var line = data.rs.rows[0];							
			this.cb_buat.setText(line.nik,line.nama);
		} else this.cb_buat.setText("","");
		var data = this.dbLib.getDataProvider("select a.flag,b.nama from spro a inner join karyawan b on a.flag=b.nik and a.kode_lokasi=b.kode_lokasi where kode_spro='JUAPP' and a.kode_lokasi='"+this.app._lokasi+"'",true);
		if (typeof data == "object" && data.rs.rows[0] != undefined){
			var line = data.rs.rows[0];							
			this.cb_app.setText(line.flag,line.nama);
		} else this.cb_app.setText("","");			

		this.cb_data.setSQL("select no_load, keterangan from yk_peserta_m ",["no_load","keterangan"],false,["No Bukti","Keterangan"],"and","Data HR Peserta",true);			
		this.cb_buat.setSQL("select nik, nama from karyawan where kode_lokasi='"+this.app._lokasi+"'",["nik","nama"],false,["NIK","Nama"],"and","Data Karyawan",true);			
		this.cb_app.setSQL("select nik, nama from karyawan where kode_lokasi='"+this.app._lokasi+"'",["nik","nama"],false,["NIK","Nama"],"and","Data Karyawan",true);			
		var data = this.dbLib.getDataProvider("select flag from spro where kode_spro='PPBPCC' and kode_lokasi='"+this.app._lokasi+"'",true);
		if (typeof data == "object" && data.rs.rows[0] != undefined){
			var line = data.rs.rows[0];							
			this.kodepp = line.flag;
		} else this.kodepp = '-';
	}
};
window.app_saku2_transaksi_yks_hutang_fLoadOpta2.extend(window.portalui_childForm);
window.app_saku2_transaksi_yks_hutang_fLoadOpta2.implement({
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
			this.e_nb.setText(this.standarLib.noBuktiOtomatis(this.dbLib,'yk_bill_m','no_bill',this.app._lokasi+"-BIL"+this.e_periode.getText().substr(2,4)+".",'000'));
			if (this.standarLib.checkEmptyByTag(this, [0,1,2])){
				try{														
					uses("server_util_arrayList");
					var sql = new server_util_arrayList();					
					sql.add("insert into yk_bill_m(no_bill,kode_lokasi,periode,tanggal,keterangan,progress,nik_user,tgl_input,nilai,jenis,no_kasres) values "+ 
									"('"+this.e_nb.getText()+"','"+this.app._lokasi+"','"+this.e_periode.getText()+"','"+this.dp_d1.getDateString()+"','"+this.e_ket.getText()+"','0','"+this.app._userLog+"',getdate(),"+parseNilai(this.e_total.getText())+",'NONRESTITUSI','-')");
					
					sql.add("insert into yk_bill_d(no_bill,kode_lokasi,kode_vendor,no_ref,nik,nama,loker,band,nikkes,pasien,tgl_masuk,tgl_keluar,icdx,kode_produk,nilai,nilai_kunj,nilai_cs,loker_valid,no_hutang,no_piutang,loker_bast,no_kas,jenis,periode) "+
							"select '"+this.e_nb.getText()+"','"+this.app._lokasi+"',b.kode_vendor,a.no_resep,a.nik,nm_pegawai,'-',a.band_posisi,a.nikes,a.nm_peserta,a.tgl_periksa,a.tgl_periksa,a.icdx,a.kode_biaya,round(a.biaya,0),0,0,'-','-','-','-','-','NONRESTITUSI','"+this.e_periode.getText()+"' "+
							"from yk_bill_temp a inner join yk_mitra_kes c on a.kd_mitra=c.kd_mitra "+
						    "                    inner join vendor b on c.kode_vendor=b.kode_vendor and ('0'+substring(c.kd_mitra,1,1))=b.kode_lokasi "+
						    "where ('0'+a.kdarea)='"+this.app._lokasi+"' and a.tgl_periksa between '"+this.dp_d2.getDateString()+" 00:00:00' and '"+this.dp_d3.getDateString()+" 23:59:59'");
					
					sql.add("update a set a.loker=b.loker "+
							"from yk_bill_d a inner join yk_peserta_d b on a.nik=b.nik and b.no_load='"+this.cb_data.getText()+"' "+
							"where a.no_bill ='"+this.e_nb.getText()+"' and a.kode_lokasi='"+this.app._lokasi+"'");
										
					sql.add("update yk_bill_temp set progress ='1' where ('0'+kdarea)='"+this.app._lokasi+"' and tgl_periksa between '"+this.dp_d2.getDateString()+" 00:00:00' and '"+this.dp_d3.getDateString()+" 23:59:59'");
					
					/* JURNAL LANGSUNG,,tidak perlu load di jurnal hutang,,bar gak ngalir
					sql.add("insert into yk_hutang_j(no_hutang,no_dokumen,tanggal,no_urut,kode_akun,keterangan,dc,nilai,kode_pp,kode_drk,kode_lokasi,modul,jenis,periode,nik_user,tgl_input,kode_curr,kurs) "+
							"select no_valid,'"+this.e_dok.getText()+"','"+this.dp_d1.getDateString()+"',0, "+
							"case when substring(a.kode_cust,1,3) <> 'PEN' then b.akun_bp else b.akun_cc end as kode_akun, "+
							"'"+this.e_ket.getText()+"','D',sum(nilai),'"+this.kodepp+"', "+
							"case when substring(a.kode_cust,1,3) <> 'PEN' then b.kode_drkbp else b.kode_drkcc end as kode_drk,"+
							"'"+this.app._lokasi+"','SISFO','PIU','"+this.e_periode.getText()+"','"+this.app._userLog+"',getdate(),'IDR',1 "+
							"from yk_valid_d a "+
							"		 inner join yk_produk b on a.kode_produk=b.kode_produk "+
							"where a.no_valid = '"+this.e_nb.getText()+"' and a.kode_lokasi = '"+this.app._lokasi+"' "+
							"group by no_valid,case when substring(a.kode_cust,1,3) <> 'PEN' then b.akun_bp else b.akun_cc end,"+
							"         case when substring(a.kode_cust,1,3) <> 'PEN' then b.kode_drkbp else b.kode_drkcc end");
							
					sql.add("insert into yk_hutang_j(no_hutang,no_dokumen,tanggal,no_urut,kode_akun,keterangan,dc,nilai,kode_pp,kode_drk,kode_lokasi,modul,jenis,periode,nik_user,tgl_input,kode_curr,kurs) "+
						   "select '"+this.e_nb.getText()+"','"+this.e_dok.getText()+"','"+this.dp_d1.getDateString()+"',1,'2121030001', "+
						   "'"+this.e_ket.getText()+"','C',sum(nilai_bp),'"+this.kodepp+"', "+
						   "'-','"+this.app._lokasi+"','SISFO','PEGAWAI','"+this.e_periode.getText()+"','"+this.app._userLog+"',getdate(), "+
						   "'IDR',1 "+
						   "from yk_hutang_d where no_hutang='"+this.e_nb.getText()+"' and kode_lokasi ='"+this.app._lokasi+"' "+
						   "union "+
						   "select '"+this.e_nb.getText()+"','"+this.e_dok.getText()+"','"+this.dp_d1.getDateString()+"',1,'2122230001', "+
						   "'"+this.e_ket.getText()+"','C',sum(nilai_cc),'"+this.kodepp+"', "+
						   "'-','"+this.app._lokasi+"','SISFO','PENSIUN','"+this.e_periode.getText()+"','"+this.app._userLog+"',getdate(), "+
						   "'IDR',1 "+
						   "from yk_hutang_d where no_hutang='"+this.e_nb.getText()+"' and kode_lokasi ='"+this.app._lokasi+"' ");

					*/
					
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
				if (modalResult == mrOk){
					this.standarLib.clearByTag(this, [0,1],undefined);				
					this.sg.clear(1); 
					setTipeButton(tbSimpan);
				}
				break;
			case "simpan" :	
				this.app._periode = this.dbLib.getPeriode(this.app._lokasi);
				if (nilaiToFloat(this.e_total.getText()) <= 0) {
					system.alert(this,"Transaksi tidak valid.","Total tidak boleh nol atau kurang.");
					return false;						
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
				this.simpan();
				break;				
			case "simpancek" : this.simpan();			
				break;
		}
	},
	doSelectDate: function(sender, y,m,d){
		if (m < 10) m = "0" + m;			
		if (parseFloat(this.app._periode.substr(4,2)) <= 12) this.e_periode.setText(y+""+m);
		else this.e_periode.setText(this.app._periode);
		this.e_nb.setText("");
	},	
	doClick: function(sender){
		if (sender == this.i_gen) {
			this.e_nb.setText(this.standarLib.noBuktiOtomatis(this.dbLib,'yk_bill_m','no_bill',this.app._lokasi+"-BIL"+this.e_periode.getText().substr(2,4)+".",'000'));
			this.e_dok.setFocus();
		}
		if (sender == this.i_load) {
			this.sg.clear();			
			var data = this.dbLib.getDataProvider("select b.kode_vendor as kd_mitra,a.no_resep,a.nik,a.nm_pegawai,a.band_posisi,convert(varchar,a.tgl_periksa,103) as tanggal,a.nikes,a.nm_peserta,a.icdx,round(a.biaya,0) as biaya "+
			                                      "from yk_bill_temp a inner join yk_mitra_kes c on a.kd_mitra=c.kd_mitra "+
												  "                    inner join vendor b on c.kode_vendor=b.kode_vendor and ('0'+substring(c.kd_mitra,1,1))=b.kode_lokasi "+
												  "where a.progress ='0' and ('0'+a.kdarea)='"+this.app._lokasi+"' and a.tgl_periksa between '"+this.dp_d2.getDateString()+" 00:00:00' and '"+this.dp_d3.getDateString()+" 23:59:59'",true);
			if (typeof data == "object" && data.rs.rows[0] != undefined){
				this.dataJU = data;
				var total = 0;
				for (var i=0;i<this.dataJU.rs.rows.length;i++){
					line = this.dataJU.rs.rows[i];							
					total += parseFloat(line.biaya);
				}
				this.e_total.setText(floatToNilai(total));
				
				this.sgn.setTotalPage(Math.ceil(data.rs.rows.length/20));
				this.sgn.rearrange();
				this.doTampilData(1);
			} else this.sg.clear(1);
		}
	},		
	doTampilData: function(page) {
		this.sg.clear(); 
		var line;
		this.page = page;
		var start = (page - 1) * 20;
		var finish = (start + 20 > this.dataJU.rs.rows.length? this.dataJU.rs.rows.length:start+20);
		for (var i=start;i<finish;i++){
			line = this.dataJU.rs.rows[i];							
			this.sg.appendData([line.kd_mitra,line.no_resep,line.nik,line.nm_pegawai,line.band_posisi,line.tanggal,line.nikes,line.nm_peserta,line.icdx,floatToNilai(line.biaya)]);
		}
		this.sg.setNoUrut(start);
	},
	doPager: function(sender, page) {
		this.doTampilData(page);
	},
	doRequestReady: function(sender, methodName, result){
		if (sender == this.dbLib){
			switch(methodName){
				case "execArraySQL":
					if (result.toLowerCase().search("error") == -1){
						this.app._mainForm.pesan(2,"Transaksi Sukses ("+ this.e_nb.getText()+")");
						this.app._mainForm.bClear.click();              
					}else
						system.info(this, result,"");											
				break;
			}
		}		
	}
});
