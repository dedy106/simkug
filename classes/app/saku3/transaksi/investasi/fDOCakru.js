window.app_saku3_transaksi_investasi_fDOCakru = function(owner)
{
	if (owner)
	{
		window.app_saku3_transaksi_investasi_fDOCakru.prototype.parent.constructor.call(this,owner);
		this.className  = "app_saku3_transaksi_investasi_fDOCakru";
		this.itemsValue = new arrayList();
		this.app._mainForm.childFormConfig(this, "mainButtonClick","Form Akru Bunga Deposito", 0);	
		
		uses("saiCBBL;saiEdit;datePicker;saiGrid;sgNavigator");
		this.e_periode = new portalui_saiLabelEdit(this,{bound:[20,14,202,20],caption:"Periode",tag:2,readOnly:true,change:[this,"doChange"]});
		this.l_tgl1 = new portalui_label(this,{bound:[20,11,100,18],caption:"Tanggal", underline:true});
		this.dp_d1 = new portalui_datePicker(this,{bound:[120,11,100,18],selectDate:[this,"doSelectDate"]}); 
		this.e_nb = new portalui_saiLabelEdit(this,{bound:[20,12,202,20],caption:"No Bukti",maxLength:30,readOnly:true});
		this.i_gen = new portalui_imageButton(this,{bound:[225,12,20,20],hint:"Generate",image:"icon/"+system.getThemes()+"/tabCont2.png",click:[this,"doClick"]});
		this.e_ket = new saiLabelEdit(this,{bound:[20,17,450,20],caption:"Deskripsi", maxLength:150});		
		this.cb_drk = new saiCBBL(this,{bound:[20,18,200,20],caption:"DRK BuDep", multiSelection:false, maxLength:10, tag:2 });
		this.cb_pp = new saiCBBL(this,{bound:[20,15,200,20],caption:"PP/Unit", multiSelection:false, maxLength:10, tag:2 });
		this.cb_buat = new saiCBBL(this,{bound:[20,16,200,20],caption:"NIK Pembuat", multiSelection:false, maxLength:10, tag:2 });
		this.cb_app = new saiCBBL(this,{bound:[20,17,200,20],caption:"NIK Approve", multiSelection:false, maxLength:10, tag:2});
		
		this.e_nilai = new saiLabelEdit(this,{bound:[720,17,200,20],caption:"Total Akru", tag:1, readOnly:true, tipeText:ttNilai, text:"0"});		
		this.bTampil = new portalui_button(this,{bound:[620,17,80,18],caption:"Tampil Data",click:[this,"doLoadData"]});		
	
		this.p1 = new panel(this,{bound:[20,23,900,313],caption:"Data Deposito"});
		this.sg = new saiGrid(this.p1,{bound:[1,20,this.p1.width-5,this.p1.height-50],colCount:11,tag:9,
		            colTitle:["No Deposito","Keterangan","Akun Piutang","Akun Pdpt","Tgl Awal","Tgl Akhir","Jml Hari","Basis","Rate","Nominal","Nilai Akru"],										
					colWidth:[[10,9,8,7,6,5,4,3,2,1,0],[90,90,50,50,50,60,70,70,70,150,100]],
					colFormat:[[6,7,8,9,10],[cfNilai,cfNilai,cfNilai,cfNilai,cfNilai]],readOnly: true,autoAppend:false,defaultRow:1});
		this.sgn = new portalui_sgNavigator(this.p1,{bound:[1,this.p1.height-25,this.p1.width-1,25],buttonStyle:bsAll,grid:this.sg,pager:[this,"doPager"]});	
		
		this.rearrangeChild(10, 23);
		
		setTipeButton(tbSimpan);
		this.maximize();		
		this.setTabChildIndex();
		try {
			this.dbLib = new util_dbLib();
			this.dbLib.addListener(this);
			uses("util_standar");
			this.standarLib = new util_standar();
			this.doSelectDate(this.dp_d1,this.dp_d1.year,this.dp_d1.month,this.dp_d1.day);
						
			this.cb_pp.setSQL("select kode_pp, nama from pp where kode_lokasi='"+this.app._lokasi+"'",["kode_pp","nama"],false,["Kode","Nama"],"and","Data PP/Unit",true);
			this.cb_buat.setSQL("select nik, nama from karyawan where kode_lokasi='"+this.app._lokasi+"'",["nik","nama"],false,["NIK","Nama"],"and","Data NIK Pembuat",true);
			this.cb_app.setSQL("select nik, nama from karyawan where kode_lokasi='"+this.app._lokasi+"'",["nik","nama"],false,["NIK","Nama"],"and","Data NIK Approval",true);
			var data = this.dbLib.getDataProvider("select nik,nama from karyawan where nik='"+this.app._userLog+"' and kode_lokasi='"+this.app._lokasi+"'",true);
			if (typeof data == "object" && data.rs.rows[0] != undefined){
				var line = data.rs.rows[0];							
				this.cb_buat.setText(line.nik,line.nama);
			} else this.cb_buat.setText("","");
			var data = this.dbLib.getDataProvider("select a.flag,b.nama from spro a inner join karyawan b on a.flag=b.nik and a.kode_lokasi=b.kode_lokasi where kode_spro='INAPP' and a.kode_lokasi='"+this.app._lokasi+"'",true);
			if (typeof data == "object" && data.rs.rows[0] != undefined){
				var line = data.rs.rows[0];							
				this.cb_app.setText(line.flag,line.nama);
			} else this.cb_app.setText("","");
			
			var data = this.dbLib.getDataProvider("select flag from spro where kode_spro='BUDEPDRK' and kode_lokasi='"+this.app._lokasi+"'",true);
			if (typeof data == "object" && data.rs.rows[0] != undefined){
				var line = data.rs.rows[0];							
				this.cb_drk.setText(line.flag);
			}
			
			this.cb_pp.setText(this.app._kodePP);
		}catch(e){
			systemAPI.alert(e);
		}
	}
};
window.app_saku3_transaksi_investasi_fDOCakru.extend(window.childForm);
window.app_saku3_transaksi_investasi_fDOCakru.implement({
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
			this.doClick(this.i_gen);
			if (this.standarLib.checkEmptyByTag(this, [0,1,2])){
				try{													
					uses("server_util_arrayList");
					var sql = new server_util_arrayList();
					sql.add("insert into inv_depoakru_m(no_akru,no_dokumen,tanggal,keterangan,kode_curr,kurs,nilai,kode_pp,kode_drk,posted,modul,nik_buat,nik_setuju,kode_lokasi,periode,no_del,no_link,nik_user,tgl_input) values "+
						    "('"+this.e_nb.getText()+"','-','"+this.dp_d1.getDateString()+"','"+this.e_ket.getText()+"','IDR',1,"+parseNilai(this.e_nilai.getText())+",'"+this.cb_pp.getText()+"','"+this.cb_drk.getText()+"','F','DOCAKRU','"+this.cb_buat.getText()+"','"+this.cb_app.getText()+"','"+this.app._lokasi+"','"+this.e_periode.getText()+"','-','-','"+this.app._userLog+"',getdate())");										
					
					
					/*
					select * From inv_depo_m where no_depo = '99-DEPO1208.060'
					
					sql.add("insert into inv_depoakru_j(no_akru,no_dokumen,tanggal,no_urut,kode_akun,keterangan,dc,nilai,kode_pp,kode_drk,kode_lokasi,modul,jenis,periode,kode_curr,kurs,nik_user,tgl_input) "+
							"select '"+this.e_nb.getText()+"','-','"+this.dp_d1.getDateString()+"',0,akun_piutang,'"+this.e_ket.getText()+"','D',sum(round(((nilai*p_bunga/100)/basis)*datediff(day,tgl_akru,case when tgl_selesai<=(dateadd(s,-1,dateadd(mm, datediff(m,0,tgl_akru)+1,0))) then tgl_selesai else (dateadd(s,-1,dateadd(mm, datediff(m,0,tgl_akru)+1,0)))  end),0)) - sum(round(((nilai*p_bunga/100)/basis)*datediff(day,tgl_akru,case when tgl_selesai<=(dateadd(s,-1,dateadd(mm, datediff(m,0,tgl_akru)+1,0))) then tgl_selesai else (dateadd(s,-1,dateadd(mm, datediff(m,0,tgl_akru)+1,0)))  end)*20/100,0)),'"+this.cb_pp.getText()+"','"+this.cb_drk.getText()+"','"+this.app._lokasi+"','DOCAKRU','PIU','"+this.e_periode.getText()+"','IDR',1,'"+this.app._userLog+"',getdate() "+
							"from inv_depo_m where datediff(month,tgl_akru,tgl_selesai )<>0 and tgl_akru<tgl_selesai and progress in ('1','X') and tgl_akru <= (dateadd(s,-1,dateadd(mm, datediff(m,0,'"+this.dp_d1.getDateString()+"')+1,0))) group by akun_piutang");
					sql.add("insert into inv_depoakru_j(no_akru,no_dokumen,tanggal,no_urut,kode_akun,keterangan,dc,nilai,kode_pp,kode_drk,kode_lokasi,modul,jenis,periode,kode_curr,kurs,nik_user,tgl_input) "+
							"select '"+this.e_nb.getText()+"','-','"+this.dp_d1.getDateString()+"',1,akun_pdpt,'"+this.e_ket.getText()+"','C',sum(round(((nilai*p_bunga/100)/basis)*datediff(day,tgl_akru,case when tgl_selesai<=(dateadd(s,-1,dateadd(mm, datediff(m,0,tgl_akru)+1,0))) then tgl_selesai else (dateadd(s,-1,dateadd(mm, datediff(m,0,tgl_akru)+1,0))) end),0))  - sum(round(((nilai*p_bunga/100)/basis)*datediff(day,tgl_akru,case when tgl_selesai<=(dateadd(s,-1,dateadd(mm, datediff(m,0,tgl_akru)+1,0))) then tgl_selesai else (dateadd(s,-1,dateadd(mm, datediff(m,0,tgl_akru)+1,0)))  end)*20/100,0)),'"+this.cb_pp.getText()+"','"+this.cb_drk.getText()+"','"+this.app._lokasi+"','DOCAKRU','PDPT','"+this.e_periode.getText()+"','IDR',1,'"+this.app._userLog+"',getdate() "+
							"from inv_depo_m where datediff(month,tgl_akru,tgl_selesai )<>0 and tgl_akru<tgl_selesai and progress in ('1','X') and tgl_akru <= (dateadd(mm, datediff(m,0,'"+this.dp_d1.getDateString()+"')+1,0)) group by akun_pdpt");
					*/
					
					sql.add("insert into inv_depoakru_d(no_akru,no_depo,periode,nilai,kode_lokasi,akun_piutang,akun_pdpt,kode_pp,kode_drk,dc,no_del,nilai_depo,jml_hari,tgl_awal,tgl_akhir,no_cair,no_kas,nilai_cair,pajak_akru,nilai_hitung,pajak_hitung,nilai_adm) "+
					        "select '"+this.e_nb.getText()+"',no_depo,'"+this.e_periode.getText()+"',"+
							"round(((nilai*p_bunga/100)/basis)*datediff(day,tgl_akru,case when tgl_selesai<=(dateadd(s,-1,dateadd(mm, datediff(m,0,tgl_akru)+1,0))) then tgl_selesai else (dateadd(s,-1,dateadd(mm, datediff(m,0,tgl_akru)+1,0))) end),0), "+
							"kode_lokasi,akun_piutang,akun_pdpt,'"+this.cb_pp.getText()+"','"+this.cb_drk.getText()+"','D','-',nilai,datediff(day,tgl_akru,case when tgl_selesai<=(dateadd(s,-1,dateadd(mm, datediff(m,0,tgl_akru)+1,0))) then tgl_selesai else (dateadd(s,-1,dateadd(mm, datediff(m,0,tgl_akru)+1,0))) end),tgl_akru,case when tgl_selesai<=(dateadd(s,-1,dateadd(mm, datediff(m,0,tgl_akru)+1,0))) then tgl_selesai else (dateadd(s,-1,dateadd(mm, datediff(m,0,tgl_akru)+1,0))) end,'-','-',0,round(round(((nilai*p_bunga/100)/basis)*datediff(day,tgl_akru,case when tgl_selesai<=(dateadd(s,-1,dateadd(mm, datediff(m,0,tgl_akru)+1,0))) then tgl_selesai else (dateadd(s,-1,dateadd(mm, datediff(m,0,tgl_akru)+1,0))) end),0) * 20/100,0) as pajak_akru,"+														
							"round(((nilai*p_bunga/100)/basis)*datediff(day,tgl_akru,case when tgl_selesai<=(dateadd(s,-1,dateadd(mm, datediff(m,0,tgl_akru)+1,0))) then tgl_selesai else (case when tgl_selesai<=dateadd(month,1,tgl_akru) then tgl_selesai else "+							
							"("+
							"case when "+
							"cast(year(dateadd(month,1,tgl_akru)) as varchar)+cast(month(dateadd(month,1,tgl_akru)) as varchar) = "+
							"cast(year(tgl_selesai) as varchar)+cast(month(tgl_selesai) as varchar) "+
							"then tgl_selesai else dateadd(month,1,tgl_akru) end "+
							")"+														
							"end) end),0) as nilai_hitung,"+ 							
							"round(round(((nilai*p_bunga/100)/basis)*datediff(day,tgl_akru,case when tgl_selesai<=(dateadd(s,-1,dateadd(mm, datediff(m,0,tgl_akru)+1,0))) then tgl_selesai else (case when tgl_selesai<=dateadd(month,1,tgl_akru) then tgl_selesai else "+							
							"("+
							"case when "+
							"cast(year(dateadd(month,1,tgl_akru)) as varchar)+cast(month(dateadd(month,1,tgl_akru)) as varchar) = "+
							"cast(year(tgl_selesai) as varchar)+cast(month(tgl_selesai) as varchar) "+
							"then tgl_selesai else dateadd(month,1,tgl_akru) end "+
							")"+																					
							"end) end),0)*20/100,0) as pajak_hitung,0 "+
							"from inv_depo_m "+
							"where datediff(month,tgl_akru,tgl_selesai )<>0 and progress in ('1','X') and tgl_akru <='"+this.dp_d1.getDateString()+"' and tgl_akru<tgl_selesai and tgl_akru <= (dateadd(s,-1,dateadd(mm, datediff(m,0,'"+this.dp_d1.getDateString()+"')+1,0))) ");												
							//sbelumny ...datediff(month,tgl_akru,tgl_selesai )<>0 and progress in ('1','X') and tgl_akru <= (dateadd(s,-1,dateadd(mm, datediff(m,0,'"+this.dp_d1.getDateString()+"')+1,0))) 
							
					sql.add("update inv_depo_m set tgl_akru_seb=tgl_akru, "+
					        "tgl_akru = (case when tgl_selesai<=(dateadd(s,-1,dateadd(mm, datediff(m,0,tgl_akru)+1,0))) then tgl_selesai else substring(convert(varchar,dateadd(month,1,'"+this.dp_d1.getDateString()+"'),102),1,4)+'-'+substring(convert(varchar,dateadd(month,1,'"+this.dp_d1.getDateString()+"'),102),6,2)+'-01' end) "+
							"where datediff(month,tgl_akru,tgl_selesai )<>0 and progress in ('1','X') and tgl_akru <='"+this.dp_d1.getDateString()+"' and tgl_akru<tgl_selesai and tgl_akru <= (dateadd(s,-1,dateadd(mm, datediff(m,0,'"+this.dp_d1.getDateString()+"')+1,0))) ");					
                                   
					sql.add("update a set a.progress='Z' "+
							"from inv_depo_m a "+
							"inner join inv_depoakru_d b on a.no_depo=b.no_depo and b.periode = '"+this.e_periode.getText()+"' "+
							"where a.progress ='X' and datediff(month,a.tgl_akru,a.tgl_selesai )<>0 and a.kode_lokasi='"+this.app._lokasi+"'");
					
					
					sql.add("insert into inv_depoakru_j (no_akru, no_dokumen, tanggal, no_urut, kode_akun, keterangan, dc, nilai, kode_pp, kode_drk, kode_lokasi, modul, jenis, periode, kode_curr, kurs, nik_user, tgl_input) "+
							"select no_akru, '-', '"+this.dp_d1.getDateString()+"', 0, akun_piutang, '"+this.e_ket.getText()+"', 'D', sum(nilai-pajak_akru), '"+this.cb_pp.getText()+"', '"+this.cb_drk.getText()+"', '"+this.app._lokasi+"', 'DOCAKRU', 'PIU', '"+this.e_periode.getText()+"', 'IDR', 1, '"+this.app._userLog+"', getdate() "+
							"from inv_depoakru_d where no_akru = '"+this.e_nb.getText()+"' group by no_akru,akun_piutang");

					sql.add("insert into inv_depoakru_j (no_akru, no_dokumen, tanggal, no_urut, kode_akun, keterangan, dc, nilai, kode_pp, kode_drk, kode_lokasi, modul, jenis, periode, kode_curr, kurs, nik_user, tgl_input) "+
							"select no_akru, '-', '"+this.dp_d1.getDateString()+"', 0, akun_pdpt, '"+this.e_ket.getText()+"', 'C', sum(nilai-pajak_akru), '"+this.cb_pp.getText()+"', '"+this.cb_drk.getText()+"', '"+this.app._lokasi+"', 'DOCAKRU', 'PDPT', '"+this.e_periode.getText()+"', 'IDR', 1, '"+this.app._userLog+"', getdate() "+
							"from inv_depoakru_d where no_akru = '"+this.e_nb.getText()+"' group by no_akru,akun_pdpt");
					
					sql.add("insert into angg_r(no_bukti,modul,kode_lokasi,kode_akun,kode_pp,kode_drk,periode1,periode2,dc,saldo,nilai) "+
							"select no_akru,modul,kode_lokasi,kode_akun,kode_pp,kode_drk,periode,periode,dc,0,nilai "+
							"from inv_depoakru_j where dc= 'C' and no_akru = '"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");					
					
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
				if (modalResult == mrOk)
					this.standarLib.clearByTag(this, new Array("0","1"),this.e_nb);
					this.sg.setTag("0");
					this.dataJU.rs.rows = [];
					this.sg.clear(1); 
					setTipeButton(tbSimpan);
				break;
			case "simpan" :	
				this.app._periode = this.dbLib.getPeriode(this.app._lokasi);
				if (nilaiToFloat(this.e_nilai.getText()) <= 0) {
					system.alert(this,"Transaksi tidak valid.","Nilai akru tidak boleh nol atau kurang.");
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
				else this.simpan();
				break;				
			case "simpancek" : this.simpan();			
				break;			
		}
	},
	doSelectDate: function(sender, y,m,d){
		if (m < 10) m = "0" + m;			
		if (parseFloat(this.app._periode.substr(4,2)) <= 12) this.e_periode.setText(y+""+m);
		else {
			if (m == "12") this.e_periode.setText(this.app._periode);
			else this.e_periode.setText(y+""+m);
		}
		this.e_nb.setText("");
	},
	doChange:function(sender){
		if (sender == this.e_periode) {
			this.cb_drk.setSQL("select kode_drk, nama from drk where tahun = '"+this.e_periode.getText().substr(0,4)+"' and tipe = 'posting' and kode_lokasi='"+this.app._lokasi+"'",["kode_drk","nama"],false,["Kode","Nama"],"and","Daftar DRK",true);
			this.dataJU.rs.rows = [];
			this.sg.clear(1); 
			this.e_nilai.setText("0");
		}
	},
	doClick:function(sender){
		if (sender == this.i_gen) {
			this.e_nb.setText(this.standarLib.noBuktiOtomatis(this.dbLib,"inv_depoakru_m","no_akru",this.app._lokasi+"-DAK"+this.e_periode.getText().substr(2,4)+".","000"));
			this.e_ket.setFocus();
		}
	},
	doLoadData: function(sender){
		this.e_nilai.setText("0");								
		var strSQL = "select no_depo,keterangan,akun_piutang,akun_pdpt,convert(varchar,tgl_akru,103) as tgl_akru, "+					 
					 "convert(varchar, case when tgl_selesai<=(dateadd(s,-1,dateadd(mm, datediff(m,0,tgl_akru)+1,0))) then tgl_selesai else dateadd(s,-1,dateadd(mm, datediff(m,0,'"+this.dp_d1.getDateString()+"')+1,0)) end,103)  as tgl_akhir,"+
					 "datediff(day,tgl_akru,case when tgl_selesai<=(dateadd(s,-1,dateadd(mm, datediff(m,0,tgl_akru)+1,0))) then tgl_selesai else (dateadd(s,-1,dateadd(mm, datediff(m,0,'"+this.dp_d1.getDateString()+"')+1,0))) end) as jml_hari,basis,p_bunga,nilai, "+
					 "round(((nilai*p_bunga/100)/basis)*datediff(day,tgl_akru,case when tgl_selesai<=(dateadd(s,-1,dateadd(mm, datediff(m,0,tgl_akru)+1,0))) then tgl_selesai else (dateadd(s,-1,dateadd(mm, datediff(m,0,'"+this.dp_d1.getDateString()+"')+1,0))) end),0) as nilai_akru, "+					 
					 "round(((nilai*p_bunga/100)/basis)*datediff(day,tgl_akru,case when tgl_selesai<=(dateadd(s,-1,dateadd(mm, datediff(m,0,tgl_akru)+1,0))) then tgl_selesai else (dateadd(s,-1,dateadd(mm, datediff(m,0,'"+this.dp_d1.getDateString()+"')+1,0))) end) * 20/100,0) as pajak_akru "+					 
					 "from inv_depo_m "+
					 "where datediff(month,tgl_akru,tgl_selesai )<>0 and tgl_akru<='"+this.dp_d1.getDateString()+"' and tgl_akru<tgl_selesai and progress in ('1','X') and tgl_akru <= (dateadd(s,-1,dateadd(mm, datediff(m,0,'"+this.dp_d1.getDateString()+"')+1,0))) "; 					 
		var data = this.dbLib.getDataProvider(strSQL,true);
		if (typeof data == "object" && data.rs.rows[0] != undefined){
			this.dataJU = data;
			var line;
			var tot = 0;
			for (var i=0;i < this.dataJU.rs.rows.length;i++){
				line = this.dataJU.rs.rows[i];
				tot = tot + parseFloat(line.nilai_akru) - parseFloat(line.pajak_akru);
			}		
			this.e_nilai.setText(floatToNilai(tot));
			this.sgn.setTotalPage(Math.ceil(data.rs.rows.length/20));
			this.sgn.rearrange();
			this.doTampilData(1);
		} else this.sg.clear(1);	
	},	
	doTampilData: function(page) {
		var line;
		this.sg.clear();
		this.page = page;
		var start = (page - 1) * 20;
		var finish = (start + 20 > this.dataJU.rs.rows.length? this.dataJU.rs.rows.length:start+20);
		for (var i=start;i<finish;i++){
			line = this.dataJU.rs.rows[i];							
			var netakru = parseFloat(line.nilai_akru) - parseFloat(line.pajak_akru);			
			this.sg.appendData([line.no_depo,line.keterangan,line.akun_piutang,line.akun_pdpt,line.tgl_akru,line.tgl_akhir,floatToNilai(line.jml_hari),floatToNilai(line.basis),floatToNilai(line.p_bunga),floatToNilai(line.nilai),floatToNilai(netakru)]);
		}
		this.sg.setNoUrut(start);
	},
	doPager: function(sender, page) {		
		this.doTampilData(page);
	},
	doRequestReady: function(sender, methodName, result){
		if (sender == this.dbLib){
			try{   
				switch(methodName){
	    			case "execArraySQL" :	    				
						if (result.toLowerCase().search("error") == -1){
							system.info(this,"Transaksi telah sukses tersimpan (No Bukti : "+ this.e_nb.getText()+")","");
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