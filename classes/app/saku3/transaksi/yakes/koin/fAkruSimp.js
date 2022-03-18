window.app_saku3_transaksi_yakes_koin_fAkruSimp = function(owner)
{
	if (owner)
	{
		window.app_saku3_transaksi_yakes_koin_fAkruSimp.prototype.parent.constructor.call(this,owner);
		this.className  = "app_saku3_transaksi_yakes_koin_fAkruSimp";
		this.itemsValue = new portalui_arrayList();
		this.app._mainForm.childFormConfig(this, "mainButtonClick","Form Akru Simpanan", 0);	
		
		uses("saiCBBL;saiEdit;datePicker;saiGrid;sgNavigator;pageControl;checkBox");
		this.e_periode = new portalui_saiLabelEdit(this,{bound:[20,11,200,20],caption:"Periode",readOnly:true,tag:2,visible:false});
		this.l_tgl = new portalui_label(this,{bound:[20,11,100,18],caption:"Tanggal", underline:true});
		this.dp_d1 = new portalui_datePicker(this,{bound:[120,11,100,18],selectDate:[this,"doSelectDate"]});
		
		this.pc3 = new pageControl(this,{bound:[20,12,1000,430], childPage:["Data Akru","Daftar Akru"]});
		this.sg3 = new saiGrid(this.pc3.childPage[1],{bound:[1,5,this.pc3.width-5,this.pc3.height-35],colCount:4,tag:9,
		            colTitle:["No Bukti","Tanggal","Keterangan","Nilai"],
					colWidth:[[3,2,1,0],[100,300,100,100]],
					readOnly:true,colFormat:[[3],[cfNilai]],
					dblClick:[this,"doDoubleClick3"],autoAppend:false,defaultRow:1});		
		this.sgn3 = new portalui_sgNavigator(this.pc3.childPage[1],{bound:[1,this.pc3.height-25,this.pc3.width-1,25],buttonStyle:3,grid:this.sg3,pager:[this,"doPager3"]});
		this.bLoad3 = new portalui_imageButton(this.sgn3,{bound:[this.sgn3.width - 25,2,22,22],image:"icon/"+system.getThemes()+"/reload.png", hint:"Load Data",click:[this,"doLoad3"]});		
				
		this.e_nb = new portalui_saiLabelEdit(this.pc3.childPage[0],{bound:[20,13,202,20],caption:"No Bukti",maxLength:30,readOnly:true});		
		this.i_gen = new portalui_imageButton(this.pc3.childPage[0],{bound:[225,13,20,20],hint:"Generate",image:"icon/"+system.getThemes()+"/tabCont2.png",click:[this,"doClick"]});						
		this.e_desc = new portalui_saiLabelEdit(this.pc3.childPage[0],{bound:[20,15,450,20],caption:"Keterangan", maxLength:150});														
		this.e_total = new portalui_saiLabelEdit(this.pc3.childPage[0],{bound:[790,15,200,20],caption:"Total",tipeText:ttNilai,text:"0",readOnly: true});
		this.bTampil = new portalui_button(this.pc3.childPage[0],{bound:[509,15,80,18],caption:"Tampil",click:[this,"doTampilClick"]});		
			
		this.pc1 = new pageControl(this.pc3.childPage[0],{bound:[1,12,995,350], childPage:["Daftar Jurnal","Daftar Kartu"]});
		this.sg2 = new portalui_saiGrid(this.pc1.childPage[0],{bound:[1,5,this.pc1.width-5,this.pc1.height-10],colCount:8,			    
				colWidth:[[7,6,5,4,3,2,1,0],[100,200,80,200,80,150,80,50]],
				colTitle:["Jenis","Kode Simp","Nama Simp.","Akun Piut.","Nama Akun","Akun Simp.","Nama Akun","Total Akru"],
                colFormat:[[7],[cfNilai]],dblClick:[this,"doDblClick"],nilaiChange:[this,"doSgChange"],
				readOnly:true, defaultRow:1}); 	
							
		this.sg1 = new saiGrid(this.pc1.childPage[1],{bound:[1,5,this.pc1.width-5,this.pc1.height-35],colCount:9,tag:9,		            
				colTitle:["No Kartu","Awal Tagih","No Agg","Anggota","Jenis","Nama Simp.","Akun Piut.","Akun Simp","Nilai"],
				colWidth:[[8,7,6,5,4,3,2,1,0],[80,80,80,200,50,150,80,80,100]],
				colFormat:[[8],[cfNilai]],readOnly: true,autoAppend:false,defaultRow:1});
		this.sgn1 = new portalui_sgNavigator(this.pc1.childPage[1],{bound:[1,this.pc1.height-25,this.pc1.width-1,25],buttonStyle:3,grid:this.sg1,pager:[this,"doPager"]});	
		
		this.rearrangeChild(10, 23);
		this.pc3.childPage[0].rearrangeChild(10, 23);		
		
		setTipeButton(tbAllFalse);
		this.maximize();		
		this.setTabChildIndex();
		
		uses("server_report_report;portalui_reportViewer");
		this.viewer = new portalui_reportViewer(this, {bound:[0,0,this.getWidth(), this.getHeight()],visible:false});
		this.viewer.hide();
		this.app._mainForm.initReport(this, this.viewer,"doSelectedPage","doCloseReportClick", "doRowPerPageChange", "doPdfClick","doXlsClick",true);
		this.report = new server_report_report();
		this.report.addListener(this);
		
		try{			
			this.dbLib = new util_dbLib();
			this.dbLib.addListener(this);
			uses("util_standar");
			this.standarLib = new util_standar();
			this.stsSimpan = 1;
			this.doSelectDate(this.dp_d1,this.dp_d1.year,this.dp_d1.month,this.dp_d1.day);
						
			this.akunBunga = "-";
			this.namaBunga = "-";
			
			var data = this.dbLib.getDataProvider("select a.kode_spro,a.flag,b.nama from spro a inner join masakun b on a.flag=b.kode_akun and a.kode_lokasi=b.kode_lokasi "+
			                                      "where a.kode_spro in ('BSIMP') and a.kode_lokasi = '"+this.app._lokasi+"'",true);			
			if (typeof data == "object"){
				var line;
				for (var i in data.rs.rows){
					line = data.rs.rows[i];			
					if (line.kode_spro == "BSIMP") this.akunBunga = line.flag;
					if (line.kode_spro == "BSIMP") this.namaBunga = line.nama;					
				}
			}
				
		}catch(e){
			systemAPI.alert(e);
		}
	}
};
window.app_saku3_transaksi_yakes_koin_fAkruSimp.extend(window.portalui_childForm);
window.app_saku3_transaksi_yakes_koin_fAkruSimp.implement({
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
			if (this.stsSimpan == 1) this.doClick();
			if (this.standarLib.checkEmptyByTag(this, [0,2])){
				try{													
					uses("server_util_arrayList");
					var sql = new server_util_arrayList();
					if (this.stsSimpan == 0) {						
						sql.add("delete from trans_m where no_bukti = '"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
						sql.add("delete from trans_j where no_bukti = '"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
						
						sql.add("update a set a.periode_gen = b.periode, a.periode_bunga = b.periode "+
								"from kop_simp_m a inner join kop_simp_d b on a.no_simp=b.no_simp and a.kode_lokasi=b.kode_lokasi where b.no_bill='"+this.e_nb.getText()+"' and b.kode_lokasi = '"+this.app._lokasi+"'");												
						
						sql.add("delete from kop_simp_d where no_bill = '"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");					
						sql.add("delete from kop_simpangs_d where no_angs = '"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
					}
								
					sql.add("insert into trans_m (no_bukti,kode_lokasi,tgl_input,nik_user,periode,modul,form,posted,prog_seb,progress,kode_pp,tanggal,no_dokumen,keterangan,kode_curr,kurs,nilai1,nilai2,nilai3,nik1,nik2,nik3,no_ref1,no_ref2,no_ref3,param1,param2,param3) values "+
							"('"+this.e_nb.getText()+"','"+this.app._lokasi+"',getdate(),'"+this.app._userLog+"','"+this.e_periode.getText()+"','KP','GENBILL','F','0','0','"+this.app._kodePP+"','"+this.dp_d1.getDateString()+"','-','"+this.e_desc.getText()+
							"','IDR',1,"+parseNilai(this.e_total.getText())+",0,0,'-','-','-','-','-','-','-','-','-')");
										
					var j = 0;
					this.sg2.getRowCount()
					for (var i=0; i<this.sg2.getRowCount(); i++){
						if (this.sg2.rowValid(i)){
							j = i+1000;			
							sql.add("insert into trans_j (no_bukti,kode_lokasi,tgl_input,nik_user,periode,no_dokumen,tanggal,nu,kode_akun,dc,nilai,nilai_curr,keterangan,modul,jenis,kode_curr,kurs,kode_pp,kode_drk,kode_cust,kode_vendor,no_fa,no_selesai,no_ref1,no_ref2,no_ref3) values "+
									"('"+this.e_nb.getText()+"','"+this.app._lokasi+"',getdate(),'"+this.app._userLog+"','"+this.e_periode.getText()+"','-','"+this.dp_d1.getDateString()+"',"+i+",'"+this.sg2.cells(3,i)+"','D',"+nilaiToFloat(this.sg2.cells(7,i))+","+nilaiToFloat(this.sg2.cells(7,i))+",'"+this.e_desc.getText()+"','GENBILL','PIUTANG','IDR',1,'"+this.app._kodePP+"','-','-','-','-','-','-','-','-')");
							sql.add("insert into trans_j (no_bukti,kode_lokasi,tgl_input,nik_user,periode,no_dokumen,tanggal,nu,kode_akun,dc,nilai,nilai_curr,keterangan,modul,jenis,kode_curr,kurs,kode_pp,kode_drk,kode_cust,kode_vendor,no_fa,no_selesai,no_ref1,no_ref2,no_ref3) values "+
									"('"+this.e_nb.getText()+"','"+this.app._lokasi+"',getdate(),'"+this.app._userLog+"','"+this.e_periode.getText()+"','-','"+this.dp_d1.getDateString()+"',"+j+",'"+this.sg2.cells(5,i)+"','C',"+nilaiToFloat(this.sg2.cells(7,i))+","+nilaiToFloat(this.sg2.cells(7,i))+",'"+this.e_desc.getText()+"','GENBILL','SIMP','IDR',1,'"+this.app._kodePP+"','-','-','-','-','-','-','-','-')");							
						}
					}					
										
					//hitung dan generate bunga simp sukarela (sebagai setoran angsuran)
					sql.add("insert into kop_simpangs_d (no_angs,no_simp,no_bill,akun_piutang,nilai,kode_lokasi,dc,periode,modul,no_agg,jenis) "+
							"select "+
							"'"+this.e_nb.getText()+"',a.no_simp,'"+this.e_nb.getText()+"','"+this.akunBunga+"', "+
							"round(sum( case a.dc when 'D' then a.nilai else -a.nilai end * b.p_bunga/100/12),0) as bunga,a.kode_lokasi,'D','"+this.e_periode.getText()+"','BSIMP',b.no_agg,'BSIMP' "+
							"from "+
							"kop_simpangs_d a "+
							"inner join kop_simp_m b on a.no_simp=b.no_simp and a.kode_lokasi=b.kode_lokasi "+
							"inner join kop_simp_param c on c.kode_param=b.kode_param and b.kode_lokasi=c.kode_lokasi "+
							"inner join masakun d on c.akun_titip=d.kode_akun and c.kode_lokasi=d.kode_lokasi "+
							"inner join kop_agg y on b.no_agg=y.no_agg and b.kode_lokasi = y.kode_lokasi "+
							"where b.jenis = 'SS' and b.p_bunga <>0 and a.periode<='"+this.e_periode.getText()+"' and a.kode_lokasi='"+this.app._lokasi+"' "+
							"	  and b.periode_bunga <= '"+this.e_periode.getText()+"' "+
							"	  and b.flag_aktif='1' and y.flag_aktif='1' "+
							"group by a.no_simp,a.kode_lokasi,b.no_agg ");
					
					//generate billing untuk bunga simp sukarela (sebagai billingnya)
					sql.add("insert into kop_simp_d (no_simp,no_bill,kode_lokasi,periode,nilai,akun_piutang,akun_titip,dc,modul,no_agg) "+
							"select "+
							"a.no_simp,'"+this.e_nb.getText()+"',a.kode_lokasi,'"+this.e_periode.getText()+"', "+
							"round(sum( case a.dc when 'D' then a.nilai else -a.nilai end * b.p_bunga/100/12),0) as bunga, "+
							"'"+this.akunBunga+"',c.akun_titip,'D','BSIMP',b.no_agg "+
							"from "+
							"kop_simpangs_d a "+
							"inner join kop_simp_m b on a.no_simp=b.no_simp and a.kode_lokasi=b.kode_lokasi "+
							"inner join kop_simp_param c on c.kode_param=b.kode_param and b.kode_lokasi=c.kode_lokasi "+
							"inner join masakun d on c.akun_titip=d.kode_akun and c.kode_lokasi=d.kode_lokasi "+
							"inner join kop_agg y on b.no_agg=y.no_agg and b.kode_lokasi = y.kode_lokasi "+
							"where b.jenis = 'SS' and b.p_bunga <>0 and a.periode<='"+this.e_periode.getText()+"' and a.kode_lokasi='"+this.app._lokasi+"' "+
							"	  and b.periode_bunga <= '"+this.e_periode.getText()+"' "+
							"	  and b.flag_aktif='1' and y.flag_aktif='1' "+
							"group by a.no_simp,a.kode_lokasi,c.akun_titip,b.no_agg ");
					
					//generate billing untuk seluruh jenis simpanan (kecuali ss yg tunai angsurannya / bukan potong gaji)
					sql.add("insert into kop_simp_d (no_simp,no_bill,kode_lokasi,periode,nilai,akun_piutang,akun_titip,dc,modul,no_agg) "+
							"select x.no_simp,'"+this.e_nb.getText()+"',x.kode_lokasi,'"+this.e_periode.getText()+"',x.nilai,a.akun_piutang,a.akun_titip,'D','GENBILL',x.no_agg "+
							"from kop_simp_m x "+
							"     inner join kop_agg y on x.no_agg=y.no_agg and x.kode_lokasi=y.kode_lokasi "+
						    "     inner join kop_simp_param a on x.kode_param=a.kode_param and x.kode_lokasi = a.kode_lokasi "+
						    " where a.kode_lokasi = '"+this.app._lokasi+"' and x.flag_aktif='1' and y.flag_aktif='1' and "+
						    "      ((x.jenis in ('SP','SW')) or (x.jenis='SS' and x.status_bayar='PGAJI')) and x.nilai>0  and "+
						    "      x.periode_gen<='"+this.e_periode.getText()+"'");
					
					var pNext = getNextPeriode(this.e_periode.getText());		
					sql.add("update a set a.periode_gen ='"+pNext+"',a.periode_bunga ='"+pNext+"' from kop_simp_m a inner join kop_simp_d b on a.no_simp=b.no_simp and a.kode_lokasi=b.kode_lokasi where b.no_bill='"+this.e_nb.getText()+"' and b.kode_lokasi = '"+this.app._lokasi+"' and a.jenis<>'SP' ");
					sql.add("update a set a.periode_gen ='999999' from kop_simp_m a inner join kop_simp_d b on a.no_simp=b.no_simp and a.kode_lokasi=b.kode_lokasi where b.no_bill='"+this.e_nb.getText()+"' and b.kode_lokasi = '"+this.app._lokasi+"' and a.jenis='SP' ");
					 
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
				if (modalResult == mrOk) {
					this.standarLib.clearByTag(this, new Array("0"),this.e_nb);		
					this.sg2.clear(1); this.sg1.clear(1); this.sg3.clear(1);
					this.bTampil.setVisible(true);
				}
				break;
			case "simpan" :	
			case "ubah" :	
				this.preView = "1";
			    if (nilaiToFloat(this.e_total.getText()) <= 0){
					system.alert(this,"Transaksi tidak valid.","Total akru simpanan tidak boleh kurang dari atau sama dengan nol.");
					return false;
				}
				if (this.standarLib.doCekPeriode(this.dbLib,"KP",this.app._lokasi,this.app._userStatus,this.e_periode.getText()) == "0") {
					system.alert(this,"Periode transaksi modul tidak valid (KP - LOCKED).","Hubungi Administrator Sistem.");
					return false;
				}
				else this.simpan();
				break;
			case "simpancek" : this.simpan();			
				break;
			case "hapus" :	
				this.preView = "0";
				if (this.standarLib.doCekPeriode(this.dbLib,"KP",this.app._lokasi,this.app._userStatus,this.e_periode.getText()) == "0") {
					system.alert(this,"Periode transaksi modul tidak valid (KP - LOCKED).","Hubungi Administrator Sistem.");
					return false;
				}	
				else {	
					uses("server_util_arrayList");
					var sql = new server_util_arrayList();
					sql.add("delete from trans_m where no_bukti = '"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
					sql.add("delete from trans_j where no_bukti = '"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
					
					sql.add("update a set a.periode_gen = b.periode, a.periode_bunga = b.periode "+
							"from kop_simp_m a inner join kop_simp_d b on a.no_simp=b.no_simp and a.kode_lokasi=b.kode_lokasi where b.no_bill='"+this.e_nb.getText()+"' and b.kode_lokasi = '"+this.app._lokasi+"'");												
					
					sql.add("delete from kop_simp_d where no_bill = '"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
					sql.add("delete from kop_simpangs_d where no_angs = '"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
					setTipeButton(tbAllFalse);	
					this.dbLib.execArraySQL(sql);
				}
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
		if (this.stsSimpan == 1) this.doClick();				
	},
	doClick:function(sender){
		if (this.stsSimpan == 0) {					
			this.sg1.clear(1); this.sg2.clear(1); this.sg3.clear(1); 
			this.bTampil.setVisible(true);
		}
		this.stsSimpan = 1;
		this.e_nb.setText(this.standarLib.noBuktiOtomatis(this.dbLib,"trans_m","no_bukti",this.app._lokasi+"-BSM"+this.e_periode.getText().substr(2,4)+".","0000"));
		this.e_desc.setFocus();
		setTipeButton(tbSimpan);			
	},
	doTampilClick: function(sender){
		try{			
			if (this.e_periode.getText() != "") {
				this.sg1.clear(1);
				var strSQL = "select x.jenis,a.kode_param,a.nama as nama_simp,a.akun_piutang,b.nama as nama_ar,a.akun_titip,c.nama as nama_asimp,sum(x.nilai) as total "+
						   " from kop_simp_m x "+
						   "      inner join kop_agg y on x.no_agg=y.no_agg and x.kode_lokasi = y.kode_lokasi "+
						   "      inner join kop_simp_param a on x.kode_param=a.kode_param and x.kode_lokasi = a.kode_lokasi "+
						   "      inner join masakun b on a.akun_piutang = b.kode_akun and a.kode_lokasi=b.kode_lokasi "+    
						   "      inner join masakun c on a.akun_titip = c.kode_akun and a.kode_lokasi=c.kode_lokasi "+						   
						   " where x.kode_lokasi = '"+this.app._lokasi+"' and x.flag_aktif='1' and y.flag_aktif='1' and "+
						   "      ((x.jenis in ('SP','SW')) or (x.jenis='SS' and x.status_bayar='PGAJI')) and "+
						   "      x.periode_gen<='"+this.e_periode.getText()+"' and x.nilai>0 "+
						   "group by x.jenis,a.kode_param,a.nama,a.akun_piutang,b.nama,a.akun_titip,c.nama "+
						   
						   "union all "+
						   
						   
						   "select 'BS' as jenis,c.kode_param,c.nama,'"+this.akunBunga+"','"+this.namaBunga+"',c.akun_titip,d.nama as nama_titip, "+
						   "	round(sum( case a.dc when 'D' then a.nilai else -a.nilai end * b.p_bunga/100/12),0) as bunga "+
						   "	from "+
						   "	kop_simpangs_d a "+
						   "	inner join kop_simp_m b on a.no_simp=b.no_simp and a.kode_lokasi=b.kode_lokasi "+
						   "	inner join kop_simp_param c on c.kode_param=b.kode_param and b.kode_lokasi=c.kode_lokasi "+
						   "	inner join masakun d on c.akun_titip=d.kode_akun and c.kode_lokasi=d.kode_lokasi "+
						   "    inner join kop_agg y on b.no_agg=y.no_agg and b.kode_lokasi = y.kode_lokasi "+
						   "	where b.jenis = 'SS' and b.p_bunga <>0 and a.periode<='"+this.e_periode.getText()+"' and a.kode_lokasi='"+this.app._lokasi+"' "+
						   "		  and b.periode_bunga <= '"+this.e_periode.getText()+"' "+
						   "		  and b.flag_aktif='1' and y.flag_aktif='1' "+
						   "	group by  b.jenis,c.kode_param,c.nama,c.akun_titip,d.nama "+
						   
						   "order by x.jenis,a.kode_param";		
						   		
				var data = this.dbLib.getDataProvider(strSQL,true);
				if (typeof data == "object" && data.rs.rows[0] != undefined){
					var line;
					this.sg2.clear();
					for (var i in data.rs.rows){
						line = data.rs.rows[i];							
						this.sg2.appendData([line.jenis.toUpperCase(),line.kode_param,line.nama_simp,line.akun_piutang,line.nama_ar,line.akun_titip,line.nama_asimp,floatToNilai(line.total)]);
					}
				} else this.sg2.clear(1);							
			} 
			else {
				system.alert(this,"Periode harus valid.","Filter dari tanggal transaksi.");
				this.sg1.clear(1);
				this.sg2.clear(1);
			}
		}catch(e){
			systemAPI.alert(e);
		}
	},	
	doDblClick: function(sender, col, row){
		if (this.sg2.cells(0,row) != "") {			
			if (this.stsSimpan == 1) {
				var strSQL = "select x.no_simp,convert(varchar,x.tgl_tagih,103) as tgl_tagih,y.no_agg,y.nama as nama_agg,x.jenis,a.kode_param+' - '+a.nama as nama_simp,a.akun_piutang as akun_ar,a.akun_titip as akun_simp,x.nilai "+
							 " from kop_simp_m x "+
							 "      inner join kop_agg y on x.no_agg=y.no_agg and x.kode_lokasi=y.kode_lokasi "+
							 "      inner join kop_simp_param a on x.kode_param=a.kode_param and x.kode_lokasi=a.kode_lokasi "+
							 " where x.jenis='"+this.sg2.cells(0,row)+"' and a.kode_param='"+this.sg2.cells(1,row)+"' and a.kode_lokasi = '"+this.app._lokasi+"' and x.flag_aktif='1' and y.flag_aktif='1' and "+
							 "      ((x.jenis in ('SP','SW')) or (x.jenis='SS' and x.status_bayar='PGAJI')) and "+
							 "      x.periode_gen<='"+this.e_periode.getText()+"' order by x.jenis,x.no_simp";
			}
			else {
				var strSQL = "select x.no_simp,convert(varchar,x.tgl_tagih,103) as tgl_tagih,y.no_agg,y.nama as nama_agg,x.jenis,a.kode_param+' - '+a.nama as nama_simp,a.akun_piutang as akun_ar,a.akun_titip as akun_simp,x.nilai "+
							 " from kop_simp_m x "+
							 "      inner join kop_agg y on x.no_agg=y.no_agg and x.kode_lokasi=y.kode_lokasi "+
							 "      inner join kop_simp_param a on x.kode_param=a.kode_param and x.kode_lokasi=a.kode_lokasi "+
							 "      inner join kop_simp_d b on x.no_simp=b.no_simp and x.kode_lokasi=b.kode_lokasi "+
							 " where x.jenis='"+this.sg2.cells(0,row)+"' and a.kode_param='"+this.sg2.cells(1,row)+"' and a.kode_lokasi = '"+this.app._lokasi+"' and x.flag_aktif='1' and y.flag_aktif='1' "+
							 " 		 and b.no_bill='"+this.e_nb.getText()+"' order by x.jenis,x.no_simp";
			}
			var data = this.dbLib.getDataProvider(strSQL,true);
			if (typeof data == "object" && data.rs.rows[0] != undefined){
				this.dataJU = data;
				this.sgn1.setTotalPage(Math.ceil(data.rs.rows.length/20));
				this.sgn1.rearrange();
				this.doTampilData(1);
			} else this.sg1.clear(1);
			this.pc1.setActivePage(this.pc1.childPage[1]);
		}
	},
	doPager: function(sender, page) {
		this.doTampilData(page);
	},
	doTampilData: function(page) {
		this.sg1.clear();
		var line;
		this.page = page;
		var start = (page - 1) * 20;
		var finish = (start + 20 > this.dataJU.rs.rows.length? this.dataJU.rs.rows.length:start+20);
		for (var i=start;i<finish;i++){
			line = this.dataJU.rs.rows[i];
			this.sg1.appendData([line.no_simp,line.tgl_tagih,line.no_agg,line.nama_agg,line.jenis,line.nama_simp,line.akun_ar,line.akun_simp,floatToNilai(line.nilai)]);
		}
		this.sg1.setNoUrut(start);		
	},
	doSgChange: function(sender, col, row){
		var tot1 = 0;			
		for (var i = 0;i < this.sg2.getRowCount();i++){
			if (this.sg2.cells(7,i) != "") {
				tot1 += nilaiToFloat(this.sg2.cells(7,i));				
			}
		}
		this.e_total.setText(floatToNilai(tot1));
	},	
	doRequestReady: function(sender, methodName, result){
		if (sender == this.dbLib){
			try{   
				switch(methodName){
	    			case "execArraySQL" :	    				
						if (result.toLowerCase().search("error") == -1){
							if (this.preView == "1") {								
								this.nama_report="server_report_saku3_kb_rptKbJurnalBukti";
								this.filter2 = " where a.kode_lokasi='"+this.app._lokasi+"' and a.no_bukti='"+this.e_nb.getText()+"' ";
								this.filter = this.filter2;
								this.viewer.prepare();
								this.viewer.setVisible(true);
								this.app._mainForm.pButton.setVisible(false);
								this.app._mainForm.reportNavigator.setVisible(true);
								this.viewer.setTotalPage(this.report.getTotalPage(this.nama_report,this.filter,1,this.filter2));
								this.app._mainForm.reportNavigator.setTotalPage(this.viewer.getTotalPage());
								this.app._mainForm.reportNavigator.rearrange();
								this.showFilter = undefined;
								this.viewer.useIframe(this.report.previewWithHeader(this.nama_report,this.filter, 1,  1, this.showFilter, this.app._namalokasi,this.filter2));
								this.page = 1;
								this.allBtn = false;
								this.pc3.hide();
							} 
							else {
								system.info(this,"Transaksi telah sukses tereksekusi (No Bukti : "+ this.e_nb.getText()+")","");							
								this.clearLayar();
							} 
						}
						else {													
							if (result.toLowerCase().search("primary key") == -1){
								alert(error);
							}
							else this.simpan();						   						
						}
	    			break;
					
	    		}    		
			}
			catch(e){
				systemAPI.alert("step : "+step+"; error = "+e);
			}
	    }
	},
	doCloseReportClick: function(sender){
		switch(sender.getName()){
			case "PreviewBtn" :        
				window.open(this.report.previewWithHeader(this.nama_report,this.filter,1,1, this.showFilter,this.app._namalokasi,this.filter2));
			break;
			case "PrintBtn" :
				this.viewer.useIframe(this.report.previewWithHeader(this.nama_report,this.filter,1,1, this.showFilter,this.app._namalokasi,this.filter2));
				try
				{
					window.frames[this.viewer.getFullId() +"_iframe"].focus();
					window.frames[this.viewer.getFullId() +"_iframe"].print();
				}catch(e)
				{alert(e);}
			break;
			default :
				this.pc3.show();   
				this.viewer.setVisible(false);
				this.app._mainForm.pButton.setVisible(true);
				this.app._mainForm.reportNavigator.setVisible(false);  
				this.clearLayar();				
			break;
		}
	},
	clearLayar : function(){
		try {
			this.standarLib.clearByTag(this, new Array("0","1"),this.e_nb);
			this.sg2.clear(1); this.sg1.clear(1); this.sg3.clear(1);
			this.pc3.setActivePage(this.pc3.childPage[0]);
			this.pc1.setActivePage(this.pc1.childPage[0]);			
			setTipeButton(tbAllFalse);		
			this.bTampil.setVisible(true);			
			this.stsSimpan = 1;
		} catch(e) {
			alert(e);
		}
	},
	doLoad3:function(sender){																				
		var strSQL = "select a.no_bukti,convert(varchar,a.tanggal,103) as tgl,a.keterangan,a.nilai1 "+
		             "from trans_m a "+
					 "where a.kode_lokasi='"+this.app._lokasi+"' and a.periode='"+this.e_periode.getText()+"' and a.posted='F' and a.form='GENBILL'";				
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
			this.sg3.appendData([line.no_bukti,line.tgl,line.keterangan,floatToNilai(line.nilai1)]); 
		}
		this.sg3.setNoUrut(start);
	},
	doPager3: function(sender, page) {
		this.doTampilData3(page);
	},
	doDoubleClick3: function(sender, col , row) {
		try{
			if (this.sg3.cells(0,row) != "") {
				this.pc3.setActivePage(this.pc3.childPage[0]);																		
				this.pc1.setActivePage(this.pc1.childPage[0]);																		
				setTipeButton(tbUbahHapus);
				this.stsSimpan = 0;				
				this.e_nb.setText(this.sg3.cells(0,row));								
				this.bTampil.setVisible(false);
											
				var strSQL = "select * from trans_m "+							 
							 "where no_bukti = '"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'";
				var data = this.dbLib.getDataProvider(strSQL,true);
				if (typeof data == "object"){
					var line = data.rs.rows[0];							
					if (line != undefined){	
						this.dp_d1.setText(line.tanggal);
						this.e_desc.setText(line.keterangan);																							
					}
				}												
											
				var strSQL = "select case when d.modul='BSIMP' then 'BS' else x.jenis end as jenis,a.kode_param,a.nama as nama_simp,d.akun_piutang,b.nama as nama_ar,d.akun_titip,c.nama as nama_asimp,sum(d.nilai) as total "+
						   " from kop_simp_m x "+
						   "      inner join kop_simp_d d on x.no_simp=d.no_simp and x.kode_lokasi=d.kode_lokasi "+
						   "      inner join kop_agg y on x.no_agg=y.no_agg and x.kode_lokasi = y.kode_lokasi "+
						   "      inner join kop_simp_param a on x.kode_param=a.kode_param and x.kode_lokasi = a.kode_lokasi "+
						   "      inner join masakun b on d.akun_piutang = b.kode_akun and a.kode_lokasi=b.kode_lokasi "+    
						   "      inner join masakun c on d.akun_titip = c.kode_akun and a.kode_lokasi=c.kode_lokasi "+						   
						   " where d.kode_lokasi = '"+this.app._lokasi+"' and d.no_bill='"+this.e_nb.getText()+"' "+
						   "group by case when d.modul='BSIMP' then 'BS' else x.jenis end,a.kode_param,a.nama,d.akun_piutang,b.nama,d.akun_titip,c.nama "+
						 	
						   "order by a.kode_param";				
				var data = this.dbLib.getDataProvider(strSQL,true);
				if (typeof data == "object" && data.rs.rows[0] != undefined){
					var line;
					this.sg2.clear();
					for (var i in data.rs.rows){
						line = data.rs.rows[i];							
						this.sg2.appendData([line.jenis.toUpperCase(),line.kode_param,line.nama_simp,line.akun_piutang,line.nama_ar,line.akun_titip,line.nama_asimp,floatToNilai(line.total)]);
					}
				} else this.sg2.clear(1);							
				
			}									
		} catch(e) {alert(e);}
	}
});