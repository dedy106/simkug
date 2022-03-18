window.app_saku3_transaksi_gl_fJPdkm = function(owner)
{
	if (owner)
	{
		window.app_saku3_transaksi_gl_fJPdkm.prototype.parent.constructor.call(this, owner);
		this.className = "app_saku3_transaksi_gl_fJPdkm";
		this.app._mainForm.childFormConfig(this, "mainButtonClick","Jurnal Penutup Akhir Tahun", 0);	
		
		this.maximize();		
		uses("portalui_datePicker;portalui_saiCBBL;portalui_pageControl;portalui_childPage;util_standar;portalui_saiGrid;portalui_sgNavigator");
		this.ed_period = new portalui_saiLabelEdit(this,{bound:[20,10,200,20],caption:"Periode",readOnly:true});		
		this.lblTgl1 = new portalui_label(this,{bound:[20,11,100,18],caption:"Tanggal",underline:true});						
		this.dp_tgl1 = new portalui_datePicker(this,{bound:[120,11,100,18]});		
		this.ed_debet = new portalui_saiLabelEdit(this,{bound:[700,11,220,20],caption:"Total Debet",tipeText:ttNilai, alignment:alRight,readOnly:true,text:"0"});
		this.ed_nb = new portalui_saiLabelEdit(this,{bound:[20,12,202,20],caption:"No Bukti", readOnly:true});					
		this.i_gen = new portalui_imageButton(this,{bound:[225,12,20,20],hint:"Generate",image:"icon/"+system.getThemes()+"/tabCont2.png",click:[this,"doClick"]});
		this.ed_kredit = new portalui_saiLabelEdit(this,{bound:[700,12,220,20],caption:"Total Kredit",tipeText:ttNilai, alignment:alRight,readOnly:true,text:"0"});
		this.ed_desc = new portalui_saiLabelEdit(this,{bound:[20,13,500,20],caption:"Deskripsi",maxLength:150});		
		this.ed_jp = new portalui_saiLabelEdit(this,{bound:[700,13,220,20],caption:"Total JP",tipeText:ttNilai, alignment:alRight, text:"0",readOnly:true});				
		this.bGar = new portalui_button(this,{bound:[580,13,100,20],caption:"Tampil",hint:"Load",image:"icon/"+system.getThemes()+"/tabCont2.png",click:[this,"doUploadTB"]});
		
		this.p1 = new portalui_panel(this,{bound:[20,189,900,344],caption:"Data Saldo Akun"});
		this.sg1 = new saiGrid(this.p1,{bound:[0,20,this.p1.width-5,this.p1.height-40],colCount:6,tag:0,
		            colTitle:["Kode Akun","Nama Akun","Saldo Awal","Debet","Kredit","Saldo Akhir"],
					colWidth:[[5,4,3,2,1,0],[120,120,120,120,270,100]], colFormat:[[5,4,3,2],[cfNilai,cfNilai,cfNilai,cfNilai]],
					readOnly:true,autoAppend:false,defaultRow:1});
		this.sgn1 = new portalui_sgNavigator(this.p1,{bound:[1,this.p1.height-25,this.p1.width-1,25],buttonStyle:3,grid:this.sg1,pager:[this,"doPager"]});				
		
		this.rearrangeChild(10,23);
		
		this.setTabChildIndex();
		this.dbLib = new util_dbLib();
		this.dbLib.addListener(this);
		this.standarLib = new util_standar();
		this.ed_period.setText(this.app._periode);	
		
		var sql = new server_util_arrayList();
		sql.add("select m.kode_akun, m.nama from masakun m "+
				" inner join flag_relasi b on b.kode_akun = m.kode_akun and m.kode_lokasi = b.kode_lokasi "+
				" where b.kode_flag = '999' and m.kode_lokasi = '"+this.app._lokasi+"' ");
		sql.add("select cast(value1 as varchar) as value1 from spro where kode_lokasi = '"+this.app._lokasi+"' and kode_spro = 'MAXPRD'");
		this.dbLib.getMultiDataProviderA(sql);				
		setTipeButton(tbSimpan);
	}
};
window.app_saku3_transaksi_gl_fJPdkm.extend(window.portalui_childForm);
window.app_saku3_transaksi_gl_fJPdkm.implement({
	doUploadTB: function(){		
		try{			
			if (this.app._periode != this.app._periode.substr(0,4)+this.maxPeriode){
				system.alert(this,"Periode sekarang ["+this.app._periode+"] masih belum akhir periode ["+(this.app._periode.substr(0,4) +this.maxPeriode)+"].","Load data tidak dapat dilanjutkan.");
				return;
			}
			this.nik_user=this.app._nikUser;
			var sql = "call sp_glma_dw_tmp ('"+this.app._lokasi+"','"+this.ed_period.getText()+"','"+this.nik_user+"')";
			this.dbLib.execQuerySync(sql);			
			sql = "select a.kode_akun,b.nama,a.so_awal,a.debet,a.kredit,round(a.so_akhir,0) as so_akhir "+
				  "from glma_tmp a inner join masakun b on b.kode_akun = a.kode_akun and b.kode_lokasi = a.kode_lokasi and b.modul = 'L' where a.kode_lokasi ='"+this.app._lokasi+"' and a.nik_user = '"+this.nik_user+"' and round(a.so_akhir,0) <> 0 order by a.kode_akun";
			var data = this.dbLib.getDataProvider(sql,true);
			if (typeof data == "object" && data.rs.rows[0] != undefined){
				this.dataJU = data;
				this.sgn1.setTotalPage(Math.ceil(data.rs.rows.length/20));
				this.sgn1.rearrange();
				this.doTampilData(1);
			} else this.sg1.clear(1);
			
			var line; var totD = totC = 0;
			for (var i=0;i < this.dataJU.rs.rows.length;i++){
				line = this.dataJU.rs.rows[i];
				if (line.so_akhir > 0) totD += parseFloat(line.so_akhir);
				if (line.so_akhir < 0) totC += parseFloat(line.so_akhir);
			}
			this.ed_debet.setText(floatToNilai(totD));
			this.ed_kredit.setText(floatToNilai(Math.abs(totC)));
			this.ed_jp.setText(floatToNilai(totD+totC));
		}catch(e){
			system.alert(this,"Tidak ada data TB yang ditampilkan",data);
			this.sg1.hideLoading();
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
	doModalResult: function(event, modalResult){
		if (modalResult != mrOk) return false;
		switch (event){
			case "clear" :
				if (modalResult == mrOk){					
					this.standarLib.clearByTag(this, new Array("0","1"),undefined);					
					this.sg1.clear(1);
					this.ed_period.setText(this.app._periode);
					setTipeButton(tbSimpan);
				}
				break;
			case "simpan" :
					if (this.app._periode != this.app._periode.substr(0,4) +this.maxPeriode){
						system.alert(this,"Periode sekarang ["+this.app._periode+"] masih belum akhir periode ["+(this.app._periode.substr(0,4) +this.maxPeriode)+"].","Process JP tidak bisa dilakukan.");
						return;
					}
					this.ed_nb.setText(this.standarLib.noBuktiOtomatis(this.dbLib,"jp","no_bukti",this.app._lokasi+"-JP"+this.ed_period.getText().substr(2,4)+'.',"000"));
					try{						
						if (this.standarLib.checkEmptyByTag(this, new Array("0","1","2"))){
							uses("server_util_arrayList");
							var sql = new server_util_arrayList();
							sql.add("insert into jp(no_bukti, tanggal, periode, keterangan, nik_pembuat, kode_lokasi, nilai, tgl_input, nik_user )values"+
									"('"+this.ed_nb.getText()+"','"+this.dp_tgl1.getDateString()+"','"+this.ed_period.getText()+"','Jurnal JP periode "+this.ed_period.getText()+"', "+
									"'"+this.app._userLog+"','"+this.app._lokasi+"',"+parseNilai(this.ed_jp.getText())+",now(), '"+this.app._userLog+"')");
							
							var line; var nilai = 0; var dc = "";
							var tgl = this.ed_period.getText().substr(0,4)+'-12-31';
							for (var i=0;i < this.dataJU.rs.rows.length;i++){
								line = this.dataJU.rs.rows[i];								
								if (parseFloat(line.so_akhir) > 0) dc = "C"; else dc = "D";
								nilai = Math.abs(parseFloat(line.so_akhir));
								sql.add("insert into jp_d (no_bukti,kode_lokasi,kode_akun,dc,nilai) values ('"+this.ed_nb.getText()+"','"+this.app._lokasi+"','"+line.kode_akun+"','"+dc+"',"+nilai+")");
								sql.add("insert into gldt (no_bukti,no_urut,kode_lokasi,no_dokumen,tanggal,kode_akun,dc,nilai,keterangan,kode_pp,kode_drk,kode_cust,kode_proyek,kode_task,kode_vendor,kode_lokarea,nik,modul,jenis,periode,kode_curr,kurs,nilai_curr,tgl_input,nik_user) values "+
										"('"+this.ed_nb.getText()+"',"+i+",'"+this.app._lokasi+"','-','"+tgl+"','"+line.kode_akun+"','"+dc+"',"+nilai+",'Jurnal Penutup Periode "+this.ed_period.getText()+"','-','-','-','-','-','-','-','-','JP','AKUN','"+this.ed_period.getText()+"','IDR',1,"+nilai+",getdate(),'"+this.app._userLog+"')");
							}
							if (nilaiToFloat(this.ed_jp.getText()) > 0) dc = "D"; else dc = "C";							
							nilai = Math.abs(nilaiToFloat(this.ed_jp.getText()));
							
							sql.add("insert into gldt (no_bukti,no_urut,kode_lokasi,no_dokumen,tanggal,kode_akun,dc,nilai,keterangan,kode_pp,kode_drk,kode_cust,kode_proyek,kode_task,kode_vendor,kode_lokarea,nik,modul,jenis,periode,kode_curr,kurs,nilai_curr,tgl_input,nik_user) values "+
									"('"+this.ed_nb.getText()+"',99999,'"+this.app._lokasi+"','-','"+tgl+"','"+this.akunJP+"','"+dc+"',"+nilai+",'Jurnal Penutup Periode "+this.ed_period.getText()+"','-','-','-','-','-','-','-','-','JP','JP','"+this.ed_period.getText()+"','IDR',1,"+nilai+",getdate(),'"+this.app._userLog+"')");
							
							
							setTipeButton(tbAllFalse);	
							this.dbLib.execArraySQL(sql);
						}
					}catch(e){
						systemAPI.alert(e);
					}
				break;
		}
	},
	doClick: function(sender){
		this.ed_nb.setText(this.standarLib.noBuktiOtomatis(this.dbLib,"jp","no_bukti",this.app._lokasi+"-JP"+this.ed_period.getText().substr(2,4)+'.',"000"));
		this.ed_desc.setFocus();
	},
	doTampilData: function(page) {
		this.sg1.clear(); 
		var line;
		this.page = page;
		var start = (page - 1) * 20;
		var finish = (start + 20 > this.dataJU.rs.rows.length? this.dataJU.rs.rows.length:start+20);
		for (var i=start;i<finish;i++){
			line = this.dataJU.rs.rows[i];							
			this.sg1.appendData([line.kode_akun,line.nama,floatToNilai(line.so_awal),floatToNilai(line.debet),floatToNilai(line.kredit),floatToNilai(line.so_akhir)]);
		}
		this.sg1.setNoUrut(start);
	},	
	doPager: function(sender, page) {
		this.doTampilData(page);
	},
	doRequestReady: function(sender, methodName,result){
		try{
			if (sender == this.dbLib){
				if (methodName == "getMultiDataProvider"){
					try{
						eval("result = "+result);
						result = result.result;
						if (result[0].rs.rows[0] !== undefined){
							this.akunJP = result[0].rs.rows[0].kode_akun;
						}else {
							system.alert(this,"Akun JP masih belum ada","Untuk menandai akun JP di form Relasi Flag Akun");
							return;
						}
						if (result[1].rs.rows[0] !== undefined) this.maxPeriode = result[1].rs.rows[0].value1;												
						if (this.app._periode != this.app._periode.substr(0,4) +this.maxPeriode){
							system.alert(this,"Periode sekarang ["+this.app._periode+"] masih belum akhir periode ["+(this.app._periode.substr(0,4) +this.maxPeriode)+"].","Process JP tidak bisa dilakukan.");
							return;
						}
					}catch(e){
						system.alert(this,"Error getdata",result);
					}					
				}
				if (methodName == "execArraySQL"){
					if (result.toLowerCase().search("error") == -1){
						system.info(this,"Transaksi telah sukses tersimpan (No Bukti : "+ this.ed_nb.getText()+")","");							
						this.app._mainForm.bClear.click();
					}else system.info(this,result,"");
				}
			}
		}catch(e){
			alert(e);
		}
	}
});
