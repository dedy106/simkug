window.app_saku3_transaksi_fa_fFaTakTerima = function(owner)
{
	if (owner)
	{
		window.app_saku3_transaksi_fa_fFaTakTerima.prototype.parent.constructor.call(this,owner);
		this.className  = "app_saku3_transaksi_fa_fFaTakTerima";
		this.itemsValue = new arrayList();
		this.app._mainForm.childFormConfig(this, "mainButtonClick","Form Terima Aktiva Tetap : Input", 0);	
		
		uses("saiCBBL;saiEdit;datePicker;saiGrid;sgNavigator");
		this.e_periode = new portalui_saiLabelEdit(this,{bound:[20,14,202,20],caption:"Periode",tag:2,readOnly:true,change:[this,"doChange"]});
		this.l_tgl1 = new portalui_label(this,{bound:[20,11,100,18],caption:"Tanggal", underline:true});
		this.dp_d1 = new portalui_datePicker(this,{bound:[120,11,100,18],selectDate:[this,"doSelectDate"]}); 
		this.e_nb = new portalui_saiLabelEdit(this,{bound:[20,12,202,20],caption:"No Bukti",maxLength:30,readOnly:true});
		this.i_gen = new portalui_imageButton(this,{bound:[225,12,20,20],hint:"Generate",image:"icon/"+system.getThemes()+"/tabCont2.png",click:[this,"doClick"]});
		this.e_dok = new saiLabelEdit(this,{bound:[20,16,450,20],caption:"No Dokumen", maxLength:50});		
		this.e_ket = new saiLabelEdit(this,{bound:[20,17,450,20],caption:"Deskripsi", maxLength:150});				
		this.cb_lokasi = new saiCBBL(this,{bound:[20,14,220,20],caption:"Lokasi Asal", multiSelection:false, maxLength:10, tag:1, change:[this,"doChange"]});
		this.cb_kirim = new saiCBBL(this,{bound:[20,18,220,20],caption:"No Kirim", multiSelection:false, maxLength:10, tag:1,change:[this,"doChange"] });
		this.cb_tak = new saiCBBL(this,{bound:[20,15,220,20],caption:"Akun TAK", readOnly:true, tag:0 });
		this.cb_buat = new saiCBBL(this,{bound:[20,16,220,20],caption:"NIK Pembuat", multiSelection:false, maxLength:10, tag:2 });		
		this.cb_app = new saiCBBL(this,{bound:[20,17,220,20],caption:"NIK Approve", multiSelection:false, maxLength:10, tag:2});
				
		this.p1 = new panel(this,{bound:[20,23,900,300],caption:"Data Aset"});
		this.sg = new saiGrid(this.p1,{bound:[1,20,this.p1.width-5,this.p1.height-50],colCount:17,tag:9,
		            colTitle:["No FA","Nama FA","No Seri","Merk","Tipe","Akun Aset","Akun Akum.","Nilai Oleh","Tot Susut","N Buku",
					          "Klp FA","Nama Klp","Klp Akun","Kode PP","Nama PP","PP Susut","Nama PP Susut"],
					colWidth:[[16,15,14,13,12,11,10,9,8,7,6,5,4,3,2,1,0],[100,60,100,60,60,100,60,   80,80,80,70,70,100,100,100,150,80]],
					columnReadOnly:[true,[0,1,2,3,5,6,7,8,9,10,11,12,13,14,15,16],[]],					
					buttonStyle:[[10,13,15],[bsEllips,bsEllips,bsEllips]], 
					change:[this,"doChangeCell"],ellipsClick:[this,"doEllipsClick"],colFormat:[[7,8,9],[cfNilai,cfNilai,cfNilai]],autoAppend:false,defaultRow:1});
		this.sgn = new portalui_sgNavigator(this.p1,{bound:[1,this.p1.height-25,this.p1.width-1,25],buttonStyle:3,grid:this.sg});	
		
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
			
			this.cb_lokasi.setSQL("select kode_lokasi, nama from lokasi where kode_lokasi <> '00' and kode_lokasi<>'"+this.app._lokasi+"'",["kode_lokasi","nama"],false,["Kode","Nama"],"and","Data Lokasi",true);
			this.cb_buat.setSQL("select nik, nama from karyawan where kode_lokasi='"+this.app._lokasi+"'",["nik","nama"],false,["NIK","Nama"],"and","Data NIK Pembuat",true);
			this.cb_app.setSQL("select nik, nama from karyawan where kode_lokasi='"+this.app._lokasi+"'",["nik","nama"],false,["NIK","Nama"],"and","Data NIK Approval",true);
			var data = this.dbLib.getDataProvider("select nik,nama from karyawan where nik='"+this.app._userLog+"' and kode_lokasi='"+this.app._lokasi+"'",true);
			if (typeof data == "object" && data.rs.rows[0] != undefined){
				var line = data.rs.rows[0];							
				this.cb_buat.setText(line.nik,line.nama);
			} else this.cb_buat.setText("","");
			var data = this.dbLib.getDataProvider("select a.flag,b.nama from spro a inner join karyawan b on a.flag=b.nik and a.kode_lokasi=b.kode_lokasi where kode_spro='FAAPP' and a.kode_lokasi='"+this.app._lokasi+"'",true);
			if (typeof data == "object" && data.rs.rows[0] != undefined){
				var line = data.rs.rows[0];							
				this.cb_app.setText(line.flag,line.nama);
			} else this.cb_app.setText("","");
			
		}catch(e){
			systemAPI.alert(e);
		}
	}
};
window.app_saku3_transaksi_fa_fFaTakTerima.extend(window.childForm);
window.app_saku3_transaksi_fa_fFaTakTerima.implement({
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
			this.e_nb.setText(this.standarLib.noBuktiOtomatis(this.dbLib,"takterima_m","no_terima",this.app._lokasi+"-TTFA"+this.e_periode.getText().substr(2,4)+".","000"));
			if (this.standarLib.checkEmptyByTag(this, [0,1,2,3])){
				try{													
					uses("server_util_arrayList");
					var sql = new server_util_arrayList();										
					sql.add("update takkirim_m set progress='1',no_terima='"+this.e_nb.getText()+"' where no_kirim='"+this.cb_kirim.getText()+"' and kode_lokasi='"+this.cb_lokasi.getText()+"'");					
					sql.add("update fa_kirim_d set no_terima='"+this.e_nb.getText()+"' where no_kirim='"+this.cb_kirim.getText()+"' and kode_lokasi='"+this.cb_lokasi.getText()+"'");
					
					sql.add("insert into takterima_m (no_terima,kode_lokasi,periode,tanggal,no_dokumen,keterangan,kode_pp,modul,jenis,kode_curr,kurs,nilai,nik_buat,nik_setuju,posted,no_del,no_link,tgl_input,nik_user,kode_lokkirim,no_kirim) values "+
						    "('"+this.e_nb.getText()+"','"+this.app._lokasi+"','"+this.e_periode.getText()+"','"+this.dp_d1.getDateString()+"','"+this.e_dok.getText()+"','"+this.e_ket.getText()+"','-','TTFA','TERIMA','IDR',1,0,'"+this.cb_buat.getText()+"','"+this.cb_app.getText()+"','F','-','-',getdate(),'"+this.app._userLog+"','"+this.cb_lokasi.getText()+"','"+this.cb_kirim.getText()+"')");					
					
					var nofa = format = this.standarLib.noBuktiOtomatis(this.dbLib,"fa_asset","no_fa",this.app._lokasi+"-FA"+this.e_periode.getText().substr(2,4)+".","000");
					
					var idx = parseFloat(nofa.substr(11,3));					
					var totMutasi = 0;
					if (this.sg.getRowValidCount() > 0){
						for (var i=0;i < this.sg.getRowCount();i++){
							if (this.sg.rowValid(i)){
								var idx = idx+i;						
								idx2 = idx.toString();
								if (idx2.length == 1) var nu = "00"+idx2;
								if (idx2.length == 2) var nu = "0"+idx2;
								if (idx2.length == 3) var nu = idx2;								
								nofa = format.substr(0,10)+nu;						
								
								sql.add("insert into fa_asset (no_fa,kode_lokasi,kode_klpfa,kode_klpakun,kode_akun,umur,persen,nama,merk,tipe,no_seri,nilai,nilai_residu,kode_pp,kode_pp_susut,tgl_perolehan,tgl_susut,periode,periode_susut,progress,nik_user,tgl_input,catatan,kode_lokfa,nik_pnj,nilai_susut,jenis) "+
									    "select '"+nofa+"','"+this.app._lokasi+"','"+this.sg.cells(10,i)+"','"+this.sg.cells(12,i)+"',kode_akun,umur,persen,nama,merk,tipe,no_seri,nilai,nilai_residu,'"+this.sg.cells(13,i)+"','"+this.sg.cells(15,i)+"',tgl_perolehan,tgl_susut,periode,periode_susut,'2','"+this.app._userLog+"',getdate(),'"+this.e_nb.getText()+"',kode_lokfa,nik_pnj,nilai_susut,jenis "+
										"from fa_asset where no_fa='"+this.sg.cells(0,i)+"' and kode_lokasi='"+this.cb_lokasi.getText()+"'");
							
								sql.add("insert into fa_nilai(no_fa,kode_lokasi,no_bukti,dc,nilai,periode) values "+
										"('"+nofa+"','"+this.app._lokasi+"','"+this.e_nb.getText()+"','D',"+nilaiToFloat(this.sg.cells(7,i))+",'"+this.e_periode.getText()+"')");
								
								sql.add("insert into fasusut_d(no_fasusut,no_fa,periode,nilai,kode_lokasi,akun_bp,akun_ap,kode_akun,kode_pp,kode_drk,dc,no_del,nilai_aset,umur) values "+
										"('"+this.e_nb.getText()+"','"+nofa+"','"+this.e_periode.getText()+"',"+nilaiToFloat(this.sg.cells(8,i))+",'"+this.app._lokasi+"','-','-','"+this.sg.cells(5,i)+"','"+this.sg.cells(15,i)+"','-','D','-',"+nilaiToFloat(this.sg.cells(7,i))+",0)");
								
								totMutasi += (nilaiToFloat(this.sg.cells(7,i)) - nilaiToFloat(this.sg.cells(8,i)));								
								sql.add("insert into takterima_j(no_terima,no_dokumen,tanggal,no_urut,kode_akun,keterangan,dc,nilai,kode_pp,kode_drk,kode_lokasi,modul,jenis,periode,nik_user,tgl_input,kode_curr,kurs) values "+
										"	('"+this.e_nb.getText()+"','"+this.e_dok.getText()+"','"+this.dp_d1.getDateString()+"',"+i+",'"+this.sg.cells(6,i)+"','"+this.e_ket.getText()+"','C',"+nilaiToFloat(this.sg.cells(8,i))+",'"+this.sg.cells(13,i)+"','-','"+this.app._lokasi+"','TTFA','AKUM','"+this.e_periode.getText()+"','"+this.app._userLog+"',getdate(),'IDR',1)");
								sql.add("insert into takterima_j(no_terima,no_dokumen,tanggal,no_urut,kode_akun,keterangan,dc,nilai,kode_pp,kode_drk,kode_lokasi,modul,jenis,periode,nik_user,tgl_input,kode_curr,kurs) values "+
										"	('"+this.e_nb.getText()+"','"+this.e_dok.getText()+"','"+this.dp_d1.getDateString()+"',"+i+",'"+this.sg.cells(5,i)+"','"+this.e_ket.getText()+"','D',"+nilaiToFloat(this.sg.cells(7,i))+",'"+this.sg.cells(13,i)+"','-','"+this.app._lokasi+"','TTFA','HP','"+this.e_periode.getText()+"','"+this.app._userLog+"',getdate(),'IDR',1)");
							}
						}
					}					
					sql.add("insert into takterima_j(no_terima,no_dokumen,tanggal,no_urut,kode_akun,keterangan,dc,nilai,kode_pp,kode_drk,kode_lokasi,modul,jenis,periode,nik_user,tgl_input,kode_curr,kurs) values "+
							"('"+this.e_nb.getText()+"','"+this.e_dok.getText()+"','"+this.dp_d1.getDateString()+"',999,'"+this.cb_tak.getText()+"','"+this.e_ket.getText()+"','C',"+totMutasi+",'"+this.app._kodePP+"','-','"+this.app._lokasi+"','TTFA','MUTASI','"+this.e_periode.getText()+"','"+this.app._userLog+"',getdate(),'IDR',1)");

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
					this.standarLib.clearByTag(this, new Array("0","1","3","4"),this.e_nb);
					setTipeButton(tbSimpan);
					this.sg.clear(1);
				break;
			case "simpan" :	
				for (var i=0;i < this.sg.getRowCount();i++){
					if (this.sg.cells(10,i) == "-" || this.sg.cells(13,i) == "-" || this.sg.cells(15,i) == "-") {
						system.alert(this,"Data FA tidak valid.","Data Kode Klp FA, PP dan PP Susut tidak boleh '-'.");
						return false;
					}
				}
				this.app._periode = this.dbLib.getPeriode(this.app._lokasi);
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
			case "ubah" :	
				this.ubah();
				break;				
			case "hapus" :	
				this.hapus();
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
		if (sender == this.cb_lokasi && this.cb_lokasi.getText()!="") {
			this.cb_kirim.setSQL("select no_kirim, keterangan from takkirim_m where progress='0' and modul = 'TAKFA' and kode_lokasi = '"+this.cb_lokasi.getText()+"' and kode_loktuj='"+this.app._lokasi+"'",["no_kirim","keterangan"],false,["Kode","Nama"],"and","Data Kirim",true);
		}
		if (sender == this.cb_kirim && this.cb_kirim.getText()!="") {
			var strSQL = "select a.ref1,b.nama from takkirim_m a inner join masakun b on a.ref1=b.kode_akun and a.kode_lokasi=b.kode_lokasi where a.no_kirim='"+this.cb_kirim.getText()+"' and a.kode_lokasi='"+this.cb_lokasi.getText()+"'";
			var data = this.dbLib.getDataProvider(strSQL,true);
			if (typeof data == "object"){
				var line = data.rs.rows[0];							
				if (line != undefined){	
					this.cb_tak.setText(line.ref1,line.nama);
				}
			}
			var strSQL = "select a.no_seri,a.merk,a.tipe,aa.nilai,a.nilai_residu,isnull(d.tot_susut,0) as tot_susut,(aa.nilai-isnull(d.tot_susut,0)) as nilai_buku, "+
						 "  b.kode_akun,x.nama as nama_akun,b.akun_deprs,y.nama as nama_deprs,a.kode_pp,c.nama as nama_pp,a.umur,a.no_fa,a.nama "+
						 "from fa_asset a  "+
						 "inner join fa_nilai aa on a.no_fa=aa.no_fa and a.kode_lokasi=aa.kode_lokasi "+
						 "inner join fa_kirim_d bb on a.no_fa=bb.no_fa and a.kode_lokasi=bb.kode_lokasi "+
						 "inner join fa_klpakun b on a.kode_klpakun=b.kode_klpakun "+
						 "inner join pp c on a.kode_pp=c.kode_pp and a.kode_lokasi=c.kode_lokasi "+
						 "inner join masakun x on b.kode_akun=x.kode_akun and b.kode_lokasi=x.kode_lokasi "+
						 "inner join masakun y on b.akun_deprs=y.kode_akun and b.kode_lokasi=y.kode_lokasi "+
						 "left join "+
						 "   (select no_fa,kode_lokasi,sum(case dc when 'D' then nilai else -nilai end) as tot_susut "+
						 "	  from fasusut_d group by no_fa,kode_lokasi) d on a.no_fa=d.no_fa and a.kode_lokasi=d.kode_lokasi "+
						 "where bb.no_kirim='"+this.cb_kirim.getText()+"' and bb.kode_lokasi='"+this.cb_lokasi.getText()+"'";
			var data1 = this.dbLib.getDataProvider(strSQL,true);	
			if (typeof data1 == "object" && data1.rs.rows[0] != undefined){
				var line1;
				this.sg.clear();
				for (var i in data1.rs.rows){
					line1 = data1.rs.rows[i];																													
					this.sg.appendData([line1.no_fa,line1.nama,line1.no_seri,line1.merk,line1.tipe,line1.kode_akun,line1.akun_deprs,floatToNilai(line1.nilai),floatToNilai(line1.tot_susut),floatToNilai(line1.nilai_buku),"-","-","-","-","-","-","-"]);
				}
			} else this.sg.clear(1);									
			
		}
	},
	doClick:function(sender){
		if (sender == this.i_gen) {
			this.e_nb.setText(this.standarLib.noBuktiOtomatis(this.dbLib,"takterima_m","no_terima",this.app._lokasi+"-TTFA"+this.e_periode.getText().substr(2,4)+".","000"));
			this.e_dok.setFocus();
		}
	},	
	doEllipsClick: function(sender, col, row){
		try{			
			if (sender == this.sg) {
				if (col == 10){
					this.standarLib.showListData(this, "Daftar Klp FA",sender,undefined, 
												  "select kode_klpfa,nama    from fa_klp",// where kode_lokasi = '"+this.app._lokasi+"'
												  "select count(kode_klpfa)  from fa_klp",// where kode_lokasi = '"+this.app._lokasi+"'
												  ["kode_klpfa","nama"],"where",["Kode","Nama"],false);				
				}
				if (col == 13){
					this.standarLib.showListData(this, "Daftar PP/Unit",sender,undefined, 
												  "select kode_pp, nama  from pp where kode_lokasi = '"+this.app._lokasi+"' and tipe='posting' and flag_aktif ='1'",
												  "select count(kode_pp) from pp where kode_lokasi = '"+this.app._lokasi+"' and tipe='posting' and flag_aktif ='1'",
												  ["kode_pp","nama"],"and",["Kode","Nama"],false);				
				}
				if (col == 15){
					this.standarLib.showListData(this, "Daftar PP/Unit",sender,undefined, 
												  "select kode_pp, nama  from pp where kode_lokasi = '"+this.app._lokasi+"' and tipe='posting' and flag_aktif ='1' and kode_bidang='2'",
												  "select count(kode_pp) from pp where kode_lokasi = '"+this.app._lokasi+"' and tipe='posting' and flag_aktif ='1' and kode_bidang='2'",
												  ["kode_pp","nama"],"and",["Kode","Nama"],false);				
				}				
			}
		}catch(e){
			systemAPI.alert(e);
		}
	},
	doChangeCell: function(sender, col, row){
		if (col == 10) {
			var strSQL = "select kode_klpakun from fa_klp "+
						 "where kode_klpfa='"+this.sg.cells(10,row)+"' ";//and kode_lokasi='"+this.app._lokasi+"'
			var data = this.dbLib.getDataProvider(strSQL,true);
			if (typeof data == "object"){
				var line = data.rs.rows[0];							
				if (line != undefined){	
					this.sg.cells(12,row,line.kode_klpakun);					
				}
			}		
		}
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