window.app_saku3_transaksi_bangtel_pbh_fKbSpb = function(owner)
{
	if (owner)
	{
		window.app_saku3_transaksi_bangtel_pbh_fKbSpb.prototype.parent.constructor.call(this,owner);
		this.className  = "app_saku3_transaksi_bangtel_pbh_fKbSpb";
		this.itemsValue = new arrayList();
		this.maximize();
		this.app._mainForm.childFormConfig(this, "mainButtonClick","From KasBank SPB", 0);	
		
		uses("portalui_uploader;saiCBBL;saiEdit;datePicker;saiGrid;sgNavigator;pageControl;checkBox");
		this.e_periode = new portalui_saiLabelEdit(this,{bound:[20,11,202,20],caption:"Periode",tag:2,readOnly:true,change:[this,"doChange"],visible:false});
		this.l_tgl1 = new portalui_label(this,{bound:[20,11,100,18],caption:"Tanggal", underline:true});
		this.dp_d1 = new portalui_datePicker(this,{bound:[120,11,100,18],selectDate:[this,"doSelectDate"]}); 		
		
		this.pc2 = new pageControl(this,{bound:[10,10,1000,440], childPage:["Data Jurnal","List Jurnal"]});		
		this.sg3 = new saiGrid(this.pc2.childPage[1],{bound:[1,5,this.pc2.width-5,this.pc2.height-33],colCount:6,tag:9,
		            colTitle:["No Bukti","Tanggal","Jenis","No Dokumen","Deskripsi","Nilai"],
					colWidth:[[5,4,3,2,1,0],[100,410,180,80,80,100]],colFormat:[[5],[cfNilai]],readOnly:true,
					dblClick:[this,"doDoubleClick3"],autoAppend:false,defaultRow:1});		
		this.sgn3 = new portalui_sgNavigator(this.pc2.childPage[1],{bound:[1,this.pc2.height-25,this.pc2.width-1,25],buttonStyle:3,grid:this.sg3,pager:[this,"doPager3"]});
		this.bLoad3 = new portalui_imageButton(this.sgn3,{bound:[this.sgn3.width - 25,2,22,22],image:"icon/"+system.getThemes()+"/reload.png", hint:"Load Data Jurnal",click:[this,"doLoad3"]});		
		
		this.cb_akun = new saiCBBL(this.pc2.childPage[0],{bound:[10,11,220,20],caption:"Akun KasBank", multiSelection:false, maxLength:10, tag:2, change:[this,"doChange"]});							
		this.c_jenis = new saiCB(this.pc2.childPage[0],{bound:[10,12,200,20],caption:"Jenis",items:["BK"], readOnly:true,tag:2,change:[this,"doChange"],visible:false});		
		this.e_nb = new portalui_saiLabelEdit(this.pc2.childPage[0],{bound:[10,12,200,20],caption:"No Bukti",maxLength:30,readOnly:true});
		this.i_gen = new portalui_imageButton(this.pc2.childPage[0],{bound:[215,12,20,20],hint:"Generate",image:"icon/"+system.getThemes()+"/tabCont2.png",click:[this,"doClick"]});		
		this.e_dok = new saiLabelEdit(this.pc2.childPage[0],{bound:[10,13,450,20],caption:"No Dokumen", maxLength:50});						
		this.e_ket = new saiLabelEdit(this.pc2.childPage[0],{bound:[10,17,450,20],caption:"Deskripsi", maxLength:150});				
		this.bLoad = new button(this.pc2.childPage[0],{bound:[490,17,80,18],caption:"Tampil Data",click:[this,"doLoad"]});			
		this.e_nilaikb = new saiLabelEdit(this.pc2.childPage[0],{bound:[770,17,220,20],caption:"Total KasBank", tag:1, readOnly:true, tipeText:ttNilai, text:"0"});					
		
		this.pc1 = new pageControl(this.pc2.childPage[0],{bound:[1,12,995,315], childPage:["Daftar SPB","Daftar Transfer","Jurnal Tambahan"]});		
		this.sg5 = new saiGrid(this.pc1.childPage[0],{bound:[1,5,this.pc1.width-5,this.pc1.height-30],colCount:8,tag:0,
		            colTitle:["Status","No SPB","No Bukti","Tanggal","Due Date","Deskripsi","Nilai","Modul"],
					colWidth:[[7,6,5,4,3,2,1,0],[60,100,300,70,70,120,120,80]],colFormat:[[6],[cfNilai]],										
					readOnly:true,buttonStyle:[[0],[bsAuto]],picklist:[[0],[new portalui_arrayMap({items:["BAYAR","INPROG"]})]],
					nilaiChange:[this,"doNilaiChange"],dblClick:[this,"doDoubleClick5"],change:[this,"doChangeCell5"],autoAppend:false,defaultRow:1});		
		this.sgn5 = new portalui_sgNavigator(this.pc1.childPage[0],{bound:[1,this.pc1.height-25,this.pc1.width-1,25],buttonStyle:3,grid:this.sg5,pager:[this,"doPager5"]});		
		
		this.sg4 = new saiGrid(this.pc1.childPage[1],{bound:[1,5,this.pc1.width-5,this.pc1.height-30],colCount:7,tag:9,
				colTitle:["Bank","Cabang","No Rekening","Nama Rekening","Bruto","Potongan","Netto"],
				colWidth:[[6,5,4,3,2,1,0],[80,80,80,200,100,200,200]],
				columnReadOnly:[true,[0,1,2,3,4,5,6],[]],				
				colFormat:[[4,5,6],[cfNilai,cfNilai,cfNilai]],												
				defaultRow:1,autoAppend:false});
		this.sgn4 = new portalui_sgNavigator(this.pc1.childPage[1],{bound:[1,this.pc1.height-25,this.pc1.width-1,25],buttonStyle:3,grid:this.sg4,pager:[this,"doPager4"]});
		
		this.sg1 = new saiGrid(this.pc1.childPage[2],{bound:[1,5,this.pc1.width-5,this.pc1.height-30],colCount:7,tag:9,
		            colTitle:["Kode Akun","Nama Akun","DC","Keterangan","Nilai","Kode PP","Nama PP"],
					colWidth:[[6,5,4,3,2,1,0],[150,80,100,270,50,200,80]],					
					columnReadOnly:[true,[1,6],[0,2,3,4,5]],
					buttonStyle:[[0,2,5],[bsEllips,bsAuto,bsEllips]], 
					colFormat:[[4],[cfNilai]],picklist:[[2],[new portalui_arrayMap({items:["D","C"]})]],checkItem: true,
					cellEnter:[this,"doCellEnter1"],ellipsClick:[this,"doEllipsClick1"],change:[this,"doChangeCell1"],nilaiChange:[this,"doNilaiChange"],
					autoAppend:true,defaultRow:1});
		this.sgn1 = new portalui_sgNavigator(this.pc1.childPage[2],{bound:[1,this.pc1.height-25,this.pc1.width-1,25],buttonStyle:2,grid:this.sg1});		
		
		this.rearrangeChild(10, 23);
		this.pc2.childPage[0].rearrangeChild(10, 23);	
					
		uses("server_report_report;portalui_reportViewer");
		this.viewer = new portalui_reportViewer(this, {bound:[0,0,this.getWidth(), this.getHeight()],visible:false});
		this.viewer.hide();
		this.app._mainForm.initReport(this, this.viewer,"doSelectedPage","doCloseReportClick", "doRowPerPageChange", "doPdfClick","doXlsClick",true);
		this.report = new server_report_report();
		this.report.addListener(this);
		
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
			
			this.cb_akun.setSQL("select a.kode_akun, a.nama from masakun a inner join flag_relasi b on a.kode_akun=b.kode_akun and a.kode_lokasi=b.kode_lokasi "+
			                    "where b.kode_flag in ('001','009') and b.kode_lokasi='"+this.app._lokasi+"'",["kode_akun","nama"],false,["Kode","Nama"],"and","Data Akun KasBank",true);
			this.dataPP = this.app._pp;						
			var sql = new server_util_arrayList();
			sql.add("select a.kode_akun,a.nama from masakun a "+
			        "inner join flag_relasi b on a.kode_akun=b.kode_akun and a.kode_lokasi=b.kode_lokasi and b.kode_flag = '035' "+
					"left  join flag_relasi c on b.kode_akun=c.kode_akun and b.kode_lokasi=c.kode_lokasi and c.kode_flag in ('001','009') "+
			        "where c.kode_akun is null and a.block= '0' and a.kode_lokasi = '"+this.app._lokasi+"'");									
			this.dbLib.getMultiDataProviderA(sql);
			
		}catch(e){
			systemAPI.alert(e);
		}
	}
};
window.app_saku3_transaksi_bangtel_pbh_fKbSpb.extend(window.childForm);
window.app_saku3_transaksi_bangtel_pbh_fKbSpb.implement({	
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
			if (this.standarLib.checkEmptyByTag(this, [0,1,2])){
				try{														
					uses("server_util_arrayList");
					var sql = new server_util_arrayList();
					if (this.stsSimpan == 0) {
						sql.add("delete from trans_m where no_bukti = '"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
						sql.add("delete from trans_j where no_bukti = '"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");						
						sql.add("update yk_pb_m set progress='5', no_kas='-' where no_kas = '"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");					
						sql.add("update panjar2_m set progress='5', no_kas='-' where no_kas = '"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");							
						sql.add("delete from kas_pb_d where no_kas='"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
					}			

					sql.add("insert into trans_m (no_bukti,kode_lokasi,tgl_input,nik_user,periode,modul,form,posted,prog_seb,progress,kode_pp,tanggal,no_dokumen,keterangan,kode_curr,kurs,nilai1,nilai2,nilai3,nik1,nik2,nik3,no_ref1,no_ref2,no_ref3,param1,param2,param3) values "+
							"('"+this.e_nb.getText()+"','"+this.app._lokasi+"',getdate(),'"+this.app._userLog+"','"+this.e_periode.getText()+"','KB','KBSPB','F','0','0','"+this.app._kodePP+"','"+this.dp_d1.getDateString()+"','"+this.e_dok.getText()+"','"+this.e_ket.getText()+"','IDR',1,"+nilaiToFloat(this.e_nilaikb.getText())+",0,0,'-','-','-','-','-','-','"+this.c_jenis.getText()+"','"+this.cb_akun.getText()+"','-')");

					sql.add("insert into trans_j (no_bukti,kode_lokasi,tgl_input,nik_user,periode,no_dokumen,tanggal,nu,kode_akun,dc,nilai,nilai_curr,keterangan,modul,jenis,kode_curr,kurs,kode_pp,kode_drk,kode_cust,kode_vendor,no_fa,no_selesai,no_ref1,no_ref2,no_ref3)  values "+
							"('"+this.e_nb.getText()+"','"+this.app._lokasi+"',getdate(),'"+this.app._userLog+"','"+this.e_periode.getText()+"','"+this.e_dok.getText()+"','"+this.dp_d1.getDateString()+"',999,'"+this.cb_akun.getText()+"','C',"+nilaiToFloat(this.e_nilaikb.getText())+","+nilaiToFloat(this.e_nilaikb.getText())+",'"+this.e_ket.getText()+"','KBSPB','KB','IDR',1,'"+this.ppAkunKB+"','-','-','-','-','-','-','-','-')");
					
					for (var i=0;i < this.dataJU5.rs.rows.length;i++){
						line = this.dataJU5.rs.rows[i];
						if (line.status.toUpperCase() == "BAYAR") {
							sql.add("insert into kas_pb_d (no_kas,kode_lokasi,periode,tanggal,no_pb,no_spb,nilai) values "+
									"('"+this.e_nb.getText()+"','"+this.app._lokasi+"','"+this.e_periode.getText()+"','"+this.dp_d1.getDateString()+"','"+line.no_bukti+"','"+line.no_spb+"',"+parseFloat(line.nilai)+")");

							sql.add("update yk_pb_m set progress='6', no_kas='"+this.e_nb.getText()+"' where no_pb = '"+line.no_bukti+"' and kode_lokasi='"+this.app._lokasi+"'");						
							sql.add("update panjar2_m set progress='6', no_kas='"+this.e_nb.getText()+"' where no_panjar = '"+line.no_bukti+"' and kode_lokasi='"+this.app._lokasi+"'");
							
							if (line.modul.toUpperCase() == "PBBAU" || line.modul.toUpperCase() == "PBPR" || line.modul.toUpperCase() == "PBINV" || line.modul.toUpperCase() == "PBLOG") {								
								sql.add("insert into trans_j (no_bukti,kode_lokasi,tgl_input,nik_user,periode,no_dokumen,tanggal,nu,kode_akun,dc,nilai,nilai_curr,keterangan,modul,jenis,kode_curr,kurs,kode_pp,kode_drk,kode_cust,kode_vendor,no_fa,no_selesai,no_ref1,no_ref2,no_ref3)  "+
										"select '"+this.e_nb.getText()+"',b.kode_lokasi,getdate(),'"+this.app._userLog+"','"+this.e_periode.getText()+"',b.no_pb,'"+this.dp_d1.getDateString()+"',c.no_urut,c.kode_akun,c.dc,c.nilai,c.nilai,c.keterangan,'KBSPB',c.jenis,c.kode_curr,c.kurs,c.kode_pp,c.kode_drk,'-','-','-','-','-','-','-' "+
										"from spm_app_j c inner join yk_pb_m b on c.no_app=b.no_ver and c.kode_lokasi=b.kode_lokasi "+
										"where b.no_ver='"+line.no_spb+"' and b.kode_lokasi='"+this.app._lokasi+"'");
								
							}
							if (line.modul.toUpperCase() == "PJAJU" || line.modul.toUpperCase() == "PJPR") {
								sql.add("insert into trans_j (no_bukti,kode_lokasi,tgl_input,nik_user,periode,no_dokumen,tanggal,nu,kode_akun,dc,nilai,nilai_curr,keterangan,modul,jenis,kode_curr,kurs,kode_pp,kode_drk,kode_cust,kode_vendor,no_fa,no_selesai,no_ref1,no_ref2,no_ref3)  "+
										"select '"+this.e_nb.getText()+"',b.kode_lokasi,getdate(),'"+this.app._userLog+"','"+this.e_periode.getText()+"',b.no_panjar,'"+this.dp_d1.getDateString()+"',c.no_urut,c.kode_akun,c.dc,c.nilai,c.nilai,c.keterangan,'KBSPB',c.jenis,c.kode_curr,c.kurs,c.kode_pp,c.kode_drk,'-','-','-','-','-','-','-' "+
										"from spm_app_j c inner join panjar2_m b on c.no_app=b.no_ver and c.kode_lokasi=b.kode_lokasi "+
										"where b.no_ver='"+line.no_spb+"' and b.kode_lokasi='"+this.app._lokasi+"'");
							}							
						}
					}
										
					if (this.sg1.getRowValidCount() > 0){
						for (var i=0;i < this.sg1.getRowCount();i++){
							if (this.sg1.rowValid(i)){
								var k = 1000+i;
								sql.add("insert into trans_j (no_bukti,kode_lokasi,tgl_input,nik_user,periode,no_dokumen,tanggal,nu,kode_akun,dc,nilai,nilai_curr,keterangan,modul,jenis,kode_curr,kurs,kode_pp,kode_drk,kode_cust,kode_vendor,no_fa,no_selesai,no_ref1,no_ref2,no_ref3) values "+
										"('"+this.e_nb.getText()+"','"+this.app._lokasi+"',getdate(),'"+this.app._userLog+"','"+this.e_periode.getText()+"','"+this.e_dok.getText()+"','"+this.dp_d1.getDateString()+"',"+k+",'"+this.sg1.cells(0,i)+"','"+this.sg1.cells(2,i).toUpperCase()+"',"+nilaiToFloat(this.sg1.cells(4,i))+","+nilaiToFloat(this.sg1.cells(4,i))+",'"+this.sg1.cells(3,i)+"','KBSPB','NONKB','IDR',1,'"+this.sg1.cells(5,i)+"','-','-','-','-','-','-','-','-')");
							}
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
					this.sg1.clear(1); this.sg4.clear(1); this.sg5.clear(1); this.sg3.clear(1); 
					this.dataJU5 = {rs:{rows:[]}};
					this.pc2.setActivePage(this.pc2.childPage[0]);					
					setTipeButton(tbAllFalse);					
				break;
			case "simpan" :															
			case "ubah" :																			
				this.preView = "1";				
				
				this.sg1.validasi();																
				for (var i=0;i < this.sg1.getRowCount();i++){					
					if (!this.sg1.rowValid(i)){
						var isKosong = true;
						for (var j=0;j < this.sg1.getColCount();j++){
							if (this.sg1.cells(j,i) != "") {
								isKosong = false;
								break;
							}
						}						
						if (!isKosong) {
							system.alert(this,"Transaksi tidak valid.","Terdapat kolom yang kosong di Tabel Jurnal NonKB.");
							return false;
						}
					}					
				}
				
				this.app._periode = this.dbLib.getPeriode(this.app._lokasi);																	
				if (nilaiToFloat(this.e_nilaikb.getText()) <= 0) {
					system.alert(this,"Transaksi tidak valid.","Total Nilai KB tidak boleh nol atau kurang.");
					return false;						
				}
				if (this.standarLib.doCekPeriode(this.dbLib,"KB",this.app._lokasi,this.app._userStatus,this.e_periode.getText()) == "0") {
					system.alert(this,"Periode transaksi modul tidak valid (KB - LOCKED).","Hubungi Administrator Sistem.");
					return false;
				}
				else 
				this.simpan();
				break;				
			case "simpancek" : this.simpan();			
				break;			
			case "hapus" :	
				this.preView = "0";				
				if (this.standarLib.doCekPeriode(this.dbLib,"KB",this.app._lokasi,this.app._userStatus,this.e_periode.getText()) == "0") {
					system.alert(this,"Periode transaksi modul tidak valid (KB - LOCKED).","Hubungi Administrator Sistem.");
					return false;
				}	
				else {	
					uses("server_util_arrayList");
					var sql = new server_util_arrayList();
					sql.add("delete from trans_m where no_bukti = '"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
					sql.add("delete from trans_j where no_bukti = '"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
					sql.add("update yk_pb_m set progress='5', no_kas='-' where no_kas = '"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");					
					sql.add("update panjar2_m set progress='5', no_kas='-' where no_kas = '"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");							
					sql.add("delete from kas_pb_d where no_kas='"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
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
	doChange:function(sender){
		if ((sender == this.e_periode || sender == this.c_jenis) && this.stsSimpan ==1) this.doClick();		
		if (sender == this.cb_akun && this.cb_akun.getText()!="") {
			var strSQL = "select kode_pp from relakun_pp2 where kode_akun='"+this.cb_akun.getText()+"' and kode_lokasi='"+this.app._lokasi+"'";						
			var data = this.dbLib.getDataProvider(strSQL,true);
			if (typeof data == "object" && data.rs.rows[0] != undefined){
				var line = data.rs.rows[0];							
				this.ppAkunKB = line.kode_pp;
			}
		}				
	},
	doClick:function(sender){
		if (this.e_periode.getText()!= "" && this.c_jenis.getText()!= "") {
			if (this.stsSimpan == 0) {					
				this.sg1.clear(1); this.sg4.clear(1); this.sg5.clear(1); this.sg3.clear(1); 
				this.dataJU5 = {rs:{rows:[]}};
				this.bLoad.show();				
				this.e_nilaikb.setText("0");
			}
			this.stsSimpan = 1;
			this.e_nb.setText(this.standarLib.noBuktiOtomatis(this.dbLib,"trans_m","no_bukti",this.app._lokasi+"-"+this.c_jenis.getText()+this.e_periode.getText().substr(2,4)+".","0000"));						
			this.cb_akun.setFocus();
			setTipeButton(tbSimpan);			
		}		
	},
	doLoad:function(sender){		
		this.dataJU5 = {rs:{rows:[]}};
		var strSQL = "select 'INPROG' as status,b.no_ver as no_spb,b.no_pb as no_bukti,convert(varchar,b.tanggal,103) as tgl,convert(varchar,b.tanggal,103) as duedate,b.keterangan,c.nilai,b.modul "+
		             "from spm_app_m a inner join yk_pb_m b on a.no_app=b.no_ver and a.kode_lokasi=b.kode_lokasi "+
					 "                 inner join (select no_app,sum(case dc when 'D' then nilai else -nilai end) as nilai "+
					 "                             from spm_app_j where kode_lokasi='"+this.app._lokasi+"' group by no_app) c on a.no_app=c.no_app  "+
					 "where b.progress='5' and b.no_kas='-' and b.kode_lokasi='"+this.app._lokasi+"' "+
					 "union all "+
					 
					 "select 'INPROG' as status,b.no_ver as no_spb,b.no_panjar as no_bukti,convert(varchar,b.tanggal,103) as tgl,convert(varchar,b.due_date,103) as duedate,b.keterangan,c.nilai,a.modul "+
		             "from spm_app_m a inner join panjar2_m b on a.no_app=b.no_ver and a.kode_lokasi=b.kode_lokasi "+
					 "                 inner join (select no_app,sum(case dc when 'D' then nilai else -nilai end) as nilai "+
					 "                             from spm_app_j where kode_lokasi='"+this.app._lokasi+"' group by no_app) c on a.no_app=c.no_app  "+
					 "where b.progress='5' and b.no_kas='-' and b.kode_lokasi='"+this.app._lokasi+"' "+
					 
					 "order by b.no_ver ";		
		var data = this.dbLib.getDataProvider(strSQL,true);
		if (typeof data == "object" && data.rs.rows[0] != undefined){
			this.dataJU5 = data;
			this.sgn5.setTotalPage(Math.ceil(data.rs.rows.length/20));
			this.sgn5.rearrange();
			this.doTampilData5(1);
		} else this.sg5.clear(1);						
		this.pc1.setActivePage(this.pc1.childPage[0]);
	},
	doTampilData5: function(page) {		
		this.sg5.clear(); this.sg4.clear(1);
		var line;
		this.page = page;
		var start = (page - 1) * 20;
		var finish = (start + 20 > this.dataJU5.rs.rows.length? this.dataJU5.rs.rows.length:start+20);
		for (var i=start;i<finish;i++){
			line = this.dataJU5.rs.rows[i];									
			this.sg5.appendData([line.status.toUpperCase(),line.no_spb,line.no_bukti,line.tgl,line.duedate,line.keterangan,floatToNilai(line.nilai),line.modul.toUpperCase()]);
		}
		this.sg5.setNoUrut(start);		
	},
	doPager5: function(sender, page) {
		this.doTampilData5(page);
	},	
	doChangeCell5: function(sender, col , row) {
		if (col == 0) {			
			this.dataJU5.rs.rows[((this.page-1)*20) + row].status = this.sg5.cells(0,row);			
			this.sg1.validasi();
		}
	},
	doDoubleClick5: function(sender, col , row) {
		var line = noSPB = "";		
		for (var i=0;i < this.dataJU5.rs.rows.length;i++){
			line = this.dataJU5.rs.rows[i];
			if (line.status.toUpperCase() == "BAYAR") {
				noSPB += ",'"+line.no_spb+"'";
			}
		}
		noSPB = noSPB.substr(1);							
		if (noSPB != "") {					
			var strSQL = "select a.bank,a.cabang,a.no_rek,a.nama_rek,a.bruto,a.pajak,a.nilai "+
						 "from spm_rek a inner join yk_pb_m b on a.no_bukti=b.no_pb and a.kode_lokasi=b.kode_lokasi "+
						 "where b.no_ver in ("+noSPB+") and b.kode_lokasi ='"+this.app._lokasi+"' "+
						 "union all "+
						 
						 "select a.bank,a.cabang,a.no_rek,a.nama_rek,a.bruto,a.pajak,a.nilai "+
						 "from spm_rek a inner join panjar2_m b on a.no_bukti=b.no_panjar and a.kode_lokasi=b.kode_lokasi "+
						 "where b.no_ver in ("+noSPB+") and b.kode_lokasi ='"+this.app._lokasi+"' "+

						 " ";						 
			var data = this.dbLib.getDataProvider(strSQL,true);
			if (typeof data == "object" && data.rs.rows[0] != undefined){
				var line;
				this.sg4.clear();
				for (var i in data.rs.rows){
					line = data.rs.rows[i];												
					this.sg4.appendData([line.bank,line.cabang,line.no_rek,line.nama_rek,floatToNilai(line.bruto),floatToNilai(line.pajak),floatToNilai(line.nilai)]);
				}
			} else this.sg4.clear(1);														
			this.pc1.setActivePage(this.pc1.childPage[1]);
		}
		else system.alert(this,"Data tidak valid.","Tidak ada SPB yang berstatus BAYAR.");			
	},
	doNilaiChange: function(){
		try{
			var totKB = 0;
			for (var i=0;i < this.dataJU5.rs.rows.length;i++){
				line = this.dataJU5.rs.rows[i];
				if (line.status.toUpperCase() == "BAYAR") {
					totKB += parseFloat(line.nilai);
				}
			}
			for (var i = 0; i < this.sg1.rows.getLength();i++){
				if (this.sg1.rowValid(i) && this.sg1.cells(4,i) != ""){
					if (this.sg1.cells(2,i).toUpperCase() == "D") totKB += nilaiToFloat(this.sg1.cells(4,i));
					if (this.sg1.cells(2,i).toUpperCase() == "C") totKB -= nilaiToFloat(this.sg1.cells(4,i));
				}
			}
			this.e_nilaikb.setText(floatToNilai(totKB));
		}catch(e)
		{
			alert("[app_saku_gl_transaksi_fJu2]::doNilaiChange:"+e);
		}
	},
	doChangeCell1: function(sender, col, row){
		if ((col == 2 || col == 4) && (this.sg1.cells(4,row) != "")) this.sg1.validasi();
		sender.onChange.set(undefined,undefined);	    
		if (col == 0) {
			if (this.sg1.cells(0,row) != "") {				
				var akun = this.dataAkun.get(sender.cells(0,row));				
				if (akun) sender.cells(1,row,akun);
				else {
					if (trim(sender.cells(0,row)) != "") system.alert(this,"Kode Akun "+sender.cells(0,row)+" tidak ditemukan","Inputkan kode lainnya.","checkAkun");                
					sender.cells(0,row,"");
					sender.cells(1,row,"");
				}				
			}
		}		
		if (col == 5) {
			if (this.sg1.cells(5,row) != "") {
				var pp = this.dataPP.get(sender.cells(5,row));
				if (pp) sender.cells(6,row,pp);
				else {
					if (trim(sender.cells(5,row)) != "") system.alert(this,"Kode PP "+sender.cells(5,row)+" tidak ditemukan","Inputkan kode lainnya.","checkPP");                
					sender.cells(5,row,"");
					sender.cells(6,row,"");
				}				
			}
		}		
		sender.onChange.set(this,"doChangeCell1");		
	},	
	doCellEnter1: function(sender, col, row){
		switch(col){
			case 2 : 
					if (this.sg1.cells(2,row) == ""){
						this.sg1.setCell(2,row,"D");						
					}
				break;
			case 3 : 
					if (this.sg1.cells(3,row) == ""){
						if (row == 0) this.sg1.setCell(3,row,this.e_ket.getText());
						else this.sg1.setCell(3,row,this.sg1.cells(3,(row-1)) );
					}
				break;
			case 4 : 
					if (this.sg1.cells(4,row) == "" && row > 0) {
						var sls = nilaiToFloat(this.e_debet.getText()) - nilaiToFloat(this.e_kredit.getText());
						sls = Math.abs(sls); 
						this.sg1.setCell(4,row,floatToNilai(sls));
					}
				break;
			case 5 : 
					if (this.sg1.cells(5,row) == "") {
						if (row == 0) this.sg1.setCell(5,row,this.app._kodePP);
						else {
							this.sg1.setCell(5,row,this.sg1.cells(5,(row-1)));
							this.sg1.setCell(6,row,this.sg1.cells(6,(row-1)));
						}
					}
				break;							
		}
	},	
	doEllipsClick1: function(sender, col, row){
		try{			
			if (sender == this.sg1) {
				if (col == 0){
					this.standarLib.showListData(this, "Daftar Akun",sender,undefined, 
						    "select a.kode_akun,a.nama from masakun a "+
							"inner join flag_relasi b on a.kode_akun=b.kode_akun and a.kode_lokasi=b.kode_lokasi and b.kode_flag = '035' "+
							"left  join flag_relasi c on b.kode_akun=c.kode_akun and b.kode_lokasi=c.kode_lokasi and c.kode_flag in ('001','009') "+
							"where c.kode_akun is null and a.block= '0' and a.kode_lokasi = '"+this.app._lokasi+"'",
							"select count(a.kode_akun) from masakun a inner join flag_relasi b on a.kode_akun=b.kode_akun and a.kode_lokasi=b.kode_lokasi and b.kode_flag = '035' where a.block= '0' and a.kode_lokasi = '"+this.app._lokasi+"'",
							["a.kode_akun","a.nama"],"and",["Kode","Nama"],false);				
				}
				if (col == 5){
					this.standarLib.showListData(this, "Daftar PP/Unit",sender,undefined, 
							"select kode_pp, nama  from pp where kode_lokasi = '"+this.app._lokasi+"' and tipe='posting' and flag_aktif ='1'",
							"select count(kode_pp) from pp where kode_lokasi = '"+this.app._lokasi+"' and tipe='posting' and flag_aktif ='1'",
							["kode_pp","nama"],"and",["Kode","Nama"],false);				
				}								
			}
		}catch(e){
			systemAPI.alert(e);
		}
	},
	doRequestReady: function(sender, methodName, result){
		if (sender == this.dbLib){
			try{   
				switch(methodName){
	    			case "execArraySQL" :	    				
						if (result.toLowerCase().search("error") == -1){
							if (this.preView == "1") {								
								this.nama_report="server_report_saku3_bangtel_rptKbJurnalBukti";
								this.filter = " where a.kode_lokasi='"+this.app._lokasi+"' and a.no_bukti='"+this.e_nb.getText()+"' ";
								this.filter2 = "";
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
								this.pc2.hide();
							} 
							else {
								system.info(this,"Transaksi telah sukses tereksekusi (No Bukti : "+ this.e_nb.getText()+")","");							
								this.clearLayar();
							} 
						}else system.info(this,result,"");
	    			break;
					case "getMultiDataProvider":
						eval("result = "+result+";");
						if (typeof result != "string"){
							this.dataAkun = new portalui_arrayMap();														
							if (result.result[0]){	    			        
								var line;
								for (var i in result.result[0].rs.rows){
									line = result.result[0].rs.rows[i];									
									this.dataAkun.set(line.kode_akun, line.nama);										
								}								
							}							
						}else throw result;
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
				this.pc2.show();   
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
			this.dataJU5 = {rs:{rows:[]}};
			this.sg1.clear(1); this.sg4.clear(1); this.sg5.clear(1); this.sg3.clear(1); 
			this.pc2.setActivePage(this.pc2.childPage[0]);
			this.pc1.setActivePage(this.pc1.childPage[0]);			
			setTipeButton(tbAllFalse);
		} catch(e) {
			alert(e);
		}
	},
	doLoad3:function(sender){																		
		var strSQL = "select a.no_bukti,convert(varchar,a.tanggal,103) as tgl,a.param1 as jenis,a.no_dokumen,a.keterangan,a.nilai1 "+
		             "from trans_m a "+					 					 
					 "where a.periode='"+this.e_periode.getText()+"' and a.kode_lokasi='"+this.app._lokasi+"' and a.form = 'KBSPB' and a.posted ='F'";		
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
			this.sg3.appendData([line.no_bukti,line.tgl,line.jenis,line.no_dokumen,line.keterangan,floatToNilai(line.nilai1)]); 
		}
		this.sg3.setNoUrut(start);
	},
	doPager3: function(sender, page) {
		this.doTampilData3(page);
	},
	doDoubleClick3: function(sender, col , row) {
		try{
			if (this.sg3.cells(0,row) != "") {
				this.pc2.setActivePage(this.pc2.childPage[0]);																		
				this.pc1.setActivePage(this.pc1.childPage[0]);																		
				setTipeButton(tbUbahHapus);
				this.stsSimpan = 0;				
				this.bLoad.hide();
				this.e_nb.setText(this.sg3.cells(0,row));								
								
				var strSQL = "select * from trans_m where no_bukti = '"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'";						
				var data = this.dbLib.getDataProvider(strSQL,true);
				if (typeof data == "object"){
					var line = data.rs.rows[0];							
					if (line != undefined){								
						this.dp_d1.setText(line.tanggal);
						this.e_dok.setText(line.no_dokumen);
						this.e_ket.setText(line.keterangan);						
						this.c_jenis.setText(line.param1);						
						this.cb_akun.setText(line.param2);						
					}
				}								
				this.dataJU5 = {rs:{rows:[]}};
							 
				var strSQL = "select 'BAYAR' as status,b.no_ver as no_spb,b.no_pb as no_bukti,convert(varchar,b.tanggal,103) as tgl,convert(varchar,b.tanggal,103) as duedate,b.keterangan,b.nilai,b.modul "+
							 "from spm_app_m a inner join yk_pb_m b on a.no_app=b.no_ver and a.kode_lokasi=b.kode_lokasi "+
							 "where b.progress='6' and b.no_kas='"+this.e_nb.getText()+"' and b.kode_lokasi='"+this.app._lokasi+"' "+
							 "union all "+
							 
							 "select 'BAYAR' as status,b.no_ver as no_spb,b.no_panjar as no_bukti,convert(varchar,b.tanggal,103) as tgl,convert(varchar,b.due_date,103) as duedate,b.keterangan,b.nilai,a.modul "+
							 "from spm_app_m a inner join panjar2_m b on a.no_app=b.no_ver and a.kode_lokasi=b.kode_lokasi "+
							 "where b.progress='6' and b.no_kas='"+this.e_nb.getText()+"' and b.kode_lokasi='"+this.app._lokasi+"' "+
							 
							 " ";		
					 
				var data = this.dbLib.getDataProvider(strSQL,true);
				if (typeof data == "object" && data.rs.rows[0] != undefined){
					this.dataJU5 = data;
					this.sgn5.setTotalPage(Math.ceil(data.rs.rows.length/20));
					this.sgn5.rearrange();
					this.doTampilData5(1);
				} else this.sg5.clear(1);						
				this.pc1.setActivePage(this.pc1.childPage[0]);				
				
				var data = this.dbLib.getDataProvider(
							"select a.kode_akun,b.nama as nama_akun,a.dc,a.keterangan,a.nilai,a.kode_pp,c.nama as nama_pp "+
							"from trans_j a inner join masakun b on a.kode_akun=b.kode_akun and a.kode_lokasi=b.kode_lokasi "+
							"               inner join pp c on a.kode_pp=c.kode_pp and a.kode_lokasi=c.kode_lokasi "+																				
							"where a.jenis='NONKB' and a.no_bukti = '"+this.e_nb.getText()+"' and a.kode_lokasi='"+this.app._lokasi+"' order by a.nu",true);
				if (typeof data == "object" && data.rs.rows[0] != undefined){
					var line;
					this.sg1.clear();
					for (var i in data.rs.rows){
						line = data.rs.rows[i];												
						this.sg1.appendData([line.kode_akun,line.nama_akun,line.dc,line.keterangan,floatToNilai(line.nilai),line.kode_pp,line.nama_pp]);
					}
				} else this.sg1.clear(1);		
										
			}									
		} catch(e) {alert(e);}
	}
});