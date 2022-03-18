window.app_saku3_transaksi_travel_kug_fClosing = function(owner)
{
	if (owner)
	{
		window.app_saku3_transaksi_travel_kug_fClosing.prototype.parent.constructor.call(this,owner);
		this.className  = "app_saku3_transaksi_travel_kug_fClosing";
		this.itemsValue = new arrayList();
		this.app._mainForm.childFormConfig(this, "mainButtonClick","Form Closing Akhir Tahun", 0);	
		
		uses("saiCBBL;saiEdit;datePicker;saiMemo");
		this.e_periode = new portalui_saiLabelEdit(this,{bound:[20,14,202,20],caption:"Periode",tag:2,readOnly:true});
		this.l_tgl1 = new portalui_label(this,{bound:[20,11,100,18],caption:"Tanggal", underline:true});
		this.dp_d1 = new portalui_datePicker(this,{bound:[120,11,100,18],selectDate:[this,"doSelectDate"]}); 
		this.e_nb = new portalui_saiLabelEdit(this,{bound:[20,12,202,20],caption:"No Bukti",maxLength:30,readOnly:true});
		this.i_gen = new portalui_imageButton(this,{bound:[225,12,20,20],hint:"Generate",image:"icon/"+system.getThemes()+"/tabCont2.png",click:[this,"doClick"]});
		this.e_lokasi = new saiLabelEdit(this,{bound:[20,18,450,20],caption:"Lokasi", readOnly:true});		
		this.e_ket = new saiLabelEdit(this,{bound:[20,17,450,20],caption:"Deskripsi", maxLength:150});		
		this.cb_buat = new saiCBBL(this,{bound:[20,16,200,20],caption:"NIK Closing", multiSelection:false, maxLength:10, tag:1});
		this.cb_app = new saiCBBL(this,{bound:[20,17,200,20],caption:"NIK Approve", multiSelection:false, maxLength:10, tag:2});
		
		this.p1 = new panel(this,{bound:[20,23,700,310],caption:"Status Closing"});
		this.e_memo = new saiMemo(this.p1,{bound:[5,24,690,280],labelWidth:0,tag:9,readOnly:true});
		
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
			
			this.cb_buat.setSQL("select nik, nama from karyawan where kode_lokasi='"+this.app._lokasi+"'",["nik","nama"],false,["NIK","Nama"],"and","Data NIK Closing",true);
			this.cb_app.setSQL("select nik, nama from karyawan where kode_lokasi='"+this.app._lokasi+"'",["nik","nama"],false,["NIK","Nama"],"and","Data NIK Approval",true);
			
			this.e_lokasi.setText(this.app._lokasi + " - " + this.app._namalokasi);
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
			
			var data = this.dbLib.getDataProvider("select cast(value1 as varchar) as value1 from spro where kode_spro='MAXPRD' and kode_lokasi='"+this.app._lokasi+"'",true);
			if (typeof data == "object" && data.rs.rows[0] != undefined){
				var line = data.rs.rows[0];							
				this.maxPeriode = parseInt(line.value1);
			} else this.maxPeriode = 0;			

			// this.akunJP = "";
			// strSQL = "select top 1 m.kode_akun from masakun m "+
			// 		" inner join flag_relasi b on b.kode_akun = m.kode_akun and m.kode_lokasi = b.kode_lokasi "+
			// 		" where b.kode_flag = '999' and m.kode_lokasi = '"+this.app._lokasi+"' ";
			// var data = this.dbLib.getDataProvider(strSQL,true);	
			// if (typeof data == "object" && data.rs.rows[0] != undefined){
			// 	var line = data.rs.rows[0];				
			// 	this.akunJP = line.kode_akun;
			// }
			// if (this.akunJP == "") {
			// 	system.alert(this,"Akun Jurnal Penutup tidak ditemukan.","Silahkan Seting Akun JP [Flag Akun 999] di Data Master.");
			// 	setTipeButton(tbAllFalse);	
			// }
			
		}catch(e){
			systemAPI.alert(e);
		}
	}
};
window.app_saku3_transaksi_travel_kug_fClosing.extend(window.childForm);
window.app_saku3_transaksi_travel_kug_fClosing.implement({	
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
			this.e_nb.setText(this.standarLib.noBuktiOtomatis(this.dbLib,"gl_closing","no_bukti",this.app._lokasi+"-CLS"+this.e_periode.getText().substr(2,4)+".","000"));
			if (this.standarLib.checkEmptyByTag(this, [0,1,2])){
				try{														
					uses("server_util_arrayList");					
					if (this.isPostedAll(this.app._periode)) {	
						
						var sqlCls = new server_util_arrayList();						
						var perNew = closePeriode(this.e_periode.getText(),this.maxPeriode);
						
						//periode Awal Tahun Berjalan

						sqlCls.add("insert into periode(periode, keterangan, kode_lokasi) values "+
								   "('"+perNew+"','Periode Awal Tahun','"+this.app._lokasi+"')");													
						//periode Akhir Tahun Berjalan		
						// sqlCls.add("insert into periode(periode, keterangan, kode_lokasi) values "+
						// 		   "('"+perNew.substr(0,4)+"12"+"','Periode Desember Aktif','"+this.app._lokasi+"')");																					

						sqlCls.add("insert into gl_closing(no_bukti, keterangan, periode, user_id,tanggal,kode_lokasi,nik_setuju,tgl_input) values "+
								   "('"+this.e_nb.getText()+"','"+this.e_ket.getText()+"','"+this.e_periode.getText()+"','"+this.cb_buat.getText()+"','"+this.dp_d1.getDateString()+"','"+this.app._lokasi+"','"+this.cb_app.getText()+"',getdate())");


						this.nik_user=this.app._nikUser;
						var sql2 = "call sp_glma2_pp_dw_tmp ('"+this.app._lokasi+"','"+this.e_periode.getText()+"','"+this.nik_user+"')";
						this.dbLib.execQuerySync(sql2);		
						
						var sql2 = "select * from glma_pp_tmp where kode_lokasi ='"+this.app._lokasi+"' and nik_user = '"+this.nik_user+"' and so_akhir<>0 ";														   
						var data = this.dbLib.getDataProvider(sql2,true);
						if (typeof data == "object" && data.rs.rows[0] != undefined){
							var line;							
							for (var i in data.rs.rows){
								line = data.rs.rows[i];							
								sqlCls.add("insert into glma_pp (kode_akun, kode_pp, kode_lokasi, periode, so_akhir, tgl_input, nik_user) values "+
										   "('"+line.kode_akun+"', '"+line.kode_pp+"', '"+line.kode_lokasi+"', '"+perNew+"', "+parseFloat(line.so_akhir)+", getdate(), '"+this.app._userLog+"')");
							}
						}								
					
						sqlCls.add("insert into glma (kode_akun, kode_lokasi, periode, so_akhir, tgl_input, nik_user, so_akhir_curr) "+
								  "select kode_akun, kode_lokasi, periode, sum(so_akhir), getdate(), '"+this.app._userLog+"', sum(so_akhir) "+
								  "from glma_pp "+
								  "where periode = '"+perNew+"' and kode_lokasi='"+this.app._lokasi+"' "+
								  "group by kode_akun, kode_lokasi,periode");
								  
						  
						sqlCls.add("update periode_aktif set per_awal1='"+perNew+"',per_akhir1='"+perNew+"',per_awal2='"+perNew+"',per_akhir2='"+perNew+"' where kode_lokasi='"+this.app._lokasi+"'");
				
						setTipeButton(tbAllFalse);					
						this.dbLib.execArraySQL(sqlCls);	
					
					}
					else system.alert(this,"Closing tidak dapat dilanjutkan","Semua modul harus sudah valid untuk diclosing");
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
					setTipeButton(tbSimpan);
				break;
			case "simpan" :					
				if (this.maxPeriode != parseInt(this.app._periode.substr(4,2))) {
					system.alert(this,"Periode transaksi Closing tidak valid.","Periode Closing harus "+this.maxPeriode+", Lakukan Aktifasi Periode Desember di bulan ke-16.");
					return false;
				}

				this.nik_user=this.app._nikUser;
				var sql2 = "call sp_glma2_pp_dw_tmp ('"+this.app._lokasi+"','"+this.e_periode.getText()+"','"+this.nik_user+"')";
				this.dbLib.execQuerySync(sql2);		

				sql = "select round(sum(a.so_akhir),0) as so_akhir "+
					  "from glma_pp_tmp a where a.kode_lokasi ='"+this.app._lokasi+"' and a.nik_user = '"+this.nik_user+"'";
				var data = this.dbLib.getDataProvider(sql,true);
				if (typeof data == "object" && data.rs.rows[0] != undefined){
					var line = data.rs.rows[0];							
					if (parseFloat(line.so_akhir) != 0) {
						system.alert(this,"Closing tidak valid.","Neraca Lajur tidak balance.");
						return false;
					}
				}	

				if (parseFloat(this.app._periode) != parseFloat(this.e_periode.getText())){
					system.alert(this,"Periode transaksi Closing tidak valid.","Periode transaksi harus sama dengan periode aktif sistem.["+this.app._periode+"]");
					return false;
				}				
				else this.simpan();

				break;				
			case "simpancek" : this.simpan();			
				break;
		}
	},
	doSelectDate: function(sender, y,m,d){
		if (m < 10) m = "0" + m;			
		this.e_periode.setText(this.app._periode);
		this.e_nb.setText("");
		this.e_ket.setText("Closing transaksi periode "+this.e_periode.getText());
	},
	doClick:function(sender){
		this.e_nb.setText(this.standarLib.noBuktiOtomatis(this.dbLib,"gl_closing","no_bukti",this.app._lokasi+"-CLS"+this.e_periode.getText().substr(2,4)+".","000"));
		this.e_ket.setFocus();
	},
	isPostedAll: function(periode){
		system.showProgress();
		var result = true;
		var msg  = "";

		//--------------------------- control modul		
		var sqlSUSUT = "select count(a.no_fa) from fa_asset a "+
					   "   left join "+
					   "   (select no_fa,kode_lokasi,sum(case dc when 'D' then nilai else -nilai end) as tot_susut "+
					   "	from fasusut_d where kode_lokasi = '"+this.app._lokasi+"' group by no_fa,kode_lokasi) d on a.no_fa=d.no_fa and a.kode_lokasi=d.kode_lokasi "+
					   "where a.progress = '2' and a.kode_lokasi='"+this.app._lokasi+"' and (a.nilai-a.nilai_residu) > isnull(d.tot_susut,0) and a.periode_susut = '"+periode+"'";
		var data,ck = this.dbLib.loadQuery(sqlSUSUT);
		if (ck != "") { 
			data = ck.split("\r\n"); 
			if (data[1] != "0"){
				result = result && false;
				msg+= "Data Modul FA masih ada yang belum disusutkan.("+data[1]+" data)\n";
			}
		}

		//--------------------------- posting modul
		var sqlJU = "select count(no_bukti) from trans_m where posted = 'F' and substring(periode,1,4) = '"+periode.substr(0,4)+"' and kode_lokasi='"+this.app._lokasi+"'";	
		var data,ck = this.dbLib.loadQuery(sqlJU);
		if (ck != "") { 
			data = ck.split("\r\n"); 
			if (data[1] != "0"){
				result = result && false;
				msg+= "Data Transaksi masih ada yang belum diposting.("+data[1]+" data)\n";
			}
		}		
		
		this.e_memo.setText(msg);
		system.hideProgress();
		return result;
	},	
	doRequestReady: function(sender, methodName, result){
		if (sender == this.dbLib){
			try{   
				switch(methodName){
	    			case "execArraySQL" :	    				
						if (result.toLowerCase().search("error") == -1){
							this.app._periode = closePeriode(this.app._periode,this.maxPeriode);
							system.info(this,"Closing telah sukses tereksekusi (No Bukti : "+ this.e_nb.getText()+")","");							
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