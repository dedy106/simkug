window.app_saku3_transaksi_yakes21_inves_fOblicair = function(owner)
{
	if (owner)
	{
		window.app_saku3_transaksi_yakes21_inves_fOblicair.prototype.parent.constructor.call(this,owner);
		this.className  = "app_saku3_transaksi_yakes21_inves_fOblicair";
		this.itemsValue = new arrayList();
		this.app._mainForm.childFormConfig(this, "mainButtonClick","Form Pencairan Kupon Obligasi", 0);	
		
		uses("saiCBBL;saiEdit;datePicker;saiGrid;sgNavigator");
		this.e_periode = new portalui_saiLabelEdit(this,{bound:[20,11,202,20],caption:"Periode",tag:2,readOnly:true,change:[this,"doChange"],visible:false});
		this.l_tgl1 = new portalui_label(this,{bound:[20,11,100,18],caption:"Tanggal", underline:true});
		this.dp_d1 = new portalui_datePicker(this,{bound:[120,11,100,18],selectDate:[this,"doSelectDate"]}); 
		
		this.pc2 = new pageControl(this,{bound:[10,10,1000,430], childPage:["Data Transaksi","List Transaksi"]});		
		this.sg3 = new saiGrid(this.pc2.childPage[1],{bound:[1,5,this.pc2.width-5,this.pc2.height-35],colCount:5,tag:9,
		            colTitle:["No Bukti","Tanggal","Deskripsi","Nilai","Pilih"],
					colWidth:[[4,3,2,1,0],[70,100,350,80,100]],					
					colFormat:[[3,4],[cfNilai,cfButton]],readOnly:true,
					click:[this,"doSgBtnClick3"], colAlign:[[4],[alCenter]],
					dblClick:[this,"doDoubleClick3"],autoAppend:false,defaultRow:1});		
		this.sgn3 = new portalui_sgNavigator(this.pc2.childPage[1],{bound:[1,this.pc2.height-25,this.pc2.width-1,25],buttonStyle:3,grid:this.sg3,pager:[this,"doPager3"]});
		this.bLoad3 = new portalui_imageButton(this.sgn3,{bound:[this.sgn3.width - 25,2,22,22],image:"icon/"+system.getThemes()+"/reload.png", hint:"Load Data",click:[this,"doLoad3"]});		

		this.cb_plan = new saiCBBL(this.pc2.childPage[0],{bound:[20,11,220,20],caption:"Plan Asset", multiSelection:false, maxLength:10, tag:2,readOnly:true,change:[this,"doChange"]});				
		this.e_nb = new portalui_saiLabelEdit(this.pc2.childPage[0],{bound:[20,12,202,20],caption:"No Bukti",maxLength:30,readOnly:true});
		this.i_gen = new portalui_imageButton(this.pc2.childPage[0],{bound:[225,12,20,20],hint:"Generate",image:"icon/"+system.getThemes()+"/tabCont2.png",click:[this,"doClick"]});
		this.e_piukupon = new saiLabelEdit(this.pc2.childPage[0],{bound:[790,12,200,20],caption:"Tot. PiuKupon", tag:1, readOnly:true, tipeText:ttNilai, text:"0"});						
		this.e_ket = new saiLabelEdit(this.pc2.childPage[0],{bound:[20,17,450,20],caption:"Deskripsi", maxLength:150});				
		this.e_akru = new saiLabelEdit(this.pc2.childPage[0],{bound:[790,17,200,20],caption:"Tot. Akru", tag:1, readOnly:true, tipeText:ttNilai, text:"0"});				
		this.cb_jenis = new saiCBBL(this.pc2.childPage[0],{bound:[20,18,220,20],caption:"ID Seri", multiSelection:false, maxLength:10, tag:1,change:[this,"doChange"]});		
		this.e_nilai = new saiLabelEdit(this.pc2.childPage[0],{bound:[790,18,200,20],caption:"Tot. Cair", tag:1, readOnly:true, tipeText:ttNilai, text:"0"});				
	
		this.pc1 = new pageControl(this.pc2.childPage[0],{bound:[1,22,995,305], childPage:["Kupon Obligasi","Otorisasi"]});				
		this.sg = new saiGrid(this.pc1.childPage[0],{bound:[1,5,this.pc1.width-5,this.pc1.height-35],colCount:10,tag:0,
		            colTitle:["No Beli","Akun Piutang","Akun Pdpt","Kode DRK","Nominal","Jml Hari","Total Akru","Piutang Kupon","Nilai Cair","Last Coupon"],
					colWidth:[[9,8,7,6,5,4,3,2,1,0],[80,100,100,100,60,100,80,80,80,120]],					
					columnReadOnly:[true,[0,1,2,3,4,5,6,7,9],[8]],					
					nilaiChange:[this,"doNilaiChange"],change:[this,"doChangeCell"],
					colFormat:[[4,5,6,7,8],[cfNilai,cfNilai,cfNilai,cfNilai,cfNilai]],autoAppend:false,defaultRow:1});
		this.sgn = new portalui_sgNavigator(this.pc1.childPage[0],{bound:[1,this.pc1.height-25,this.pc1.width-1,25],buttonStyle:3,grid:this.sg});	
		
		this.cb_buat = new saiCBBL(this.pc1.childPage[1],{bound:[20,16,220,20],caption:"NIK Pembuat", multiSelection:false, maxLength:10, tag:2 });
		this.cb_app = new saiCBBL(this.pc1.childPage[1],{bound:[20,17,220,20],caption:"NIK Approve", multiSelection:false, maxLength:10, tag:2});		

		this.rearrangeChild(10, 23);
		this.pc2.childPage[0].rearrangeChild(10, 23);
		this.pc1.childPage[1].rearrangeChild(10, 23);
		
		setTipeButton(tbSimpan);
		this.maximize();		
		this.setTabChildIndex();
		try {
			this.dbLib = new util_dbLib();
			this.dbLib.addListener(this);
			uses("util_standar");
			this.standarLib = new util_standar();
			this.stsSimpan = 1;
			this.doSelectDate(this.dp_d1,this.dp_d1.year,this.dp_d1.month,this.dp_d1.day);
						
			this.cb_buat.setSQL("select nik, nama from karyawan where kode_lokasi='"+this.app._lokasi+"'",["nik","nama"],false,["NIK","Nama"],"and","Data NIK Pembuat",true);
			this.cb_app.setSQL("select nik, nama from karyawan where kode_lokasi='"+this.app._lokasi+"'",["nik","nama"],false,["NIK","Nama"],"and","Data NIK Approval",true);
			
			var data = this.dbLib.getDataProvider("select nik,nama from karyawan where nik='"+this.app._userLog+"' and kode_lokasi='"+this.app._lokasi+"'",true);
			if (typeof data == "object" && data.rs.rows[0] != undefined){
				var line = data.rs.rows[0];							
				this.cb_buat.setText(line.nik,line.nama);
			} else this.cb_buat.setText("","");

			var data = this.dbLib.getDataProvider("select kode_spro,flag from spro where kode_spro in ('PLAN') and kode_lokasi = '"+this.app._lokasi+"'",true);			
			if (typeof data == "object"){
				var line;
				for (var i in data.rs.rows){
					line = data.rs.rows[i];																	
					if (line.kode_spro == "PLAN") this.cb_plan.setText(line.flag);																										
				}
			}

			var data = this.dbLib.getDataProvider("select kode_param,flag from inv_obli_param where kode_plan = '"+this.cb_plan.getText()+"' and kode_param in ('PPINV','DRKOBLSPI','PIUKUPON')",true);			
			if (typeof data == "object"){
				var line;
				for (var i in data.rs.rows){
					line = data.rs.rows[i];	
					if (line.kode_param == "PPINV") this.kodepp = line.flag;														
					if (line.kode_param == "DRKOBLSPI") this.drkSPI = line.flag;		
					if (line.kode_param == "PIUKUPON") this.akunPiuKupon = line.flag;					
				}
			}	

			this.cb_jenis.setSQL("select distinct a.kode_jenis, a.nama from inv_oblijenis a inner join inv_obli_d b on a.kode_jenis=b.kode_jenis ",["kode_jenis","nama"],false,["Jenis","Nama"],"and","Daftar Jens Obligasi",true);

		}catch(e){
			systemAPI.alert(e);
		}
	}
};
window.app_saku3_transaksi_yakes21_inves_fOblicair.extend(window.childForm);
window.app_saku3_transaksi_yakes21_inves_fOblicair.implement({
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
			if (this.stsSimpan == 1) this.doClick(this.i_gen);
			if (this.standarLib.checkEmptyByTag(this, [0,1,2])){
				try{													
					uses("server_util_arrayList");
					var sql = new server_util_arrayList();
					if (this.stsSimpan == 0) {
						sql.add("update a set a.tgl_akru_kupon=a.tgl_akru_kupon_seb "+
								"from inv_obli_d a inner join inv_obliakru_d b on a.kode_jenis=b.kode_jenis and a.kode_beli=b.kode_beli "+
								"where b.no_akru='"+this.e_nb.getText()+"' and a.kode_lokasi='"+this.app._lokasi+"'");
						sql.add("update inv_obli_d set no_cair_piukupon='-' where no_cair_piukupon='"+this.e_nb.getText()+"' and kode_jenis='"+this.cb_jenis.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");

						sql.add("update inv_obliakru_d set no_cair='-',no_kas='-' where no_cair='"+this.e_nb.getText()+"' and kode_jenis='"+this.cb_jenis.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");							
						sql.add("delete from inv_oblicair_m where no_cair ='"+this.e_nb.getText()+"' ");						
						sql.add("delete from inv_oblicair_j where no_cair ='"+this.e_nb.getText()+"' ");
						sql.add("delete from inv_obliakru_d where no_akru ='"+this.e_nb.getText()+"' ");
						sql.add("delete from angg_r where no_bukti ='"+this.e_nb.getText()+"' ");
					}

					sql.add("insert into inv_oblicair_m(no_cair,kode_jenis,tanggal,keterangan,kode_curr,kurs,nilai_rev,nilai,nilai_piukupon,kode_pp,kode_drk,posted,modul,nik_buat,nik_setuju,kode_lokasi,periode,no_del,no_link,nik_user,tgl_input) values "+
						    "('"+this.e_nb.getText()+"','"+this.cb_jenis.getText()+"','"+this.dp_d1.getDateString()+"','"+this.e_ket.getText()+"','IDR',1,"+nilaiToFloat(this.e_akru.getText())+","+nilaiToFloat(this.e_nilai.getText())+","+nilaiToFloat(this.e_piukupon.getText())+",'"+this.kodepp+"','"+this.drkSPI+"','F','OBLCAIR','"+this.cb_buat.getText()+"','"+this.cb_app.getText()+"','"+this.app._lokasi+"','"+this.e_periode.getText()+"','-','-','"+this.app._userLog+"',getdate())");										
										
					//reverse seluruh akru kupon bulanan
					//masuk nilai cairnya utk eksekusi di kasbank masuk		
					for (var i = 0; i < this.sg.rows.getLength();i++){
						if (this.sg.rowValid(i) && this.sg.cells(8,i) != "" && this.sg.cells(8,i) != "0"){							
							sql.add("insert into inv_oblicair_j(no_cair,no_dokumen,tanggal,no_urut,kode_akun,keterangan,dc,nilai,kode_pp,kode_drk,kode_lokasi,modul,jenis,periode,kode_curr,kurs,nik_user,tgl_input) values "+
									"('"+this.e_nb.getText()+"','"+this.cb_jenis.getText()+"','"+this.dp_d1.getDateString()+"',0,'"+this.sg.cells(2,i)+"','"+this.e_ket.getText()+"','D',"+nilaiToFloat(this.sg.cells(6,i))+",'"+this.kodepp+"','"+this.drkSPI+"','"+this.app._lokasi+"','OBLCAIR','KUPONREV','"+this.e_periode.getText()+"','IDR',1,'"+this.app._userLog+"',getdate())");							
							sql.add("insert into inv_oblicair_j(no_cair,no_dokumen,tanggal,no_urut,kode_akun,keterangan,dc,nilai,kode_pp,kode_drk,kode_lokasi,modul,jenis,periode,kode_curr,kurs,nik_user,tgl_input) values "+
									"('"+this.e_nb.getText()+"','"+this.cb_jenis.getText()+"','"+this.dp_d1.getDateString()+"',1,'"+this.sg.cells(1,i)+"','"+this.e_ket.getText()+"','C',"+nilaiToFloat(this.sg.cells(6,i))+",'"+this.kodepp+"','-','"+this.app._lokasi+"','OBLCAIR','PIUREV','"+this.e_periode.getText()+"','IDR',1,'"+this.app._userLog+"',getdate())");		
							
							sql.add("update inv_obliakru_d set no_cair='"+this.e_nb.getText()+"',no_kas='X' where no_cair='-' and kode_jenis='"+this.cb_jenis.getText()+"' and no_beli='"+this.sg.cells(0,i)+"' and kode_lokasi='"+this.app._lokasi+"'");							
							
							//nilai cair kuponnya utk eksekusi di kasbank
							sql.add("insert into inv_obliakru_d(no_akru,no_beli,kode_jenis,periode,kode_lokasi,akun_piukupon,akun_kupon,nilai,kode_pp,kode_drk,dc,no_del,nominal,jml_hari,tgl_awal,tgl_akhir,no_cair,no_kas,nilai_cair,kode_plan) values "+
									"('"+this.e_nb.getText()+"','"+this.sg.cells(0,i)+"','"+this.cb_jenis.getText()+"','"+this.e_periode.getText()+"','"+this.app._lokasi+"','"+this.sg.cells(1,i)+"','"+this.sg.cells(2,i)+"',"+nilaiToFloat(this.sg.cells(8,i))+",'"+this.kodepp+"','"+this.drkSPI+"','D','-',"+nilaiToFloat(this.sg.cells(6,i))+","+nilaiToFloat(this.sg.cells(5,i))+",'"+this.sg.cells(9,i)+"','"+this.dp_d1.getDateString()+"','"+this.e_nb.getText()+"','-',"+nilaiToFloat(this.sg.cells(8,i))+",'"+this.cb_plan.getText()+"')");

							if (this.sg.cells(7,i) != "0") 
								sql.add("update inv_obli_d set tgl_akru_kupon_seb=tgl_akru_kupon, tgl_akru_kupon='"+this.dp_d1.getDateString()+"', no_cair_piukupon='"+this.e_nb.getText()+"' where no_beli='"+this.sg.cells(0,i)+"' and kode_jenis='"+this.cb_jenis.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
							else sql.add("update inv_obli_d set tgl_akru_kupon_seb=tgl_akru_kupon, tgl_akru_kupon='"+this.dp_d1.getDateString()+"' where no_beli='"+this.sg.cells(0,i)+"' and kode_jenis='"+this.cb_jenis.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");

							sql.add("insert into angg_r(no_bukti,modul,kode_lokasi,kode_akun,kode_pp,kode_drk,periode1,periode2,dc,saldo,nilai) values "+
									"('"+this.e_nb.getText()+"','OBLCAIR','"+this.app._lokasi+"','"+this.sg.cells(2,i)+"','"+this.kodepp+"','"+this.drkSPI+"','"+this.e_periode.getText()+"','"+this.e_periode.getText()+"','D',0,"+nilaiToFloat(this.sg.cells(6,i))+")");								
 							
						}
					}										
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
					this.sg.clear(1); 
					setTipeButton(tbSimpan);
				break;
			case "simpan" :	
			case "ubah" :	
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
			case "hapus" :	
				this.app._periode = this.dbLib.getPeriode(this.app._lokasi);
				if (parseFloat(this.app._periode) > parseFloat(this.e_periode.getText())){
					system.alert(this,"Periode transaksi tidak valid.","Periode transaksi tidak boleh kurang dari periode aktif sistem.["+this.app._periode+"]");
					return false;
				}	
				else {	
					uses("server_util_arrayList");
					var sql = new server_util_arrayList();
					sql.add("update a set a.tgl_akru_kupon=a.tgl_akru_kupon_seb "+
							"from inv_obli_d a inner join inv_obliakru_d b on a.kode_jenis=b.kode_jenis and a.kode_beli=b.kode_beli "+
							"where b.no_akru='"+this.e_nb.getText()+"' and a.kode_lokasi='"+this.app._lokasi+"'");
					sql.add("update inv_obli_d set no_cair_piukupon='-' where no_cair_piukupon='"+this.e_nb.getText()+"' and kode_jenis='"+this.cb_jenis.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");

					sql.add("update inv_obliakru_d set no_cair='-',no_kas='-' where no_cair='"+this.e_nb.getText()+"' and kode_jenis='"+this.cb_jenis.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");							
					sql.add("delete from inv_oblicair_m where no_cair ='"+this.e_nb.getText()+"' ");						
					sql.add("delete from inv_oblicair_j where no_cair ='"+this.e_nb.getText()+"' ");
					sql.add("delete from inv_obliakru_d where no_akru ='"+this.e_nb.getText()+"' ");
					sql.add("delete from angg_r where no_bukti ='"+this.e_nb.getText()+"' ");
					setTipeButton(tbAllFalse);	
					this.dbLib.execArraySQL(sql);
				}
				break;
		}
	},
	doSelectDate: function(sender, y,m,d){
		try {
			if (m < 10) m = "0" + m;			
			if (parseFloat(this.app._periode.substr(4,2)) <= 12) this.e_periode.setText(y+""+m);
			else {
				if (m == "12") this.e_periode.setText(this.app._periode);
				else this.e_periode.setText(y+""+m);
			}
			if (this.stsSimpan == 1) this.doClick(this.i_gen);		
		}
		catch(e) {
			alert(e);
		}
	},
	doChange:function(sender){
		if (sender == this.e_periode && this.stsSimpan==1) {
			this.sg.clear(1); 
			this.e_akru.setText("0");	
			this.e_nilai.setText("0");
		}
		if (sender == this.cb_jenis && this.cb_jenis.getText()!="" && this.stsSimpan==1) {			
			var strSQL = "select a.no_beli,c.tgl_akru_kupon,a.akun_piukupon,a.akun_kupon,sum(a.jml_hari) as jml_hari,sum(a.nilai) as nilai,c.nilai as nominal, "+						 
			             "case when c.no_cair_piukupon='-' then c.nilai_piukupon else 0 end as nilai_piukupon "+
						 "from inv_obliakru_d a inner join inv_obliakru_m b on a.no_akru=b.no_akru and a.kode_lokasi=b.kode_lokasi "+
						 "                      inner join inv_obli_d c on a.no_beli=c.no_beli and a.kode_jenis=c.kode_jenis "+
						 "where a.kode_jenis='"+this.cb_jenis.getText()+"' and a.kode_lokasi='"+this.app._lokasi+"' and a.no_cair='-' "+
						 "group by a.no_beli,a.akun_piukupon,a.akun_kupon,c.nilai,c.no_cair_piukupon,c.nilai_piukupon,c.tgl_akru_kupon ";			
			var data = this.dbLib.getDataProvider(strSQL,true);
			if (typeof data == "object" && data.rs.rows[0] != undefined){
				var line;
				this.sg.clear();
				for (var i in data.rs.rows){
					line = data.rs.rows[i];						
					this.sg.appendData([line.no_beli,line.akun_piukupon,line.akun_kupon,this.drkSPI,floatToNilai(line.nominal),floatToNilai(line.jml_hari),floatToNilai(line.nilai),floatToNilai(line.nilai_piukupon),"0",line.tgl_akru_kupon]);
				}
			} else this.sg.clear(1);						
				
		}
	},
	doClick:function(sender){
		if (sender == this.i_gen) {
			this.e_nb.setText(this.standarLib.noBuktiOtomatis(this.dbLib,"inv_oblicair_m","no_cair",this.app._lokasi+"-KUP"+this.e_periode.getText().substr(2,4)+".","000"));
			this.e_ket.setFocus();
		}		
	},		
	doChangeCell: function(sender, col, row){
		if (col == 8) this.sg.validasi();		
	},
	doNilaiChange: function(){
		try{						
			var akru = cair = piu = 0;
			for (var i = 0; i < this.sg.rows.getLength();i++){
				if (this.sg.rowValid(i) && this.sg.cells(6,i) != "" && this.sg.cells(8,i) != ""){
					akru += nilaiToFloat(this.sg.cells(6,i));				
					cair += nilaiToFloat(this.sg.cells(8,i));									
					piu += nilaiToFloat(this.sg.cells(7,i));									
				}
			}
			this.e_akru.setText(floatToNilai(akru));
			this.e_nilai.setText(floatToNilai(cair));			
			this.e_piukupon.setText(floatToNilai(piu));			
		}catch(e)
		{
			alert("[app_saku_gl_transaksi_fJu2]::doNilaiChange:"+e);
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
	},
	doLoad3:function(sender){														
		var strSQL = "select distinct a.no_cair,convert(varchar,a.tanggal,103) as tgl,a.keterangan,a.nilai "+
		             "from inv_oblicair_m a "+
					 "left join (select distinct no_akru from inv_obliakru_d where no_kas<>'-')  b on a.no_cair=b.no_akru "+	
					 "where b.no_akru is null and a.posted='F' and a.periode='"+this.e_periode.getText()+"' and a.kode_lokasi='"+this.app._lokasi+"' ";
		var data = this.dbLib.getDataProvider(strSQL,true);
		if (typeof data == "object" && data.rs.rows[0] != undefined){
			this.dataJU3 = data;
			this.sgn3.setTotalPage(Math.ceil(data.rs.rows.length/20));
			this.sgn3.rearrange();
			this.doTampilData3(1);		
		} else this.sg3.clear(1);			
	},
	doTampilData3: function(page) {
		this.sg3.clear();
		var line;
		this.page = page;
		var start = (page - 1) * 20;
		var finish = (start + 20 > this.dataJU3.rs.rows.length? this.dataJU3.rs.rows.length:start+20);
		for (var i=start;i<finish;i++){
			line = this.dataJU3.rs.rows[i];													
			this.sg3.appendData([line.no_cair,line.tgl,line.keterangan,line.nilai,"Pilih"]); 
		}
		this.sg3.setNoUrut(start);			
	},
	doPager3: function(sender, page) {
		this.doTampilData3(page);
	},	
	doSgBtnClick3: function(sender, col, row){
		try{
			if (col == 4) this.doDoubleClick3(this.sg3,0,row); 				
		}catch(e){
			alert(e);
		}
	},
	doDoubleClick3: function(sender, col , row) {
		try{
			var baris = row;
			if (this.sg3.cells(0,baris) != "") {							
				this.pc2.setActivePage(this.pc2.childPage[0]);																						
				this.pc1.setActivePage(this.pc1.childPage[0]);																						
				setTipeButton(tbHapus);
				this.stsSimpan = 0;								
				this.e_nb.setText(this.sg3.cells(0,baris));								
								
				var strSQL = "select * from inv_oblicair_m where no_cair= '"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'";
				var data = this.dbLib.getDataProvider(strSQL,true);
				if (typeof data == "object"){
					var line = data.rs.rows[0];							
					if (line != undefined){																			
						this.dp_d1.setText(line.tanggal);																									
						this.e_ket.setText(line.keterangan);
						this.cb_plan.setText(line.kode_plan);	
						this.cb_jenis.setText(line.kode_jenis);											
						this.e_nilai.setText(floatToNilai(line.nilai));	
						this.cb_buat.setText(line.nik_buat);
						this.cb_app.setText(line.nik_setuju);
					}
				}		
				
				var strSQL = "select a.no_beli,c.tgl_akru_kupon,a.akun_piukupon,a.akun_kupon,sum(a.jml_hari) as jml_hari,sum(a.nilai) as nilai,c.nilai as nominal, "+						 
							"case when c.no_cair_piukupon='"+this.e_nb.getText()+"' then c.nilai_piukupon else 0 end as nilai_piukupon, e.nilai_cair "+
							"from inv_obliakru_d a "+
							"		inner join inv_obliakru_m b on a.no_akru=b.no_akru and a.kode_lokasi=b.kode_lokasi "+
							"       inner join inv_obli_d c on a.no_beli=c.no_beli and a.kode_jenis=c.kode_jenis "+							
							"		inner join inv_obliakru_d e on a.no_beli=e.no_beli and a.kode_jenis=e.kode_jenis and a.no_cair=e.no_akru "+
							"where a.kode_jenis='"+this.cb_jenis.getText()+"' and a.kode_lokasi='"+this.app._lokasi+"' and a.no_cair='"+this.e_nb.getText()+"' "+
							"group by a.no_beli,a.akun_piukupon,a.akun_kupon,c.nilai,c.no_cair_piukupon,c.nilai_piukupon,c.tgl_akru_kupon,e.nilai_cair ";			
				var data = this.dbLib.getDataProvider(strSQL,true);
				if (typeof data == "object" && data.rs.rows[0] != undefined){
					var line;
					this.sg.clear();
					for (var i in data.rs.rows){
						line = data.rs.rows[i];						
						this.sg.appendData([line.no_beli,line.akun_piukupon,line.akun_kupon,this.drkSPI,floatToNilai(line.nominal),floatToNilai(line.jml_hari),floatToNilai(line.nilai),floatToNilai(line.nilai_piukupon),floatToNilai(line.nilai_cair),line.tgl_akru_kupon]);
					}
				} else this.sg.clear(1);
				
			}
		} catch(e) {alert(e);}
	}	
});