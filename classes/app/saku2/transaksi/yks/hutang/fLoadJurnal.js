window.app_saku2_transaksi_yks_hutang_fLoadJurnal = function(owner)
{
	if (owner)
	{
		window.app_saku2_transaksi_yks_hutang_fLoadJurnal.prototype.parent.constructor.call(this, owner);
		this.className = "app_saku2_transaksi_yks_hutang_fLoadJurnal";
		this.app._mainForm.childFormConfig(this, "mainButtonClick","Form Load Data Jurnal Akru", 0);	
		
		this.maximize();		
		uses("portalui_uploader;portalui_datePicker;portalui_saiCB;portalui_saiCBBL;portalui_pageControl;portalui_childPage;util_standar;portalui_saiGrid;portalui_sgNavigator");
		uses("portalui_saiGrid",true);		
		
		this.e_periode = new portalui_saiLabelEdit(this,{bound:[20,10,202,20],caption:"Periode",tag:2,readOnly:true,change:[this,"doChange"]});
		this.l_tgl1 = new portalui_label(this,{bound:[20,11,100,18],caption:"Tanggal", underline:true});
		this.dp_d1 = new portalui_datePicker(this,{bound:[120,11,100,18],selectDate:[this,"doSelectDate"]}); 
		this.e_nb = new portalui_saiLabelEdit(this,{bound:[20,12,202,20],caption:"No Hutang", readOnly:true});
		this.i_gen = new portalui_imageButton(this,{bound:[225,12,20,20],hint:"Generate",image:"icon/"+system.getThemes()+"/tabCont2.png",click:[this,"doClick"]});
		this.e_dok = new saiLabelEdit(this,{bound:[20,13,450,20],caption:"No Dokumen", maxLength:50});		
		this.e_ket = new saiLabelEdit(this,{bound:[20,14,450,20],caption:"Deskripsi", maxLength:150});			
		this.cb_buat = new saiCBBL(this,{bound:[20,15,200,20],caption:"NIK Pembuat", multiSelection:false, maxLength:10, tag:2});		
		this.e_pph = new saiLabelEdit(this,{bound:[702,15,220,20],caption:"Nilai PPh", tag:1, readOnly:true, tipeText:ttNilai, text:"0"});				
		this.cb_app = new saiCBBL(this,{bound:[20,17,200,20],caption:"NIK Approve", multiSelection:false, maxLength:10, tag:2});					
		this.e_total = new saiLabelEdit(this,{bound:[702,17,220,20],caption:"Total Tagihan", tag:1, readOnly:true, tipeText:ttNilai, text:"0"});						
		this.bUpload = new portalui_uploader(this,{bound:[580,17,100,20],param3:"object",param4:"gridupload",afterUpload:[this,"doAfterUpload"],autoSubmit:true});		
		
		this.p1 = new portalui_panel(this,{bound:[20,189,900,324],caption:"Data Jurnal"});
		this.sg1 = new portalui_saiGrid(this.p1,{bound:[0,20,this.p1.width-5,this.p1.height-50],colCount:10,
				colTitle:["DRK","Akun Debet","Akun Kredit","Kode Mitra","Nama Mitra","Loker","Periode","Tagihan","PPh","Total"],
				colWidth:[[9,8,7,6,5,4,3,2,1,0],[100,100,100,150,70,150,80,80,80,80]],
				colFormat:[[7,8,9],[cfNilai,cfNilai,cfNilai]],
				readOnly:true, defaultRow:1
		});		
		this.sgn = new portalui_sgNavigator(this.p1,{bound:[0,this.p1.height-25,this.p1.width-1,25],buttonStyle:3, grid:this.sg1, pager:[this,"selectPage"]});		
		
		this.bRefresh = new portalui_imageButton(this.sgn,{bound:[this.sgn.width - 25,2,22,22],image:"icon/"+system.getThemes()+"/reload.png", hint:"Clear",click:[this,"doClick"]});
		this.sgn.uploader.setParam3("object");
		this.sg1.setAllowBlank(true);
		
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

		this.cb_buat.setSQL("select nik, nama from karyawan where kode_lokasi='"+this.app._lokasi+"'",["nik","nama"],false,["NIK","Nama"],"and","Data Karyawan",true);			
		this.cb_app.setSQL("select nik, nama from karyawan where kode_lokasi='"+this.app._lokasi+"'",["nik","nama"],false,["NIK","Nama"],"and","Data Karyawan",true);			
		var data = this.dbLib.getDataProvider("select flag from spro where kode_spro='PPBPCC' and kode_lokasi='"+this.app._lokasi+"'",true);
		if (typeof data == "object" && data.rs.rows[0] != undefined){
			var line = data.rs.rows[0];							
			this.kodepp = line.flag;
		} else this.kodepp = '-';
	}
};
window.app_saku2_transaksi_yks_hutang_fLoadJurnal.extend(window.portalui_childForm);
window.app_saku2_transaksi_yks_hutang_fLoadJurnal.implement({
	doAfterUpload: function(sender, result, data){		
	    try{   			
			this.dataUpload = data;
			if (result) {								
				this.sg1.clear();				
				this.selectPage(undefined, 1);
				this.sgn.setTotalPage(Math.ceil(this.dataUpload.rows.length / 20));
				this.sgn.rearrange();
				this.sgn.activePage = 0;	
			}else throw(data);		
			var line;
			var tot = pph = 0;
			for (var i=0; i < this.dataUpload.rows.length;i++){
				line = this.dataUpload.rows[i];
				tot += parseFloat(line.total);
				pph += parseFloat(line.pph);
			}
			this.e_total.setText(floatToNilai(tot));
			this.e_pph.setText(floatToNilai(pph));
   		}catch(e){
   		   this.sg1.hideLoading();
   		   systemAPI.alert(e,"Proses Berhenti.");
        }
	},
	selectPage: function(sender,page){
		var start = (page - 1) * 20;
		var finish = start + 20;
		finish = (finish > this.dataUpload.rows.length ? this.dataUpload.rows.length : finish);
		this.sg1.clear();
		for (var i=start; i < finish;i++){
			line = this.dataUpload.rows[i];
			this.sg1.appendData([line.drk,line.akun_debet,line.akun_kredit,line.kode_mitra,line.nama_mitra,line.loker,line.periode,floatToNilai(line.tagihan),floatToNilai(line.pph),floatToNilai(line.total)]);
		}
		this.sg1.setNoUrut(start);
	},
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
	doModalResult: function(event, modalResult){
		if (modalResult != mrOk) return false;
		switch (event){
			case "clear" :
				if (modalResult == mrOk){
					this.standarLib.clearByTag(this, [0,1],undefined);				
					this.sg1.clear(1); 
					setTipeButton(tbSimpan);
				}
				break;
			case "simpan" :	
					this.app._periode = this.dbLib.getPeriode(this.app._lokasi);
					this.e_nb.setText(this.standarLib.noBuktiOtomatis(this.dbLib,"yk_hutang_m","no_hutang",this.app._lokasi+"-HUT"+this.e_periode.getText().substr(2,4)+".","000"));
					if (this.standarLib.checkEmptyByTag(this, [0,1,2])){
						try{
							uses("server_util_arrayList");
							var sql = new server_util_arrayList();								
							sql.add("insert into yk_hutang_m(no_hutang,kode_lokasi,periode,tanggal,no_dokumen,keterangan,kode_pp,modul,jenis,kode_curr,kurs,nilai,nik_buat,nik_setuju,posted,tgl_input,nik_user) values "+
									"('"+this.e_nb.getText()+"','"+this.app._lokasi+"','"+this.e_periode.getText()+"','"+this.dp_d1.getDateString()+"','"+this.e_dok.getText()+"','"+this.e_ket.getText()+"','-','HUT','NONBILL','IDR',1,"+parseNilai(this.e_total.getText())+",'"+this.cb_buat.getText()+"','"+this.cb_app.getText()+"','F',getdate(),'"+this.app._userLog+"')");	
							
							var line;
							for (var i=0; i < this.dataUpload.rows.length;i++){
								line = this.dataUpload.rows[i];
								sql.add("insert into yk_loadjurnal_d(no_hutang,kode_lokasi,kode_drk,akun_debet,akun_kredit,kode_vendor,nama_vendor,loker,keterangan,nilai,pph,total) values "+
										"	('"+this.e_nb.getText()+"','"+this.app._lokasi+"','"+line.drk+"','"+line.akun_debet+"','"+line.akun_kredit+"','"+line.kode_mitra+"','"+line.nama_mitra.substr(0,50)+"','"+line.loker+"','"+line.periode.substr(0,150)+"',"+line.tagihan+","+line.pph+","+line.total+")");
							}														
							sql.add("insert into yk_hutang_j(no_hutang,no_dokumen,tanggal,no_urut,kode_akun,keterangan,dc,nilai,kode_pp,kode_drk,kode_lokasi,modul,jenis,periode,nik_user,tgl_input,kode_curr,kurs) "+
									"select '"+this.e_nb.getText()+"','"+this.e_dok.getText()+"','"+this.dp_d1.getDateString()+"',0,akun_debet,'"+this.e_ket.getText()+"','D',sum(total) as nilai, "+
									"'"+this.kodepp+"',kode_drk,'"+this.app._lokasi+"','PIU', "+
									"case substring(loker,1,3) when 'PEN' then 'PENSIUN' else 'PEGAWAI' end as jenis, "+
									"'"+this.e_periode.getText()+"','"+this.app._userLog+"',getdate(),'IDR',1 "+
									"from yk_loadjurnal_d where no_hutang = '"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"' "+
									"group by akun_debet,kode_drk,case substring(loker,1,3) when 'PEN' then 'PENSIUN' else 'PEGAWAI' end "+
									"union "+		
									"select '"+this.e_nb.getText()+"','"+this.e_dok.getText()+"','"+this.dp_d1.getDateString()+"',1,akun_kredit,'"+this.e_ket.getText()+"','C',sum(nilai) as nilai, "+
									"'"+this.kodepp+"','-','"+this.app._lokasi+"','HUT', "+
									"case substring(loker,1,3) when 'PEN' then 'PENSIUN' else 'PEGAWAI' end as jenis, "+
									"'"+this.e_periode.getText()+"','"+this.app._userLog+"',getdate(),'IDR',1 "+
									"from yk_loadjurnal_d where no_hutang = '"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"' "+
									"group by akun_kredit,case substring(loker,1,3) when 'PEN' then 'PENSIUN' else 'PEGAWAI' end "+
									"union "+
									"select '"+this.e_nb.getText()+"','"+this.e_dok.getText()+"','"+this.dp_d1.getDateString()+"',2,'"+this.akunpph+"','"+this.e_ket.getText()+"','C',sum(pph) as nilai, "+
									"'"+this.kodepp+"','-','"+this.app._lokasi+"','HUT', "+
									"'PPH' as jenis, "+
									"'"+this.e_periode.getText()+"','"+this.app._userLog+"',getdate(),'IDR',1 "+
									"from yk_loadjurnal_d where no_hutang = '"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"' ");
							
							sql.add("insert into yk_hutang_d(no_hutang,kode_lokasi,no_inv,periode,kode_vendor,bank,cabang,no_rek,nama_rek,nilai_bp,nilai_cc,bank_trans,no_kas,kode_lokkas,no_rekon,kode_lokrek,no_app) "+
									"select '"+this.e_nb.getText()+"','"+this.app._lokasi+"','"+this.e_dok.getText()+"','"+this.e_periode.getText()+"',a.kode_vendor,'-','-','-','-',isnull(b.nilai_bp,0) as nilai_bp, "+
									"isnull(b.nilai_cc,0) as nilai_cc,'-','-','-','-','-','-' "+
									"from (select distinct kode_vendor from yk_loadjurnal_d where no_hutang='"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"') a "+
									"	 left join      "+
									"	( "+
									"	 select kode_vendor,kode_lokasi, "+
									"		 sum(case when substring(loker,1,3)='PEN' then nilai else 0 end) as nilai_cc, "+
									"		 sum(case when substring(loker,1,3)<>'PEN' then nilai else 0 end) as nilai_bp "+
									"	 from yk_loadjurnal_d  where no_hutang='"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"' "+
									"	 group by kode_vendor,kode_lokasi "+
									"	) b on a.kode_vendor=b.kode_vendor and b.kode_lokasi ='"+this.app._lokasi+"' ");

							sql.add("update a set a.bank=b.bank,a.cabang=b.cabang,a.no_rek=b.no_rek,a.nama_rek=b.nama_rek,a.bank_trans=b.bank_trans "+
									"from yk_hutang_d a inner join vendor b on a.kode_vendor=b.kode_vendor and a.kode_lokasi=b.kode_lokasi "+
									"where a.no_hutang='"+this.e_nb.getText()+"' and a.kode_lokasi='"+this.app._lokasi+"'");
							
							setTipeButton(tbAllFalse);
							this.dbLib.execArraySQL(sql);
						}catch(e){
							systemAPI.alert(e);
						}
					}
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
			this.e_nb.setText(this.standarLib.noBuktiOtomatis(this.dbLib,"yk_hutang_m","no_hutang",this.app._lokasi+"-HUT"+this.e_periode.getText().substr(2,4)+".","000"));
			this.e_dok.setFocus();
		}
		if (sender == this.bRefresh) this.sg1.clear(1);
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
