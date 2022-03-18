window.app_saku3_transaksi_yakes21_gl_fClosThn = function(owner)
{
	if (owner)
	{
		window.app_saku3_transaksi_yakes21_gl_fClosThn.prototype.parent.constructor.call(this,owner);
		this.className  = "app_saku3_transaksi_yakes21_gl_fClosThn";
		this.itemsValue = new arrayList();
		this.app._mainForm.childFormConfig(this, "mainButtonClick","Form Closing Akhir Tahun", 0);	
		
		uses("saiCBBL;saiEdit;datePicker;saiMemo");
		this.e_periode = new portalui_saiLabelEdit(this,{bound:[20,14,202,20],caption:"Periode",tag:2,readOnly:true});
		this.e_nb = new portalui_saiLabelEdit(this,{bound:[20,12,202,20],caption:"No Bukti",maxLength:30,readOnly:true});
		this.i_gen = new portalui_imageButton(this,{bound:[225,12,20,20],hint:"Generate",image:"icon/"+system.getThemes()+"/tabCont2.png",click:[this,"doClick"]});
		this.e_lokasi = new saiLabelEdit(this,{bound:[20,18,450,20],caption:"Lokasi", readOnly:true});		
		this.e_ket = new saiLabelEdit(this,{bound:[20,17,450,20],caption:"Deskripsi", maxLength:150});		
		
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
			
			this.e_lokasi.setText(this.app._lokasi + " - " + this.app._namalokasi);			
			var data = this.dbLib.getDataProvider("select cast(value1 as varchar) as value1 from spro where kode_spro='MAXPRD'",true);
			if (typeof data == "object" && data.rs.rows[0] != undefined){
				var line = data.rs.rows[0];							
				this.maxprd = line.value1;
				this.maxPeriode = parseInt(line.value1);
			} 
			else {
				this.maxprd = "";
				this.maxPeriode = 0;
			}
			
			this.app._periode = this.dbLib.getPeriode(this.app._lokasi);
			this.e_periode.setText(this.app._periode);
			this.doClick();
			this.e_ket.setText("Closing Periode "+this.e_periode.getText());
			
			if (this.app._periode != this.app._periode.substr(0,4) +this.maxPeriode){
				setTipeButton(tbAllFalse);			
				system.alert(this,"Periode sekarang ["+this.app._periode+"] masih belum akhir periode ["+(this.app._periode.substr(0,4) +this.maxPeriode)+"].","Process Closing Akhir Tahun tidak bisa dilakukan.");
				return;
			}

		}catch(e){
			systemAPI.alert(e);
		}
	}
};
window.app_saku3_transaksi_yakes21_gl_fClosThn.extend(window.childForm);
window.app_saku3_transaksi_yakes21_gl_fClosThn.implement({
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
			this.e_nb.setText(this.standarLib.noBuktiOtomatis(this.dbLib,"gl_closing","no_bukti",this.app._lokasi+"-CLT"+this.e_periode.getText().substr(2,4)+".","000"));
			if (this.standarLib.checkEmptyByTag(this, [0,1,2])){
				try{														
					this.nik_user=this.app._nikUser;						
					var sql = "call sp_glma_dw_tmp ('"+this.app._lokasi+"','"+this.e_periode.getText()+"','"+this.nik_user+"')";
					this.dbLib.execQuerySync(sql);	
					
					uses("server_util_arrayList");
					var sql = new server_util_arrayList();					
					var tgl = this.ed_period.getText().substr(0,4)+'-12-31';

					if (this.isPostedAll(this.app._periode)){						
						sql.add("insert into glma(kode_akun, kode_lokasi, periode, so_akhir, tgl_input,nik_user)  "+
								"select kode_akun,kode_lokasi,'"+closePeriode(this.app._periode,this.maxPeriode)+"',round(so_akhir,0),getdate(),'"+this.app._userLog+"' "+
								"from glma_tmp where kode_lokasi ='"+this.app._lokasi+"' and nik_user = '"+this.nik_user+"'");

						sql.add("insert into periode(periode, keterangan, kode_lokasi) values "+
						        "('"+closePeriode(this.e_periode.getText(),this.maxPeriode)+"','"+this.e_ket.getText()+"','"+this.app._lokasi+"')");

						// gldt_h gak dipakai		
						// sql.add("insert into gldt_h (no_bukti, no_urut, kode_lokasi, no_dokumen, tanggal, kode_akun, dc, nilai, keterangan, kode_pp, kode_drk, kode_cust, kode_proyek, kode_task, kode_vendor, kode_lokarea, nik, modul, jenis, periode, kode_curr, kurs, nilai_curr, tgl_input, nik_user) "+
						// 		"select no_bukti, no_urut, kode_lokasi, no_dokumen, tanggal, kode_akun, dc, nilai, keterangan, kode_pp, kode_drk, kode_cust, kode_proyek, kode_task, kode_vendor, kode_lokarea, nik, modul, jenis, periode, kode_curr, kurs, nilai_curr, tgl_input, nik_user "+
						// 		"from gldt where kode_lokasi ='"+this.app._lokasi+"' and periode like '"+this.e_periode.getText().substr(0,4)+"%'");
								
						// sql.add("delete from gldt where kode_lokasi ='"+this.app._lokasi+"' and periode like '"+this.e_periode.getText().substr(0,4)+"%'");

						sql.add("insert into gl_closing(no_bukti, keterangan, periode, user_id,tanggal,kode_lokasi,nik_setuju,tgl_input)values "+
								"('"+this.e_nb.getText()+"','"+this.e_ket.getText()+"','"+this.e_periode.getText()+"','"+this.app._userLog+"','"+tgl+"','"+this.app._lokasi+"','"+this.app._userLog+"',getdate())");
						
						setTipeButton(tbAllFalse);					
						this.dbLib.execArraySQL(sql);
					}
					else system.alert(this,"Closing tidak dapat dilanjutkan","Semua transaksi modul harus sudah terposting untuk periode aktif.");
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
				if (this.e_periode.getText() != this.e_periode.getText().substr(0,4)+parseNilai(this.maxprd) ) {
					system.alert(this,"Periode tidak valid.","Periode aktif sistem ["+this.app._periode+"] belum mencapai akhir periode ["+this.e_periode.getText().substr(0,4)+parseNilai(this.maxprd)+"]");
					return false;
				}

				this.nik_user=this.app._nikUser;
				var sql = "call sp_glma_dw_tmp ('"+this.app._lokasi+"','"+this.e_periode.getText()+"','"+this.nik_user+"')";
				this.dbLib.execQuerySync(sql);			
				
				sql = "select round(a.so_akhir,0) as so_akhir "+
					  "from glma_tmp a inner join masakun b on b.kode_akun = a.kode_akun and b.kode_lokasi = a.kode_lokasi and b.modul = 'L' where a.kode_lokasi ='"+this.app._lokasi+"' and a.nik_user = '"+this.nik_user+"' and round(a.so_akhir,0) <> 0";
				var data = this.dbLib.getDataProvider(sql,true);
				var line; var totD = totC = 0;
				if (typeof data == "object" && data.rs.rows[0] != undefined){
					this.dataJU = data;
					for (var i=0;i < this.dataJU.rs.rows.length;i++){
						line = this.dataJU.rs.rows[i];
						if (line.so_akhir > 0) totD += parseFloat(line.so_akhir);
						if (line.so_akhir < 0) totC += parseFloat(line.so_akhir);
					}
				} 				
				if (totD != 0 || totC != 0) {
					system.alert(this,"Closing tidak valid.","Terdapat data yang belum di Jurnal Penutup.");
					return false;
				}

				sql = "select round(a.so_akhir,0) as so_akhir "+
					  "from glma_tmp a where a.kode_lokasi ='"+this.app._lokasi+"' and a.nik_user = '"+this.nik_user+"' and round(a.so_akhir,0) <> 0";
				var data = this.dbLib.getDataProvider(sql,true);
				if (typeof data == "object" && data.rs.rows[0] != undefined){
					this.dataJU = data;
					var line; var totD = totC = 0;
					for (var i=0;i < this.dataJU.rs.rows.length;i++){
						line = this.dataJU.rs.rows[i];
						if (line.so_akhir > 0) totD += parseFloat(line.so_akhir);
						if (line.so_akhir < 0) totC += parseFloat(line.so_akhir);
					}
				} 
				if (Math.abs(totD + totC) > 1) {
					system.alert(this,"Closing tidak valid.","Neraca Lajur tidak balance.");
					return false;
				}
				else this.simpan();
				break;				
			case "simpancek" : this.simpan();			
				break;
		}
	},
	doClick:function(sender){
		this.e_nb.setText(this.standarLib.noBuktiOtomatis(this.dbLib,"gl_closing","no_bukti",this.app._lokasi+"-CLT"+this.e_periode.getText().substr(2,4)+".","000"));
		this.e_ket.setFocus();
	},
	isPostedAll: function(periode){
		system.showProgress();
		var result = true;
		var msg  = "";
		//--------------------------- control modul		
		var sqlSUSUT = "select count(a.no_fa) from fa_asset a "+
					   "   inner join fa_klpakun b on a.kode_klpakun=b.kode_klpakun "+
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
		var sqlJU = "select count(no_ju) from ju_m where posted = 'F' and periode = '"+periode+"' and kode_lokasi='"+this.app._lokasi+"'";	
		var data,ck = this.dbLib.loadQuery(sqlJU);
		if (ck != "") { 
			data = ck.split("\r\n"); 
			if (data[1] != "0"){
				result = result && false;
				msg+= "Data Modul JU masih ada yang belum diposting.("+data[1]+" data)\n";
			}
		}		
		var sqlKB = "select count(no_kas) from kas_m where posted = 'F' and periode = '"+periode+"' and kode_lokasi='"+this.app._lokasi+"'";	
		var data,ck = this.dbLib.loadQuery(sqlKB);
		if (ck != "") { 
			data = ck.split("\r\n"); 
			if (data[1] != "0"){
				result = result && false;
				msg+= "Data Modul KB masih ada yang belum diposting.("+data[1]+" data)\n";
			}
		}
		var sqlIF = "select count(no_aju) from if_aju_m where posted <> 'T' and periode = '"+periode+"' and kode_lokasi='"+this.app._lokasi+"'";	
		var data,ck = this.dbLib.loadQuery(sqlIF);
		if (ck != "") { 
			data = ck.split("\r\n"); 
			if (data[1] != "0"){
				result = result && false;
				msg+= "Data Modul Pengajuan IF masih ada yang belum diposting.("+data[1]+" data)\n";
			}
		}	
		var sqlPTG = "select count(x.no_bukti) from ("+
				     "  select no_ptg as no_bukti from ptg_m where posted = 'F' and periode ='"+periode+"' and kode_lokasi='"+this.app._lokasi+"' "+
				     ") x";					   
		var data,ck = this.dbLib.loadQuery(sqlPTG);
		if (ck != "") { 
			data = ck.split("\r\n"); 
			if (data[1] != "0"){
				result = result && false;
				msg+= "Data Modul PTG [PJ] masih ada yang belum diposting.("+data[1]+" data)\n";
			}
		}
		var sqlFA = "select count(x.no_bukti) from ("+
				    "  select no_fasusut as no_bukti from fasusut_m where posted = 'F' and periode ='"+periode+"' and kode_lokasi='"+this.app._lokasi+"' "+
				    "  union "+
				    "  select no_woapp as no_bukti from fawoapp_m where posted = 'F' and periode ='"+periode+"' and kode_lokasi='"+this.app._lokasi+"' "+
				    ") x";					   
		var data,ck = this.dbLib.loadQuery(sqlFA);
		if (ck != "") { 
			data = ck.split("\r\n"); 
			if (data[1] != "0"){
				result = result && false;
				msg+= "Data Modul FA [SUSUT,WO] masih ada yang belum diposting.("+data[1]+" data)\n";
			}
		}		
		var sqlAP = "select count(x.no_bukti) from ("+
				    "  select no_hutang as no_bukti from hutang_m where posted = 'F' and periode ='"+periode+"' and kode_lokasi='"+this.app._lokasi+"' "+
				    ") x";					   
		var data,ck = this.dbLib.loadQuery(sqlAP);
		if (ck != "") { 
			data = ck.split("\r\n"); 
			if (data[1] != "0"){
				result = result && false;
				msg+= "Data Modul AP [HUTANG] masih ada yang belum diposting.("+data[1]+" data)\n";
			}
		}
		var sqlAR = "select count(x.no_bukti) from ("+
				    "  select no_hutang as no_bukti from yk_hutang_m where posted = 'F' and periode ='"+periode+"' and kode_lokasi='"+this.app._lokasi+"' "+ //jika ada yg progress = 0 belum approve, harus approve dulu
					"  union "+
				    "  select no_rekon as no_bukti from yk_rekon_m where posted = 'F' and periode ='"+periode+"' and kode_lokasi='"+this.app._lokasi+"' "+
				    ") x";					   
		var data,ck = this.dbLib.loadQuery(sqlAR);
		if (ck != "") { 
			data = ck.split("\r\n"); 
			if (data[1] != "0"){
				result = result && false;
				msg+= "Data Modul AR [PIUHUTKES] masih ada yang belum diposting.("+data[1]+" data)\n";
			}
		}
		var sqlINV = "select count(x.no_bukti) from ("+
				    "  select no_akru as no_bukti from inv_depoakru_m where posted = 'F' and periode ='"+periode+"' and kode_lokasi='"+this.app._lokasi+"' "+
				    "  union "+
				    "  select no_cair as no_bukti from inv_depocair_m where posted = 'F' and periode ='"+periode+"' and kode_lokasi='"+this.app._lokasi+"' "+
					"  union "+
				    "  select no_tutup as no_bukti from inv_depotutup_m where posted = 'F' and periode ='"+periode+"' and kode_lokasi='"+this.app._lokasi+"' "+
					"  union "+				    

				    "  select no_shmbeli as no_bukti from inv_shmbeli_m where posted = 'F' and periode ='"+periode+"' and kode_lokasi='"+this.app._lokasi+"' "+
					"  union "+				    
				    "  select no_shmjual as no_bukti from inv_shmjual_m where posted = 'F' and periode ='"+periode+"' and kode_lokasi='"+this.app._lokasi+"' "+
				    "  union "+				    
				    "  select no_spi as no_bukti from inv_shmspi_m where posted = 'F' and periode ='"+periode+"' and kode_lokasi='"+this.app._lokasi+"' "+					
					"  union "+				    
					"  select no_shmdev as no_bukti from inv_shmdev_m where posted = 'F' and periode ='"+periode+"' and kode_lokasi='"+this.app._lokasi+"' "+					
					"  union "+	
					"  select no_bukti as no_bukti from inv_discre_j where posted = 'F' and periode ='"+periode+"' and kode_lokasi='"+this.app._lokasi+"' "+					
					"  union "+				    			    
					"  select no_shmreklas as no_bukti from inv_shmreklas_j where posted = 'F' and periode ='"+periode+"' and kode_lokasi='"+this.app._lokasi+"' "+					
					"  union "+				    			    

				    "  select no_rdbeli as no_bukti from inv_rdbeli_m where posted = 'F' and periode ='"+periode+"' and kode_lokasi='"+this.app._lokasi+"' "+
					"  union "+				    
				    "  select no_rdjual as no_bukti from inv_rdjual_m where posted = 'F' and periode ='"+periode+"' and kode_lokasi='"+this.app._lokasi+"' "+
				    "  union "+				    
				    "  select no_spi as no_bukti from inv_rdspi_m where posted = 'F' and periode ='"+periode+"' and kode_lokasi='"+this.app._lokasi+"' "+					
					"  union "+
					"  select no_rddev as no_bukti from inv_rddev_m where posted = 'F' and periode ='"+periode+"' and kode_lokasi='"+this.app._lokasi+"' "+					
					"  union "+				    
					
					"  select no_spbeli as no_bukti from inv_spbeli_m where posted = 'F' and periode ='"+periode+"' and kode_lokasi='"+this.app._lokasi+"' "+
					"  union "+				    
				    "  select no_spjual as no_bukti from inv_spjual_m where posted = 'F' and periode ='"+periode+"' and kode_lokasi='"+this.app._lokasi+"' "+
				    "  union "+				    
				    "  select no_spi as no_bukti from inv_spspi_m where posted = 'F' and periode ='"+periode+"' and kode_lokasi='"+this.app._lokasi+"' "+					
					"  union "+		
					"  select no_spdev as no_bukti from inv_spdev_m where posted = 'F' and periode ='"+periode+"' and kode_lokasi='"+this.app._lokasi+"' "+					
					"  union "+				    		    
				    
				    "  select no_beli as no_bukti from inv_oblibeli_m where posted = 'F' and periode ='"+periode+"' and kode_lokasi='"+this.app._lokasi+"' "+					
					"  union "+				    
				    "  select no_akru as no_bukti from inv_obliakru_m where posted = 'F' and periode ='"+periode+"' and kode_lokasi='"+this.app._lokasi+"' "+					
					"  union "+				    
				    "  select no_spi as no_bukti from inv_oblispi_m where posted = 'F' and periode ='"+periode+"' and kode_lokasi='"+this.app._lokasi+"' "+					
					"  union "+				    
				    "  select no_amor as no_bukti from inv_obliamor_m where posted = 'F' and periode ='"+periode+"' and kode_lokasi='"+this.app._lokasi+"' "+					
					"  union "+				    
				    "  select no_oblijual as no_bukti from inv_oblijual_m where posted = 'F' and periode ='"+periode+"' and kode_lokasi='"+this.app._lokasi+"' "+					
					"  union "+				    
				    "  select no_cair as no_bukti from inv_oblicair_m where posted = 'F' and periode ='"+periode+"' and kode_lokasi='"+this.app._lokasi+"' "+					
					
					") x";					   
		var data,ck = this.dbLib.loadQuery(sqlINV);
		if (ck != "") { 
			data = ck.split("\r\n"); 
			if (data[1] != "0"){
				result = result && false;
				msg+= "Data Modul Investasi [DEPOAKRU,DEPOCAIR,DEPOTUTUP,SHMBELI,SHMJUAL,SHMSPI,RDBELI,RDJUAL,RDSPI,OBLIBELI,OBLIAKRU,OBLISPI,OBLIAMOR,OBLIJUAL,OBLICAIR] masih ada yang belum diposting.("+data[1]+" data)\n";
			}
		}		
		var sqlTT = "select count(no_terima) from takterima_m where posted = 'F' and periode = '"+periode+"' and kode_lokasi='"+this.app._lokasi+"'";	
		var data,ck = this.dbLib.loadQuery(sqlTT);
		if (ck != "") { 
			data = ck.split("\r\n"); 
			if (data[1] != "0"){
				result = result && false;
				msg+= "Data Modul TAKTERIMA masih ada yang belum diposting.("+data[1]+" data)\n";
			}
		}
		var sqlTK = "select count(no_kirim) from takkirim_m where posted = 'F' and periode = '"+periode+"' and kode_lokasi='"+this.app._lokasi+"'";	
		var data,ck = this.dbLib.loadQuery(sqlTK);
		if (ck != "") { 
			data = ck.split("\r\n"); 
			if (data[1] != "0"){
				result = result && false;
				msg+= "Data Modul TAKKIRIM masih ada yang belum diposting.("+data[1]+" data)\n";
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
