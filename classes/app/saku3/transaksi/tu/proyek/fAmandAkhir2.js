window.app_saku3_transaksi_tu_proyek_fAmandAkhir2 = function(owner)
{
	if (owner)
	{
		window.app_saku3_transaksi_tu_proyek_fAmandAkhir2.prototype.parent.constructor.call(this,owner);
		this.className  = "app_saku3_transaksi_tu_proyek_fAmandAkhir2";
		this.itemsValue = new arrayList();
		this.app._mainForm.childFormConfig(this, "mainButtonClick","Form Amandemen Proyek Pdpt/Beban", 0);	
		
		uses("saiCBBL;saiEdit;saiGrid;sgNavigator");
		
		this.pc2 = new pageControl(this,{bound:[10,10,1000,450], childPage:["List Proyek","Data Proyek"]});		
		this.sg3 = new saiGrid(this.pc2.childPage[0],{bound:[1,5,this.pc2.width-5,this.pc2.height-35],colCount:5,tag:9,
		            colTitle:["No Proyek","Customer","No Dokumen","Deskripsi","Nilai"],
					colWidth:[[4,3,2,1,0],[100,300,200,200,100]],
					colFormat:[[4],[cfNilai]],readOnly:true,
					dblClick:[this,"doDoubleClick3"],autoAppend:false,defaultRow:1});		
		this.sgn3 = new portalui_sgNavigator(this.pc2.childPage[0],{bound:[1,this.pc2.height-25,this.pc2.width-1,25],buttonStyle:3,grid:this.sg3,pager:[this,"doPager3"]});
		this.bLoad3 = new portalui_imageButton(this.sgn3,{bound:[this.sgn3.width - 25,2,22,22],image:"icon/"+system.getThemes()+"/reload.png", hint:"Load Data",click:[this,"doLoad3"]});				
		
		this.cb_kode = new saiLabelEdit(this.pc2.childPage[1],{bound:[20,10,200,20],caption:"ID Proyek", readOnly:true, change:[this,"doChange"]});	
		
		this.pc1 = new pageControl(this.pc2.childPage[1],{bound:[1,20,996,392], childPage:["Data Rekap","Dist Pdpt/Beban"]});		
		this.l_tgl2 = new portalui_label(this.pc1.childPage[0],{bound:[20,13,100,18],caption:"Tgl Mulai", underline:true});
		this.dp_d2 = new portalui_datePicker(this.pc1.childPage[0],{bound:[120,13,98,18]}); 		
		this.l_tgl3 = new portalui_label(this.pc1.childPage[0],{bound:[20,14,100,18],caption:"Tgl Selesai", underline:true});
		this.dp_d3 = new portalui_datePicker(this.pc1.childPage[0],{bound:[120,14,98,18]}); 		

		this.e_nilai = new saiLabelEdit(this.pc1.childPage[0],{bound:[20,13,200,20],caption:"Nilai Proyek", tag:1, tipeText:ttNilai, text:"0",change:[this,"doChange"], readOnly:true});
		this.e_nilaippn = new saiLabelEdit(this.pc1.childPage[0],{bound:[20,14,200,20],caption:"Nilai PPN", tag:1, tipeText:ttNilai, text:"0"});				
		this.i_gen = new portalui_imageButton(this.pc1.childPage[0],{bound:[225,14,20,20],hint:"Hitung PPN",image:"icon/"+system.getThemes()+"/tabCont2.png",click:[this,"doPPN"]});						
		this.e_nilaior = new saiLabelEdit(this.pc1.childPage[0],{bound:[20,17,200,20],caption:"Nilai OR", tag:1, tipeText:ttNilai, text:"0", readOnly:true});						
		
		this.l_tgl1 = new portalui_label(this.pc1.childPage[0],{bound:[20,13,100,18],caption:"Tgl Jurnal", underline:true});
		this.dp_d1 = new portalui_datePicker(this.pc1.childPage[0],{bound:[120,13,98,18],selectDate:[this,"doSelectDate"]}); 		
		this.e_nopiu = new saiLabelEdit(this.pc1.childPage[0],{bound:[20,11,200,20],caption:"Bukti Koreksi [AR]",readOnly:true,tag:1});	

		this.sg = new saiGrid(this.pc1.childPage[1],{bound:[1,5,this.pc1.width-5,this.pc1.height-35],colCount:7,tag:9,
		            colTitle:["Periode","Pdpt Lama","+/-","Pdpt Baru",  "BBN Lama","+/-","BBN Baru"],
					colWidth:[[6,5,4,   3,2,1,0],[100,100,100,  100,100,100,  100]],
					columnReadOnly:[true,[3,6],[]],
					colFormat:[[1,2,3, 4,5,6],[cfNilai,cfNilai,cfNilai, cfNilai,cfNilai,cfNilai]],	
					nilaiChange:[this,"doNilaiChange"],change:[this,"doChangeCells"],autoAppend:true,defaultRow:1});
		this.sgn = new portalui_sgNavigator(this.pc1.childPage[1],{bound:[0,this.pc1.height-25,this.pc1.width-1,25],buttonStyle:bsAll,grid:this.sg});		
		
		this.rearrangeChild(10, 23);
		this.pc2.childPage[1].rearrangeChild(10, 23);
		this.pc1.childPage[0].rearrangeChild(10, 23);	
		
		setTipeButton(tbAllFalse);
		this.maximize();		
		this.setTabChildIndex();
		try {
			
			this.dbLib = new util_dbLib();
			this.dbLib.addListener(this);
			uses("util_standar");
			this.standarLib = new util_standar();
			this.stsSimpan = 1;

			this.doSelectDate(this.dp_d1,this.dp_d1.year,this.dp_d1.month,this.dp_d1.day);

		}catch(e){
			systemAPI.alert(e);
		}
	}
};
window.app_saku3_transaksi_tu_proyek_fAmandAkhir2.extend(window.childForm);
window.app_saku3_transaksi_tu_proyek_fAmandAkhir2.implement({	
	doSelectDate: function(sender, y,m,d){
		if (m < 10) m = "0" + m;			
		this.periode = y+""+m;		

		this.e_nopiu.setText(this.standarLib.noBuktiOtomatis(this.dbLib,"tu_prpiutang_m","no_bukti",this.app._lokasi+"-PIU"+this.periode.substr(2,4)+".","0000"));			
	},
	doChangeCells: function(sender, col, row){		
		if (col == 2) {
			var sls = nilaiToFloat(this.sg.cells(1,row)) + nilaiToFloat(this.sg.cells(2,row));
			this.sg.cells(3,row,floatToNilai(sls));

			this.sg.validasi();
		}	
		if (col == 5) {
			var sls = nilaiToFloat(this.sg.cells(4,row)) + nilaiToFloat(this.sg.cells(5,row));
			this.sg.cells(6,row,floatToNilai(sls));

			this.sg.validasi();
		}			
	},
	doNilaiChange: function(){
		try{			
			var pdpt = beban = 0;
			for (var i = 0; i < this.sg.rows.getLength();i++){
				if (this.sg.rowValid(i) && this.sg.cells(3,i) != ""){					
					pdpt += nilaiToFloat(this.sg.cells(3,i));						
				}
				if (this.sg.rowValid(i) && this.sg.cells(6,i) != ""){					
					beban += nilaiToFloat(this.sg.cells(6,i));						
				}
			}								
			this.e_nilai.setText(floatToNilai(pdpt));	
			this.e_nilaior.setText(floatToNilai(beban));		
		}catch(e)
		{
			alert("[app_saku_gl_transaksi_fJu2]::doNilaiChange:"+e);
		}
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
	simpan: function(){			
		try{						
			if (this.standarLib.checkEmptyByTag(this, [0,1])){
				try{									
					uses("server_util_arrayList");
					var sql = new server_util_arrayList();
					
					sql.add("delete from tu_proyek_d where kode_proyek = '"+this.cb_kode.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");																							
					
					for (var i=0;i < this.sg.getRowCount();i++){
						if (this.sg.rowValid(i)) {									
							sql.add("insert into tu_proyek_d(kode_proyek,kode_lokasi,nu,periode,nilai_pend,nilai_beban) values "+
									"('"+this.cb_kode.getText()+"','"+this.app._lokasi+"',"+i+",'"+this.sg.cells(0,i)+"',"+nilaiToFloat(this.sg.cells(3,i))+","+nilaiToFloat(this.sg.cells(6,i))+")");							
						}														
					}


					if ((this.totalPdptLama != nilaiToFloat(this.e_nilai.getText())) && (this.noPiuAkhir!="-")) {							
							sql.add("insert into tu_prpiutang_m (no_bukti,no_dokumen,tanggal,keterangan,akun_piutang,akun_pyt,nik_buat,nik_app,kode_lokasi,kode_pp,modul,nilai,posted,periode,nik_user,tgl_input, kode_pp2,dc)  "+
									"select '"+this.e_nopiu.getText()+"',no_dokumen,'"+this.dp_d1.getDateString()+"','Reverse Akru Piutang Proyek : "+this.cb_kode.getText()+"',akun_pyt,akun_piutang,'"+this.app._userLog+"','"+this.app._userLog+"',kode_lokasi,kode_pp,modul,0,'F','"+this.periode+"','"+this.app._userLog+"',getdate(), kode_pp2,'C' "+
									"from tu_prpiutang_m where no_bukti = '"+this.noPiuAkhir+"' and kode_lokasi='"+this.app._lokasi+"'");
							
							//reverse jurnal piutang - pyt sebelumnya
							sql.add("insert into tu_prpiutang_j(no_bukti,no_dokumen,tanggal,no_urut,kode_akun,keterangan,dc,nilai,kode_pp,kode_drk,kode_lokasi,modul,jenis,periode,kode_curr,kurs,nik_user,tgl_input)  "+
									"select '"+this.e_nopiu.getText()+"',no_dokumen,'"+this.dp_d1.getDateString()+"',no_urut,kode_akun,keterangan,case dc when 'D' then 'C' else 'D' end,nilai,kode_pp,kode_drk,kode_lokasi,modul,jenis,'"+this.periode+"',kode_curr,kurs,'"+this.app._userLog+"',getdate() "+
									"from tu_prpiutang_j "+
									"where no_bukti='"+this.noPiuAkhir+"' and kode_lokasi='"+this.app._lokasi+"'");											
					
							//jurnal betulnya
							sql.add("insert into tu_prpiutang_j(no_bukti,no_dokumen,tanggal,no_urut,kode_akun,keterangan,dc,nilai,kode_pp,kode_drk,kode_lokasi,modul,jenis,periode,kode_curr,kurs,nik_user,tgl_input)  "+
									"select '"+this.e_nopiu.getText()+"',no_dokumen,'"+this.dp_d1.getDateString()+"',no_urut,kode_akun,keterangan,dc,"+nilaiToFloat(this.e_nilai.getText())+",kode_pp,kode_drk,kode_lokasi,modul,jenis,'"+this.periode+"',kode_curr,kurs,'"+this.app._userLog+"',getdate() "+
									"from tu_prpiutang_j "+
									"where no_bukti='"+this.noPiuAkhir+"' and kode_lokasi='"+this.app._lokasi+"'");											
									

							//pyt di koreksi
							var strSQL = "select sum(case dc when 'D' then nilai else -nilai end) as totpyt "+
										 "from tu_prpyt_d where kode_proyek = '"+this.cb_kode.getText()+"' and kode_lokasi='"+this.app._lokasi+"'";						
							var data = this.dbLib.getDataProvider(strSQL,true);
							if (typeof data == "object"){
								var line = data.rs.rows[0];							
								if (line != undefined){								
									var totPYT = parseFloat(line.totpyt);						
								}
							}

							sql.add("insert into tu_prpyt_m (no_bukti,no_dokumen,keterangan,tanggal,nilai,periode,kode_pp,kode_drk,kode_lokasi,nik_app,nik_user,tgl_input,posted,kode_curr,kurs,modul) values  "+
									"('"+this.e_nopiu.getText()+"','-','Amandemen Poyek "+this.cb_kode.getText()+"','"+this.dp_d1.getDateString()+"',"+totPYT+",'"+this.periode+"','"+this.app._kodePP+"','-','"+this.app._lokasi+"','"+this.app._userLog+"','"+this.app._userLog+"',getdate(),'F','IDR',1,'R-PYT')");

							sql.add("insert into tu_prpyt_d(no_bukti,kode_lokasi,kode_proyek,periode,periode_dis,akun_pyt,akun_pdpt,kode_pp,kode_drk,nilai,dc,modul) "+
									"select '"+this.e_nopiu.getText()+"',kode_lokasi,kode_proyek,periode,'"+this.periode+"',akun_pdpt,akun_pyt,kode_pp,kode_drk,nilai,case dc when 'D' then 'C' else 'D' end,'R-PYTDIS' "+
									"from tu_prpyt_d  "+
									"where kode_proyek = '"+this.cb_kode.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");						
							sql.add("insert into tu_prpyt_j(no_bukti,no_dokumen,tanggal,no_urut,kode_akun,keterangan,dc,nilai,kode_pp,kode_drk,kode_lokasi,modul,jenis,periode,kode_curr,kurs,nik_user,tgl_input) "+							
									"select '"+this.e_nopiu.getText()+"',no_dokumen,'"+this.dp_d1.getDateString()+"',no_urut,kode_akun,keterangan,case dc when 'D' then 'C' else 'D' end,nilai,kode_pp,kode_drk,kode_lokasi,modul,jenis,'"+this.periode+"',kode_curr,kurs,'"+this.app._userLog+"',getdate() "+
									"from tu_prpyt_j where no_dokumen='"+this.cb_kode.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
					}

					//simpan histori by tgl input, dan user peng-edit
					sql.add("insert into tu_proyek_his (kode_proyek,kode_lokasi,tgl_input,nik_user, tgl_mulai,tgl_selesai,nilai,nilai_ppn,nilai_or,p_or) "+
							"select kode_proyek,kode_lokasi,getdate(),'"+this.app._userLog+"', tgl_mulai,tgl_selesai,nilai,nilai_ppn,nilai_or,p_or "+
							"from tu_proyek where kode_proyek='"+this.cb_kode.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");

					
					if (nilaiToFloat(this.e_nilai.getText()) != 0) var p_or = Math.round(nilaiToFloat(this.e_nilaior.getText()) / nilaiToFloat(this.e_nilai.getText()) * 10000)/100;
					else var p_or = 0;
					sql.add("update tu_proyek set tgl_mulai='"+this.dp_d2.getDateString()+"',tgl_selesai='"+this.dp_d3.getDateString()+"',nilai="+nilaiToFloat(this.e_nilai.getText())+",nilai_ppn="+nilaiToFloat(this.e_nilaippn.getText())+",nilai_or="+nilaiToFloat(this.e_nilaior.getText())+",p_or="+p_or+" where kode_proyek='"+this.cb_kode.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");

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
					this.standarLib.clearByTag(this, new Array("0","1"),this.cb_kode);
					setTipeButton(tbAllFalse);
					this.stsSimpan = 1;				
					this.sg.clear(1);
					this.sg3.clear(1);								
					this.pc1.setActivePage(this.pc1.childPage[0]);						
				break;
			case "ubah" :	
				this.sg.validasi();
				var data = this.dbLib.getDataProvider("select a.periode, isnull(c.no_bukti,'-') as no_beban,a.nilai_beban as beban "+
							"from tu_proyek_d a "+							
							"		left join tu_prbdd_d c on a.kode_proyek=c.kode_proyek and a.periode=c.periode and a.kode_lokasi=c.kode_lokasi and c.dc ='D' "+
							"where a.kode_proyek = '"+this.cb_kode.getText()+"' and a.kode_lokasi='"+this.app._lokasi+"' order by a.nu",true);

				if (typeof data == "object" && data.rs.rows[0] != undefined){
					var line;

					for (var i in data.rs.rows){
						line = data.rs.rows[i];			
						
						var temuBebanSalah = false;							
						if (line.no_beban != "-") var temuPeriodeBeban = false;	
						else var temuPeriodeBeban = true;	

						for (var j=0;j < this.sg.getRowCount();j++) {
							if (this.sg.rowValid(j)) {			

								//periode ada, nilai berubah, sudah pernah jurnal beban---> tidak boleh di edit					
								if (line.periode == this.sg.cells(0,j) && parseFloat(line.beban) != nilaiToFloat(this.sg.cells(6,j)) && line.no_beban != "-") {
									temuBebanSalah = true;
								}
								//jika periode yg sudah dibebnkan ketemu... berarti gak dihapus
								if (line.periode == this.sg.cells(0,j)) {
									temuPeriodeBeban = true;
								}


							}								
						}

					}
				} 
				if (temuBebanSalah){
					system.alert(this,"Transaksi tidak valid.","Terdapat perubahan pada nilai beban yang sudah distribusi.");
					return false;
				}
				if (!temuPeriodeBeban){
					system.alert(this,"Transaksi tidak valid.","Tidak ditemukan Periode distribusi beban yang sudah jurnal.");
					return false;
				}

				if (parseFloat(this.app._periode) > parseFloat(this.periode)){
					system.alert(this,"Periode transaksi tidak valid.","Periode transaksi tidak boleh kurang dari periode aktif sistem.["+this.app._periode+"]");
					return false;
				}

				else this.simpan();
				break;				
			case "simpancek" : this.simpan();			
				break;
					
		}
	},	
	doPPN:function(sender){	
		if (this.e_nilai.getText() != "") {				
			var nilaiPPN = Math.round(nilaiToFloat(this.e_nilai.getText()) * 10/100);
			this.e_nilaippn.setText(floatToNilai(nilaiPPN));				
		}			
	},				
	doChange: function(sender){
		try{			
			if (sender == this.cb_kode && this.cb_kode.getText() != ""){

				var strSQL = "select a.*,isnull(b.catatan,'-') as catatan from tu_proyek a "+
							 "left join tu_proyek_app b on a.kode_proyek=b.no_bukti and a.kode_lokasi=b.kode_lokasi and b.no_appseb='-'  "+
							 "where a.kode_proyek ='"+this.cb_kode.getText()+"' and a.kode_lokasi='"+this.app._lokasi+"'";						   
				var data = this.dbLib.getDataProvider(strSQL,true);
				if (typeof data == "object"){
					var line = data.rs.rows[0];							
					if (line != undefined){							
						
						this.dp_d2.setText(line.tgl_mulai);
						this.dp_d3.setText(line.tgl_selesai);
						this.totalPdptLama = 0;
						var data = this.dbLib.getDataProvider("select * from tu_proyek_d where kode_proyek = '"+this.cb_kode.getText()+"' and kode_lokasi='"+this.app._lokasi+"' order by nu",true);
						if (typeof data == "object" && data.rs.rows[0] != undefined){
							var line;
							this.sg.clear();							
							for (var i in data.rs.rows){
								line = data.rs.rows[i];												
								this.sg.appendData([line.periode,floatToNilai(line.nilai_pend),"0",floatToNilai(line.nilai_pend),  floatToNilai(line.nilai_beban),"0",floatToNilai(line.nilai_beban), ]);								
								this.totalPdptLama += parseFloat(line.nilai_pend);
							}
						} 
						else {
							this.sg.clear(1);
							this.sg2.clear(1);	
						}
						this.sg.validasi();

						setTipeButton(tbUbah);
						
					}					
				}

				this.noPiuAkhir = "-";
				var strSQL = "select top 1 no_bukti from tu_prpiutang_m a where a.no_dokumen = '"+this.cb_kode.getText()+"' and a.kode_lokasi='"+this.app._lokasi+"' order by a.no_bukti desc";						
				var data = this.dbLib.getDataProvider(strSQL,true);
				if (typeof data == "object"){
					var line = data.rs.rows[0];							
					if (line != undefined){								
						this.noPiuAkhir = line.no_bukti;						
					}
				}	

			}
			
			/*
			if (sender == this.e_persenor && this.e_persenor.getText() != "") {				
				var nilaiOR = Math.round(nilaiToFloat(this.e_nilai.getText()) * nilaiToFloat(this.e_persenor.getText())/100);
				this.e_nilaior.setText(floatToNilai(nilaiOR));
			}
			*/
						
		}catch(e){
			systemAPI.alert(e);
		}
	},		
	doRequestReady: function(sender, methodName, result){
		if (sender == this.dbLib){
			try{   
				switch(methodName){
	    			case "execArraySQL" :	    				
						if (result.toLowerCase().search("error") == -1)					
						{
							this.app._mainForm.pesan(2,"transaksi telah sukses tereksekusi (Kode : "+ this.cb_kode.getText()+")");							
							this.app._mainForm.bClear.click();

							this.fileUtil.deleteFiles(this.deletedFiles);
							this.uploadedFiles = "";
							this.deletedFiles = "";

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
		var strSQL = "select a.kode_proyek,b.nama,a.no_pks,a.nama as keterangan,a.nilai "+
		             "from tu_proyek a inner join cust b on a.kode_cust=b.kode_cust and a.kode_lokasi=b.kode_lokasi "+					 					 
					 "where a.kode_lokasi='"+this.app._lokasi+"' and a.progress not in ('0','R') ";	//a.kode_pp='"+this.app._kodePP+"' and 
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
			this.sg3.appendData([line.kode_proyek,line.nama,line.no_pks,line.keterangan,floatToNilai(line.nilai)]); 
		}
		this.sg3.setNoUrut(start);
	},
	doPager3: function(sender, page) {
		this.doTampilData3(page);
	},
	doDoubleClick3: function(sender, col , row) {
		try{
			if (this.sg3.cells(0,row) != "") {
				this.pc2.setActivePage(this.pc2.childPage[1]);																		
				this.pc1.setActivePage(this.pc1.childPage[0]);																						
				this.cb_kode.setText(this.sg3.cells(0,row));												
			}									
		} catch(e) {alert(e);}
	}
});