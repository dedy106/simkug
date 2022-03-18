window.app_saku_gl_transaksi_fJP = function(owner)
{
	if (owner)
	{
		window.app_saku_gl_transaksi_fJP.prototype.parent.constructor.call(this, owner);
		this.className = "app_saku_gl_transaksi_fJP";
		this.app._mainForm.childFormConfig(this, "mainButtonClick","Jurnal Penutup", 0);	
		
		this.maximize();		
		uses("portalui_datePicker;portalui_saiCBBL;portalui_pageControl;portalui_childPage;util_standar");
		this.ed_period = new portalui_saiLabelEdit(this,{bound:[20,10,182,20],caption:"Periode",readOnly:true});		
		this.lblTgl1 = new portalui_label(this,{bound:[20,32,101,18],caption:"Tanggal",underline:true});						
		this.dp_tgl1 = new portalui_datePicker(this,{bound:[120,32,82,18], selectDate:[this,"doSelectDate"]});		
		this.ed_nb = new portalui_saiLabelEdit(this,{bound:[20,78,230,20],caption:"No Bukti", readOnly:true});					
		this.bGen = new portalui_button(this,{bound:[256,78,80,20],caption:"Gen",icon:"url(icon/"+system.getThemes()+"/process.png)",click:[this,"doClick"]});		   
		this.ed_dok = new portalui_saiLabelEdit(this,{bound:[20,100,310,20],caption:"No Dokumen",maxLength:50});
		this.ed_desc = new portalui_saiLabelEdit(this,{bound:[20,122,500,20],caption:"Deskripsi",maxLength:150});
		this.cb_curr = new portalui_saiCBBL(this,{bound:[20,144,185,20],caption:"Currency dan Kurs",text:"IDR",tag:9,readOnly:true});
		this.ed_kurs = new portalui_saiLabelEdit(this,{bound:[205,144,45,20],caption:"",labelWidth:0,tipeText:ttNilai, alignment:alRight, text:"1",readOnly:true});
		this.cb_pembuat = new portalui_saiCBBL(this,{bound:[20,166,185,20],caption:"Dibuat Oleh",btnClick:[this,"doFindBtnClick"]});
		this.ed_debet = new portalui_saiLabelEdit(this,{bound:[680,166,220,20],caption:"Total Debet",tipeText:ttNilai, alignment:alRight,readOnly:true,text:"0"});
		this.cb_setuju = new portalui_saiCBBL(this,{bound:[20,188,185, 20],caption:"Disetujui Oleh",btnClick:[this,"doFindBtnClick"]});		
		this.ed_kredit = new portalui_saiLabelEdit(this,{bound:[680,188, 220,20],caption:"Total Kredit",tipeText:ttNilai, alignment:alRight, text:"0",readOnly:true});		
		this.rearrangeChild(10,23);
		this.pc = new portalui_pageControl(this,{bound:[20,210,900,260],color:this.bgColor});	        	
		this.bGar = new portalui_button(this,{bound:[800,200,100,22],caption:"Tampil",hint:"Load",image:"icon/"+system.getThemes()+"/tabCont2.png",click:[this,"doUploadTB"]});					    
		this.p1 = new portalui_childPage(this.pc,{caption:"Data Akun"});
		this.p2 = new portalui_childPage(this.pc,{caption:"Data Jurnal"});
		uses("portalui_saiGrid;portalui_sgNavigator");
    	this.sg1 = new portalui_saiGrid(this.p1,{bound:[0,0,900,230],colCount:7,
				colTitle:["Kode Akun","Nama Akun","Kode PP","SaldoAwal","Debet","Kredit","Saldo Akhir"],readOnly:true,
				colFormat:[[3,4,5,6],[cfNilai, cfNilai, cfNilai, cfNilai]], colWidth:[[0,1,2,3,4,5,6],[100,200,100,100,100,100,100]]});				
		this.sg2 = new portalui_saiGrid(this.p2,{bound:[0,0,900,240],colCount:5,
				colTitle:["Kode Akun","Nama Akun","DC","Nilai","Kode PP"],readOnly:true,
				colFormat:[[3],[cfNilai]], colWidth:[[4,3,2,1,0],[100,100,80,200,100]]});
		
		this.setTabChildIndex();
		this.dbLib = new util_dbLib();
		this.dbLib.addListener(this);
		this.standarLib = new util_standar();
		this.ed_period.setText(this.app._periode);	
		this.cb_pembuat.setText(this.app._userLog, this.app._namaUser);
		this.cb_pembuat.setSQL("select nik, nama from karyawan where kode_lokasi = '"+this.app._lokasi+"' ",["nik","nama"],true);
		this.cb_setuju.setSQL("select nik, nama from karyawan where kode_lokasi = '"+this.app._lokasi+"' ",["nik","nama"],true);
		var sql = new server_util_arrayList();
		sql.add("select m.kode_akun, m.nama from masakun m "+
			" inner join flag_relasi b on b.kode_akun = m.kode_akun and m.kode_lokasi = b.kode_lokasi "+
			" where b.kode_flag = '999' and m.kode_lokasi = '"+this.app._lokasi+"' ");
		sql.add("select value1 from spro where kode_lokasi = '"+this.app._lokasi+"' and kode_spro = 'MAXPRD'");
		this.dbLib.getMultiDataProviderA(sql);				
		setTipeButton(tbSimpan);
	}
};
window.app_saku_gl_transaksi_fJP.extend(window.portalui_childForm);
window.app_saku_gl_transaksi_fJP.implement({
	doUploadTB: function(){		
		try{
			if (this.app._periode != this.app._periode.substr(0,4) +this.maxPeriode){
				systemAPI.alert("Periode sekarang ("+this.app._periode+") masih belum akhir periode keuangan("+(this.app._periode.substr(0,4) +this.maxPeriode)+").","Load data tidak dapat dilanjutkan.");
				return;
			}
			this.sg1.clear();
			this.sg1.showLoading();
			this.nik_user=this.app._nikUser;
			var sql = "call sp_glma_tmp ('"+this.app._lokasi+"','"+this.app._lokasi+"','"+this.app._lokasi+"','"+this.ed_period.getText()+"','"+this.nik_user+"')";
			
			this.dbLib.execQuerySync(sql);			
			sql = "select a.kode_akun,b.nama, '-' as kode_pp,a.so_awal, a.debet, a.kredit, round(a.so_akhir,0) as so_akhir "+
				"	from glma_tmp a inner join masakun b on b.kode_akun = a.kode_akun and b.kode_lokasi = a.kode_lokasi and b.modul = 'L' where a.kode_lokasi ='"+this.app._lokasi+"' and a.nik_user = '"+this.nik_user+"' and round(a.so_akhir,0) <> 0  ";
			
			var data = this.dbLib.getDataProvider(sql,true);
			var line;
			var dataDebet = [], dataKredit = [];
			var totD = 0, totC = 0;			
			for (var i in data.rs.rows){
				line = data.rs.rows[i];					
				if (line.so_akhir >= 0){
					dataDebet.push([line.kode_akun, line.nama, "C",floatToNilai(line.so_akhir),line.kode_pp]);
					totD += parseFloat(line.so_akhir);
				}else{
					dataKredit.push([line.kode_akun, line.nama, "D",floatToNilai(Math.abs(line.so_akhir)),line.kode_pp]);				
					totC += Math.abs(parseFloat(line.so_akhir));
				}
				this.sg1.appendData([line.kode_akun, line.nama, line.kode_pp, floatToNilai(line.so_awal),floatToNilai(line.debet),floatToNilai(line.kredit),floatToNilai(line.so_akhir)]);
			}		
			this.ed_debet.setText(floatToNilai(totD));
			this.ed_kredit.setText(floatToNilai(totC));
			this.sg1.hideLoading();
			this.sg2.clear();
			for (var i in dataDebet)
				this.sg2.appendData(dataDebet[i]);		
			for (var i in dataKredit)
				this.sg2.appendData(dataKredit[i]);		
		}catch(e){
			system.alert(this,"Error load data TB",data);
			this.sg1.hideLoading();
		}
	},
	mainButtonClick: function(sender){
		if (sender == this.app._mainForm.bClear)
			system.confirm(this, "clear", "screen akan dibersihkan?","form inputan ini akan dibersihkan");		
		if (sender == this.app._mainForm.bSimpan){
			if (this.app._periode != this.app._periode.substr(0,4) +this.maxPeriode){
				systemAPI.alert("Periode sekarang ("+this.app._periode+") masih belum akhir periode keuangan("+(this.app._periode.substr(0,4) +this.maxPeriode)+").","Process JP masih tidak bisa dilakukan.");
				return;
			}
			system.confirm(this, "simpan", "Apa data sudah benar?","data diform ini apa sudah benar.");		
		}
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
					this.ed_period.setText(this.app._periode);
				}
				break;
			case "simpan" :
					try{						
						if (this.standarLib.checkEmptyByTag(this, new Array("0","1","2"))){
							uses("server_util_arrayList");
							var sql = new server_util_arrayList();
							sql.add("insert into jp(no_bukti, tanggal, periode, keterangan, nik_pembuat, kode_lokasi, nilai, tgl_input, nik_user )values"+
								"('"+this.ed_nb.getText()+"','"+this.dp_tgl1.getDateString()+"','"+this.ed_period.getText()+"','Jurnal JP periode "+this.ed_period.getText()+"', "+
								"	'"+this.cb_pembuat.getText()+"','"+this.app._lokasi+"',"+parseNilai(this.ed_debet.getText())+",now(), '"+this.app._userLog+"')");
							var data;
							var dc = "";
							for (var i=0;i < this.sg1.rows.getLength(); i++){
								data="insert into jp_d(no_bukti, kode_lokasi, kode_akun, dc, nilai) values";								
								dc = (nilaiToFloat(this.sg1.cells(6,i)) < 0 ? "C" : "D");
								data += "('"+this.ed_nb.getText()+"','"+this.app._lokasi+"','"+this.sg1.cells(0,i)+"','"+dc+"',"+Math.abs(nilaiToFloat(this.sg1.cells(6,i)))+")";
								sql.add(data);
							}							
							var no_urut = 1;
							for (var i=0;i < this.sg2.rows.getLength(); i++){
								data ="insert into gldt(no_bukti, no_urut, kode_lokasi, no_dokumen, tanggal, kode_akun, dc, nilai, keterangan,  "+
									"	kode_pp, kode_drk, kode_cust, kode_proyek, kode_task, kode_vendor, kode_lokarea, nik, modul, jenis, periode, kode_curr, kurs, nilai_curr, tgl_input, nik_user) values";
								dc = this.sg2.cells(2,i);
								no_urut++;
								data += "('"+this.ed_nb.getText()+"','"+(no_urut)+"','"+this.app._lokasi+"','"+this.ed_nb.getText()+"','"+this.dp_tgl1.getDateString()+"','"+this.sg2.cells(0,i)+"','"+this.sg2.cells(2,i)+"',"+Math.abs(nilaiToFloat(this.sg2.cells(3,i)))+",'Jurnal Penutup ("+this.ed_period.getText()+")', "+
									" '-','-','-','-','-','-','-','"+this.cb_pembuat.getText()+"','JP','-','"+this.ed_period.getText()+"','IDR','1',"+Math.abs(nilaiToFloat(this.sg2.cells(3,i)))+",now(),'"+this.app._userLog+"' )";
								sql.add(data);
								data ="insert into gldt(no_bukti, no_urut, kode_lokasi, no_dokumen, tanggal, kode_akun, dc, nilai, keterangan,  "+
									"	kode_pp, kode_drk, kode_cust, kode_proyek, kode_task, kode_vendor, kode_lokarea, nik, modul, jenis, periode, kode_curr, kurs, nilai_curr, tgl_input, nik_user) values";
								no_urut++;
								data += "('"+this.ed_nb.getText()+"','"+(no_urut)+"','"+this.app._lokasi+"','"+this.ed_nb.getText()+"','"+this.dp_tgl1.getDateString()+"','"+this.akunJP.kode+"','"+(dc == "D" ? "C":"D")+"',"+Math.abs(nilaiToFloat(this.sg2.cells(3,i)))+",'Jurnal Penutup ("+this.ed_period.getText()+")', "+
									" '-','-','-','-','-','-','-','"+this.cb_pembuat.getText()+"','JP','-','"+this.ed_period.getText()+"','IDR','1',"+Math.abs(nilaiToFloat(this.sg2.cells(3,i)))+",now(),'"+this.app._userLog+"' )";
								sql.add(data);
							}					
							
							this.dbLib.execArraySQL(sql);						
						}
					}catch(e){
					
						systemAPI.alert(e);
					}
				break;
		}
		this.dp_tgl1.setFocus();
	},
	doSelectDate: function(sender, y, m, d){							
	},
	doClick: function(sender){
		this.ed_nb.setText(this.standarLib.noBuktiOtomatis(this.dbLib,"jp","no_bukti","JP/"+this.app._lokasi+"/"+this.ed_period.getText().substr(2,4),"00000"));
	},
	doFindBtnClick: function(sender){		
		this.standarLib.showListData(this, "Data Karyawan",sender,undefined, 
										  "select nik, nama from karyawan where kode_lokasi = '"+this.app._lokasi+"'",
										  "select count(nik) from karyawan where kode_lokasi = '"+this.app._lokasi+"'",
										  ["nik","nama"],"and",["NIK","Nama"],false); 
	},
	doRequestReady: function(sender, methodName,result){
		try{
			if (sender == this.dbLib){
				if (methodName == "getMultiDataProvider"){
					try{
						eval("result = "+result);
						result = result.result;
						if (result[0].rs.rows[0] !== undefined){
							this.akunJP = {kode:result[0].rs.rows[0].kode_akun,nama:result[0].rs.rows[0].nama};					
						}else {
							systemAPI.alert("Akun JP masih belum ada","Untuk menandai akun JP di form Relasi Flag Akun");
							return;
						}
						if (result[1].rs.rows[0] !== undefined)
							this.maxPeriode = result[1].rs.rows[0].value1;												
						if (this.app._periode != this.app._periode.substr(0,4) +this.maxPeriode){
							systemAPI.alert("Periode sekarang ("+this.app._periode+") masih belum akhir periode keuangan("+(this.app._periode.substr(0,4) +this.maxPeriode)+").","Process JP masih tidak bisa dilakukan.");
							return;
						}
					}catch(e){
						system.alert(this,"Error getdata",result);
					}					
				}
				if (methodName == "execArraySQL"){
					if (result.search("error") != -1){
						this.app._mainForm.pesan(2,"Proses Lengkap (kode lokasi : "+ this.ed_nb.getText()+" tersimpan.)");
						this.app._mainForm.bClear.click();
					}else systemAPI.alert("error Update",result);
				}
			}
		}catch(e){
			alert(e);
		}
	}
});
