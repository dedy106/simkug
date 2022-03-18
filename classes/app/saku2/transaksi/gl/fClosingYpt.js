window.app_saku2_transaksi_gl_fClosingYpt = function(owner)
{
	if (owner)
	{
		window.app_saku2_transaksi_gl_fClosingYpt.prototype.parent.constructor.call(this,owner);
		this.className  = "app_saku2_transaksi_gl_fClosingYpt";
		this.itemsValue = new arrayList();
		this.app._mainForm.childFormConfig(this, "mainButtonClick","Form Closing Periode Transaksi: Input", 0);	
		
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
			
		}catch(e){
			systemAPI.alert(e);
		}
	}
};
window.app_saku2_transaksi_gl_fClosingYpt.extend(window.childForm);
window.app_saku2_transaksi_gl_fClosingYpt.implement({
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
					var sql = new server_util_arrayList();
					
					var data = this.dbLib.getDataProvider("select getdate() as tgl ",true);
					if (typeof data == "object" && data.rs.rows[0] != undefined){
						var line = data.rs.rows[0];							
						this.tglnow = line.tgl;
					}
					if (this.isPostedAll(this.app._periode)){
						sql.add("insert into periode(periode, keterangan, kode_lokasi) values "+
						        "('"+closePeriode(this.e_periode.getText(),this.maxPeriode)+"','"+this.e_ket.getText()+"','"+this.app._lokasi+"')");							
						sql.add("insert into gldt_h select * from gldt where kode_lokasi ='"+this.app._lokasi+"' and periode = '"+this.e_periode.getText()+"'");
						sql.add("delete from gldt where kode_lokasi ='"+this.app._lokasi+"' and periode = '"+this.e_periode.getText()+"'");
						sql.add("insert into gl_closing(no_bukti, keterangan, periode, user_id,tanggal,kode_lokasi,nik_setuju,tgl_input)values "+
								"('"+this.e_nb.getText()+"','"+this.e_ket.getText()+"','"+this.e_periode.getText()+"','"+this.cb_buat.getText()+"','"+this.dp_d1.getDateString()+"','"+this.app._lokasi+"','"+this.cb_app.getText()+"','"+this.tglnow+"')");
						setTipeButton(tbAllFalse);								
						this.dbLib.execArraySQL(sql);
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
				if (this.maxPeriode == parseInt(this.app._periode.substr(4,2))) {
					system.alert(this,"Periode transaksi tidak valid.","Periode transaksi sudah maksimal.["+this.app._periode+"]");
					return false;
				}
				if (parseFloat(this.app._periode) != parseFloat(this.e_periode.getText())){
					system.alert(this,"Periode transaksi tidak valid.","Periode transaksi harus sama dengan periode aktif sistem.["+this.app._periode+"]");
					return false;
				}
				this.nik_user=this.app._nikUser;
				var sql = "call sp_glma_tmp ('"+this.app._lokasi+"','"+this.app._lokasi+"','"+this.app._lokasi+"','"+this.e_periode.getText()+"','"+this.nik_user+"')";
				this.dbLib.execQuerySync(sql);			
				sql = "select round(a.so_akhir,2) as so_akhir "+
					  "from glma_tmp a where a.kode_lokasi ='"+this.app._lokasi+"' and a.nik_user = '"+this.nik_user+"' and round(a.so_akhir,2) <> 0";
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
	doSelectDate: function(sender, y,m,d){
		if (m < 10) m = "0" + m;			
		if (parseFloat(this.app._periode.substr(4,2)) <= 12) this.e_periode.setText(y+""+m);
		else this.e_periode.setText(this.app._periode);
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
		var sqlAMOR = "select count(no_bill) from aka_bill_d a  "+
					  "	   left join  "+
					  "		 (select no_inv,kode_produk,kode_lokasi,sum(case dc when 'D' then nilai else -nilai end) as tot_amor  "+
					  "		  from aka_amor_d where kode_lokasi = '"+this.app._lokasi+"' group by no_inv,kode_produk,kode_lokasi) d on  "+
					  "		  a.no_inv=d.no_inv and a.kode_produk=d.kode_produk and a.kode_lokasi=d.kode_lokasi  "+					 
					  "     left join "+
					  "       (select no_inv,kode_produk,kode_lokasi,sum(case dc when 'D' then nilai else -nilai end) as tot_batal "+
					  "        from aka_batal_d where kode_lokasi = '"+this.app._lokasi+"' group by no_inv,kode_produk,kode_lokasi) xx on "+
					  "        a.no_inv=xx.no_inv and a.kode_produk=xx.kode_produk and a.kode_lokasi=xx.kode_lokasi "+
					  "	where a.kode_produk ='BPP' and a.kode_lokasi = '"+this.app._lokasi+"' "+
					  " 	and a.nilai-isnull(xx.tot_batal,0) > isnull(d.tot_amor,0) and a.periode_susut='"+periode+"'";
		var data,ck = this.dbLib.loadQuery(sqlAMOR);
		if (ck != "") { 
			data = ck.split("\r\n"); 
			if (data[1] != "0"){
				result = result && false;
				msg+= "Data Modul AR [AMORTISASI] masih ada yang belum diamortisasi.("+data[1]+" data)\n";
			}
		}
		var sqlBDD = "select count(a.no_kas) from kas_bdd_m a "+
					 "       left join (select no_kas,kode_lokasi,sum(nilai) as nilai_beban from kas_d where modul='REC' and kode_lokasi='"+this.app._lokasi+"' group by no_kas,kode_lokasi) c on a.no_kas=c.no_kas and a.kode_lokasi=c.kode_lokasi "+
					 "where a.flag_periode='"+periode+"' and '"+periode+"' between a.per_awal and a.per_akhir and a.kode_lokasi='"+this.app._lokasi+"'";
		var data,ck = this.dbLib.loadQuery(sqlBDD);
		if (ck != "") { 
			data = ck.split("\r\n"); 
			if (data[1] != "0"){
				result = result && false;
				msg+= "Data Modul JU [BDD] masih ada yang belum diamortisasi.("+data[1]+" data)\n";
			}
		}
		var sqlSUSUT = "select count(a.no_fa) from fa_asset a "+
					   "   left join "+
					   "   (select no_fa,kode_lokasi,sum(case dc when 'D' then nilai else -nilai end) as tot_susut "+
					   "	from fasusut_d where kode_lokasi = '"+this.app._lokasi+"' group by no_fa,kode_lokasi) d on a.no_fa=d.no_fa and a.kode_lokasi=d.kode_lokasi "+
					   "where a.nilai_susut<>0 and a.progress = '2' and a.kode_lokasi='"+this.app._lokasi+"' and (a.nilai-a.akum_nilai-a.nilai_residu) > isnull(d.tot_susut,0) and a.periode_susut = '"+periode+"'";
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
					"  union "+
				    "  select no_ba as no_bukti from log_ba_m where posted = 'F' and periode ='"+periode+"' and kode_lokasi='"+this.app._lokasi+"' "+
				    ") x";					   
		var data,ck = this.dbLib.loadQuery(sqlFA);
		if (ck != "") { 
			data = ck.split("\r\n"); 
			if (data[1] != "0"){
				result = result && false;
				msg+= "Data Modul FA [SUSUT,WO,LOGBA] masih ada yang belum diposting.("+data[1]+" data)\n";
			}
		}
		var sqlAR = "select count(x.no_bukti) from ("+
				    "  select no_bill as no_bukti from aka_bill_m where posted = 'F' and periode ='"+periode+"' and kode_lokasi='"+this.app._lokasi+"' "+
				    "  union "+
				    "  select no_amor as no_bukti from aka_amor_m where posted = 'F' and periode ='"+periode+"' and kode_lokasi='"+this.app._lokasi+"' "+
				    "  union "+
				    "  select no_rekon as no_bukti from aka_rekon_m where posted = 'F' and periode ='"+periode+"' and kode_lokasi='"+this.app._lokasi+"' "+
				    "  union "+
				    "  select no_batal as no_bukti from aka_batal_m where posted = 'F' and periode ='"+periode+"' and kode_lokasi='"+this.app._lokasi+"' "+
				    "  union "+
				    "  select no_sisih as no_bukti from aka_sisih_m where posted = 'F' and periode ='"+periode+"' and kode_lokasi='"+this.app._lokasi+"' "+
					"  union "+
				    "  select no_piutang as no_bukti from csm_piutang_m where posted = 'F' and periode ='"+periode+"' and kode_lokasi='"+this.app._lokasi+"' "+
					"  union "+
					"  select no_piutang as no_bukti from piutang_m where posted = 'F' and periode ='"+periode+"' and kode_lokasi='"+this.app._lokasi+"' "+
					"  union "+
				    "  select no_piutang as no_bukti from pr_piutang_m where posted = 'F' and periode ='"+periode+"' and kode_lokasi='"+this.app._lokasi+"' "+
					"  union "+
				    "  select no_pdd as no_bukti from pr_pdd_m where posted = 'F' and periode ='"+periode+"' and kode_lokasi='"+this.app._lokasi+"' "+
				    ") x";					   
		var data,ck = this.dbLib.loadQuery(sqlAR);
		if (ck != "") { 
			data = ck.split("\r\n"); 
			if (data[1] != "0"){
				result = result && false;
				msg+= "Data Modul PIUTANG [BILL,AMOR,REKON,BTL,SISIH,PIUUM,PIU,PIUPR] masih ada yang belum diposting.("+data[1]+" data)\n";
			}
		}		
		var sqlTAK = "select count(x.no_bukti) from ("+
				    "  select no_kirim as no_bukti from takkirim_m where posted = 'F' and periode ='"+periode+"' and kode_lokasi='"+this.app._lokasi+"' "+
				    "  union "+
				    "  select no_terima as no_bukti from takterima_m where posted = 'F' and periode ='"+periode+"' and kode_lokasi='"+this.app._lokasi+"' "+
				    ") x";					   
		var data,ck = this.dbLib.loadQuery(sqlTAK);
		if (ck != "") { 
			data = ck.split("\r\n"); 
			if (data[1] != "0"){
				result = result && false;
				msg+= "Data Modul TAK [KIRIM,TERIMA] masih ada yang belum diposting.("+data[1]+" data)\n";
			}
		}
		var sqlGAJI = "select count(x.no_bukti) from ("+
				    "  select no_gaji as no_bukti from hr_gaji_m where posted = 'F' and periode ='"+periode+"' and kode_lokasi='"+this.app._lokasi+"' "+				    
				    ") x";					   
		var data,ck = this.dbLib.loadQuery(sqlGAJI);
		if (ck != "") { 
			data = ck.split("\r\n"); 
			if (data[1] != "0"){
				result = result && false;
				msg+= "Data Modul GAJI  masih ada yang belum diposting.("+data[1]+" data)\n";
			}
		}
		var sqlAP = "select count(x.no_bukti) from ("+
				    "  select no_bmhd as no_bukti from pr_bmhd_m where posted = 'F' and periode ='"+periode+"' and kode_lokasi='"+this.app._lokasi+"' "+
				    ") x";					   
		var data,ck = this.dbLib.loadQuery(sqlAP);
		if (ck != "") { 
			data = ck.split("\r\n"); 
			if (data[1] != "0"){
				result = result && false;
				msg+= "Data Modul BMHD  masih ada yang belum diposting.("+data[1]+" data)\n";
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
				msg+= "Data Modul HUTANG   masih ada yang belum diposting.("+data[1]+" data)\n";
			}
		}
		
		var sqlPROYEK = "select count(x.no_bukti) from ("+
				    "  select no_bukti as no_bukti from tu_prpiutang_m where posted = 'F' and periode ='"+periode+"' and kode_lokasi='"+this.app._lokasi+"' "+
				    "  union "+
				    "  select no_bukti as no_bukti from tu_prpyt_m where posted = 'F' and periode ='"+periode+"' and kode_lokasi='"+this.app._lokasi+"' "+
				    "  union "+
				    "  select no_bukti as no_bukti from tu_prbeban_m where posted = 'F' and periode ='"+periode+"' and kode_lokasi='"+this.app._lokasi+"' "+
				    ") x";					   
		var data,ck = this.dbLib.loadQuery(sqlPROYEK);
		if (ck != "") { 
			data = ck.split("\r\n"); 
			if (data[1] != "0"){
				result = result && false;
				msg+= "Data Modul PROYEK masih ada yang belum diposting.("+data[1]+" data)\n";
			}
		}
		

		var sqlTR = "select count(x.no_bukti) from ("+
				    "  select no_bukti from trans_m where posted = 'F' and periode ='"+periode+"' and kode_lokasi='"+this.app._lokasi+"' "+
				    ") x";					   
		var data,ck = this.dbLib.loadQuery(sqlTR);
		if (ck != "") { 
			data = ck.split("\r\n"); 
			if (data[1] != "0"){
				result = result && false;
				msg+= "Data TRANS_M  masih ada yang belum diposting.("+data[1]+" data)\n";
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