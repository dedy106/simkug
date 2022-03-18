window.app_saku3_transaksi_tu_proyekbaru_fProyek = function(owner)
{
	if (owner)
	{
		window.app_saku3_transaksi_tu_proyekbaru_fProyek.prototype.parent.constructor.call(this,owner);
		this.className  = "app_saku3_transaksi_tu_proyekbaru_fProyek";
		this.itemsValue = new arrayList();
		this.app._mainForm.childFormConfig(this, "mainButtonClick","Form Data Proyek", 0);			

		uses("portalui_uploader;saiCBBL;saiEdit;datePicker;saiGrid;sgNavigator;pageControl;checkBox");		
		this.pc2 = new pageControl(this,{bound:[10,10,1000,450], childPage:["Data Proyek","List Proyek"]});		
		this.sg3 = new saiGrid(this.pc2.childPage[1],{bound:[1,5,this.pc2.width-5,this.pc2.height-33],colCount:4,tag:9,
			    colTitle:["No Approval","Tanggal","No RAB","Pilih"],
				colWidth:[[3,2,1,0],[70,150,100,100]],
				readOnly:true,
				click:[this,"doSgBtnClick3"], colAlign:[[3],[alCenter]],													 
				dblClick:[this,"doDoubleClick3"],autoAppend:false,defaultRow:1});		
		this.sgn3 = new portalui_sgNavigator(this.pc2.childPage[1],{bound:[1,this.pc2.height-25,this.pc2.width-1,25],buttonStyle:3,grid:this.sg3,pager:[this,"doPager3"]});
		this.bLoad3 = new portalui_imageButton(this.sgn3,{bound:[this.sgn3.width - 25,2,22,22],image:"icon/"+system.getThemes()+"/reload.png", hint:"Load Data",click:[this,"doLoad3"]});				
		
		this.l_tgl3 = new portalui_label(this.pc2.childPage[0],{bound:[20,11,100,18],caption:"Tanggal", underline:true});
		this.dp_d3 = new portalui_datePicker(this.pc2.childPage[0],{bound:[120,11,98,18],selectDate:[this,"doSelectDate"]}); 				
		this.cb_pp = new portalui_saiCBBL(this.pc2.childPage[0],{bound:[20,13,220,20],caption:"PP Proyek",tag:2, readOnly:true, change:[this,"doChange"]}); 					
		this.cb_rab = new saiLabelEdit(this.pc2.childPage[0],{bound:[520,13,220,20],caption:"No RAB [Verified]",tag:9,visible:false}); 				
		
		this.pc1 = new pageControl(this.pc2.childPage[0],{bound:[1,20,996,371], childPage:["Data RAB","Data Proyek","Distribusi Akru","File Dokumen","Detail RAB","Inisiasi Unit","Cattn Memo"]});				
		this.sg5 = new saiGrid(this.pc1.childPage[0],{bound:[1,5,this.pc1.width-5,this.pc1.height-33],colCount:7,tag:9,
				colTitle:["No RAB","No Verifikasi","Unit RAB","Deskripsi","Customer","Nilai Proyek","Pilih"],
				colWidth:[[6,5,4,3,2,1,0],[70,100,150,200,150,100,100]],
				readOnly:true,
				colFormat:[[5,6],[cfNilai,cfButton]],	
				click:[this,"doSgBtnClick5"], colAlign:[[6],[alCenter]],													 
				dblClick:[this,"doDoubleClick5"],
				autoAppend:false,defaultRow:1});
		this.sgn5 = new portalui_sgNavigator(this.pc1.childPage[0],{bound:[0,this.pc1.height-25,this.pc1.width-1,25],buttonStyle:3,grid:this.sg5});		
		
		this.e_noapp = new saiLabelEdit(this.pc1.childPage[1],{bound:[20,10,200,20],caption:"No Approval", readOnly:true, tag:2});
		this.i_gen = new portalui_imageButton(this.pc1.childPage[1],{bound:[225,10,20,20],hint:"Generate",image:"icon/"+system.getThemes()+"/tabCont2.png",click:[this,"doClick"]});								
		this.c_status = new saiCB(this.pc1.childPage[1],{bound:[20,11,200,20],caption:"Status",items:["APPROVE","RETURN"], readOnly:true,tag:2});						
		this.cb_kode = new saiLabelEdit(this.pc1.childPage[1],{bound:[20,12,200,20],caption:"ID Proyek", readOnly:true, change:[this,"doChange"]});			
		this.e_dok = new saiLabelEdit(this.pc1.childPage[1],{bound:[20,10,430,20],caption:"No Kontrak", maxLength:50, tag:1});			
		this.e_nama = new saiLabelEdit(this.pc1.childPage[1],{bound:[20,11,430,20],caption:"Deskripsi", maxLength:200, tag:1});			
		this.cb_cust = new portalui_saiCBBL(this.pc1.childPage[1],{bound:[20,14,220,20],caption:"Customer",tag:1,multiSelection:false});	
		this.e_bank = new saiLabelEdit(this.pc1.childPage[1],{bound:[520,14,430,20],caption:"Bank VA", maxLength:100, tag:1});							
		this.l_tgl1 = new portalui_label(this.pc1.childPage[1],{bound:[20,13,100,18],caption:"Tgl Mulai", underline:true});
		this.dp_d1 = new portalui_datePicker(this.pc1.childPage[1],{bound:[120,13,98,18],selectDate:[this,"doSelectDate2"]}); 		
		this.e_namarek = new saiLabelEdit(this.pc1.childPage[1],{bound:[520,13,430,20],caption:"Nama Rekening", maxLength:100, tag:1});									
		this.l_tgl2 = new portalui_label(this.pc1.childPage[1],{bound:[260,13,100,18],caption:"Tgl Selesai", underline:true});
		this.dp_d2 = new portalui_datePicker(this.pc1.childPage[1],{bound:[350,13,98,18],selectDate:[this,"doSelectDate2"]}); 		
		this.l_tgl4 = new portalui_label(this.pc1.childPage[1],{bound:[20,15,100,18],caption:"TglMax Adminstrsi", underline:true});
		this.dp_d4 = new portalui_datePicker(this.pc1.childPage[1],{bound:[120,15,98,18]}); 
		this.e_norek = new saiLabelEdit(this.pc1.childPage[1],{bound:[520,15,430,20],caption:"No Rekening", maxLength:50, tag:1});							
		this.cb_jenis = new portalui_saiCBBL(this.pc1.childPage[1],{bound:[20,17,220,20],caption:"Jenis",tag:2,multiSelection:false}); 						
		this.e_nilai = new saiLabelEdit(this.pc1.childPage[1],{bound:[20,13,200,20],caption:"Nilai Proyek", tag:1, tipeText:ttNilai, text:"0",change:[this,"doChange"]});
		this.e_persenor = new saiLabelEdit(this.pc1.childPage[1],{bound:[20,14,200,20],caption:"Persen OR", tag:1, tipeText:ttNilai, text:"0",change:[this,"doChange"]});								
		this.e_nilaior = new saiLabelEdit(this.pc1.childPage[1],{bound:[20,15,200,20],caption:"Nilai OR", tag:1, tipeText:ttNilai, text:"0", readOnly:true});										
		this.e_ppn = new saiLabelEdit(this.pc1.childPage[1],{bound:[20,13,200,20],caption:"Nilai PPN", tag:1, tipeText:ttNilai, text:"0", readOnly:true});	
		this.e_join = new saiLabelEdit(this.pc1.childPage[1],{bound:[260,13,190,20],caption:"Ni JoinCost", tag:1, tipeText:ttNilai, text:"0",readOnly:true,labelWidth:80});			
		this.e_pph4 = new saiLabelEdit(this.pc1.childPage[1],{bound:[20,15,200,20],caption:"Nilai PPh", tag:1, tipeText:ttNilai, text:"0",readOnly:true});				
		this.e_jumlah = new saiLabelEdit(this.pc1.childPage[1],{bound:[20,14,200,20],caption:"Jml Jadwal", tag:1, tipeText:ttNilai, text:"0"});	
		this.bJadwal = new button(this.pc1.childPage[1],{bound:[235,14,80,18],caption:"Buat Jadwal",click:[this,"doJadwal"]});					
		
		this.sg = new saiGrid(this.pc1.childPage[2],{bound:[1,5,this.pc1.width-5,this.pc1.height-33],colCount:3,tag:9,
				colTitle:["Periode","Nilai Pend","Nilai Beban"],
				colWidth:[[2,1,0],[150,150,100]],
				columnReadOnly:[true,[0],[]],
				colFormat:[[1,2],[cfNilai,cfNilai]],	
				nilaiChange:[this,"doNilaiChange"],change:[this,"doChangeCells"],autoAppend:true,defaultRow:1});
		this.sgn = new portalui_sgNavigator(this.pc1.childPage[2],{bound:[0,this.pc1.height-25,this.pc1.width-1,25],buttonStyle:2,grid:this.sg});		
		
		this.sg1mp2 = new saiGrid(this.pc1.childPage[3],{bound:[1,5,this.pc1.width-4,this.pc1.height-33],colCount:4,readOnly:true,tag:9,
				colTitle:["Kd Jenis","Jenis Dokumen","Path File","DownLoad"],
				colWidth:[[3,2,1,0],[80,480,200,80]],
				rowCount:1,colFormat:[[3],[cfButton]],click:[this,"doSgBtnClick"], colAlign:[[3],[alCenter]]});
		this.sgn2 = new sgNavigator(this.pc1.childPage[3],{bound:[1,this.pc1.height - 25,this.pc1.width - 1,25],buttonStyle:3,pager:[this,"doPager2"],beforePrint:[this,"doBeforePrintSg2"], grid:this.sg1mp2});            
	
		this.sgr = new saiGrid(this.pc1.childPage[4],{bound:[1,5,this.pc1.width-5,this.pc1.height-33],colCount:5,tag:1,
				colTitle:["Kegiatan","Quantity","Harga Satuan","SubTotal","Jenis"],
				colWidth:[[4,3,2,1,0],[80,100,100,100,500]],
				readOnly:true,
				colFormat:[[1,2,3],[cfNilai,cfNilai,cfNilai]],	
				autoAppend:false,defaultRow:1});
		this.sgnr = new portalui_sgNavigator(this.pc1.childPage[4],{bound:[0,this.pc1.height-25,this.pc1.width-1,25],buttonStyle:3,grid:this.sgr});		
			
		this.sg6 = new saiGrid(this.pc1.childPage[5],{bound:[1,5,this.pc1.width-5,this.pc1.height-33],colCount:8,tag:9,
				colTitle:["No Agenda","Keterangan","ID Kegiatan","Deskripsi","Nilai Agenda","Tot JoinCost","Saldo Agenda","Ni JoinCost"],
				colWidth:[[7,6,5,4,3,2,1,0],[100,100,100,100,250,120,200,100]],
				colHide:[[4,5],[true,true]],
				columnReadOnly:[true,[0,1,2,3,4,5,6],[7]],
				colFormat:[[4,5,6,7],[cfNilai,cfNilai,cfNilai,cfNilai]],
				nilaiChange:[this,"doNilaiChange6"],change:[this,"doChangeCell6"],	
				autoAppend:false,defaultRow:1});
	this.sgn6 = new portalui_sgNavigator(this.pc1.childPage[5],{bound:[0,this.pc1.height-25,this.pc1.width-1,25],buttonStyle:3,grid:this.sg6});		

		this.sgctt = new saiGrid(this.pc1.childPage[6],{bound:[1,5,this.pc1.width-12,this.pc1.height-15],colCount:1,tag:9, 
			colTitle:["Catatan"],
			colWidth:[[0],[100]],					
			readOnly:true,autoAppend:false,defaultRow:1});

		this.rearrangeChild(10, 23);
		this.pc2.childPage[0].rearrangeChild(10, 23);
		this.pc1.childPage[1].rearrangeChild(10, 23);	

		this.e_memo = new saiMemo(this.pc1.childPage[1],{bound:[520,10,430,112],caption:"Catatan NTF",tag:9});		
		
		setTipeButton(tbAllFalse);
		this.maximize();		
		this.setTabChildIndex();
		try {
			this.fileUtil = new util_file();
			this.fileUtil.addListener(this);
			this.rootDir = this.app._rootDir;
			this.separator = "/";
			
			this.dbLib = new util_dbLib();
			this.dbLib.addListener(this);
			uses("util_standar");
			this.standarLib = new util_standar();
			this.stsSimpan = 1;
			this.doSelectDate(this.dp_d1,this.dp_d1.year,this.dp_d1.month,this.dp_d1.day);
			
			this.cb_pp.setSQL("select kode_pp,nama from pp where flag_aktif='1' and kode_lokasi='"+this.app._lokasi+"'",["kode_pp","nama"],false,["Kode","Nama"],"and","Data PP",true); 
			this.cb_jenis.setSQL("select kode_jenis,nama from prb_proyek_jenis where kode_lokasi='"+this.app._lokasi+"'",["kode_jenis","nama"],false,["Kode","Nama"],"and","Data Jenis",true);
						
			this.noAppLama = "-";

			this.doLoadlistRAB();
			this.doLoadCtt(this.cb_rab.getText());

		}catch(e){
			systemAPI.alert(e);
		}
	}
};
window.app_saku3_transaksi_tu_proyekbaru_fProyek.extend(window.childForm);
window.app_saku3_transaksi_tu_proyekbaru_fProyek.implement({	
	doSgBtnClick5: function(sender, col, row){
		try{
			if (col === 6) this.doDoubleClick5(this.sg5,0,row);						
		}catch(e){
			alert(e);
		}
	},
	doDoubleClick5: function(sender, col , row) {
		this.cb_rab.setText(this.sg5.cells(0,row));
		this.doLoadRAB();
	},
	doLoadlistRAB: function() {
		var strSQL = "select a.no_rab,a.no_app,a.keterangan,b.kode_pp+' | '+b.nama as pp,c.kode_cust+' | '+c.nama as cust,a.nilai "+
								 "from prb_rabapp_m a "+
								 "			inner join pp b on a.kode_pp=b.kode_pp and a.kode_lokasi=b.kode_lokasi "+
								 "			inner join prb_rab_cust c on a.no_rab=c.no_rab and a.kode_lokasi=c.kode_lokasi "+					 					 
								 "where a.progress='1' and a.kode_lokasi='"+this.app._lokasi+"'";
		var data = this.dbLib.getDataProvider(strSQL,true);
		if (typeof data == "object" && data.rs.rows[0] != undefined){
			var line;
			this.sg5.clear();
			for (var i in data.rs.rows){
				line = data.rs.rows[i];												
				this.sg5.appendData([line.no_rab,line.no_app,line.pp,line.keterangan,line.cust,floatToNilai(line.nilai),"Pilih"]);
			}
		} 
		else this.sg5.clear(1);		
	},
	doSgBtnClick: function(sender, col, row){
		try{
			if (col === 3)
				window.open("server/media/"+this.sg1mp2.getCell(2,row));
		}catch(e){
			alert(e);
		}
	},
	doLoadRAB: function() {
		try {
			if (this.cb_rab.getText() != "") {
				this.pc1.setActivePage(this.pc1.childPage[1]);
				this.doLoadCtt(this.cb_rab.getText());

				var strSQL = "select a.* from prb_rabapp_m a where a.no_rab='"+this.cb_rab.getText()+"' and a.kode_lokasi='"+this.app._lokasi+"'";				
				var data = this.dbLib.getDataProvider(strSQL,true);
				if (typeof data == "object"){
					var line = data.rs.rows[0];							
					if (line != undefined){		
						this.ppRAB = line.kode_pp;	
						this.cb_pp.setText(line.pp_kelola);						
						this.e_nama.setText(line.keterangan);
						this.e_dok.setText(line.no_dok);						
						this.cb_cust.setSQL("select kode_cust,nama from prb_rab_cust where no_rab='"+line.no_rab+"' and kode_lokasi='"+this.app._lokasi+"'",["kode_cust","nama"],false,["Kode","Nama"],"and","Data Customer",true);
						this.cb_cust.setText(line.kode_cust);						
						this.dp_d1.setText(line.tgl_mulai);
						this.dp_d2.setText(line.tgl_selesai);
						this.dp_d4.setText(line.tgl_admin);
						this.noRABaju = line.no_rab;						
						
						this.e_nilai.setText(floatToNilai(line.nilai));
						this.e_persenor.setText(floatToNilai(line.p_or));
						this.e_nilaior.setText(floatToNilai(line.nilai_or));
						this.cb_jenis.setText(line.kode_jenis);
						this.e_ppn.setText(floatToNilai(line.ppn));
						this.e_pph4.setText(floatToNilai(line.pph42));
						this.e_bank.setText(line.bank);
						this.e_namarek.setText(line.nama_rek);
						this.e_norek.setText(line.no_rek);
						
						var data2 = this.dbLib.getDataProvider("select * from prb_rabapp_d where no_rab = '"+this.cb_rab.getText()+"' and kode_lokasi='"+this.app._lokasi+"' order by jenis desc,nu",true);
						if (typeof data2 == "object" && data2.rs.rows[0] != undefined){
							var line2;
							this.sgr.clear();
							for (var i in data2.rs.rows){
								line2 = data2.rs.rows[i];												
								this.sgr.appendData([line2.keterangan,floatToNilai(line2.jumlah),floatToNilai(line2.harga),floatToNilai(line2.total),line2.jenis]);
							}
						} 
						else this.sgr.clear(1);	
						
						this.sg1mp2.clear();
						var data2 = this.dbLib.getDataProvider(
								"select b.kode_jenis,b.nama,a.no_gambar from prb_rab_dok a inner join prb_dok_jenis b on a.kode_jenis=b.kode_jenis and a.kode_lokasi=b.kode_lokasi "+
								"where a.no_rab = '"+this.noRABaju+"' and a.kode_lokasi='"+this.app._lokasi+"' order by a.nu",true);							
						if (typeof data2 == "object" && data2.rs.rows[0] != undefined){
							var line2;
							this.sg1mp2.clear();
							for (var i in data2.rs.rows){
								line2 = data2.rs.rows[i];										
								this.sg1mp2.appendData([line2.kode_jenis, line2.nama, line2.no_gambar, "DownLoad"]);
							}
						} else this.sg1mp2.clear(1);

						//inisiasi join cost
						var strSQL = "select a.no_bukti,a.keterangan,a.kode_proyek,d.nama,a.nilai as ni_agenda, isnull(c.joincost,0) as joincost, a.nilai - isnull(c.joincost,0) as sisa_agenda,isnull(e.nilai_join,0) as nilai_join "+
									"from prb_prbeban_d a "+
									"inner join it_aju_m b on a.no_bukti=b.no_aju and a.kode_lokasi=b.kode_lokasi "+
									"inner join prb_proyek d on a.kode_proyek=d.kode_proyek and a.kode_lokasi=d.kode_lokasi and d.versi='PRO20' "+

									"left join ( "+
									"			select no_ref1,kode_lokasi,sum(case dc when 'D' then nilai else -nilai end) as joincost "+
									"			from prb_prbeban_d "+
									"			where kode_lokasi = '"+this.app._lokasi+"' and kode_proyek not in ('"+this.cb_rab.getText()+"','"+this.cb_kode.getText()+"') group by no_ref1,kode_lokasi "+
									") c on a.no_bukti=c.no_ref1 and a.kode_lokasi=c.kode_lokasi "+

									"left join ( "+
									"			select no_ref1,kode_lokasi,sum(case dc when 'D' then nilai else 0 end) as nilai_join "+
									"			from prb_prbeban_d "+
									"			where kode_lokasi = '"+this.app._lokasi+"' and kode_proyek in ('"+this.cb_rab.getText()+"','"+this.cb_kode.getText()+"') group by no_ref1,kode_lokasi "+
									") e on a.no_bukti=e.no_ref1 and a.kode_lokasi=e.kode_lokasi "+

									"where d.kode_pp ='"+this.ppRAB+"' and b.form in ('INISIASI','ISPJPTG') and dc='D' and a.kode_lokasi='"+this.app._lokasi+"' "+
									"      and a.nilai > isnull(c.joincost,0) order by a.no_bukti";						

						var data2 = this.dbLib.getDataProvider(strSQL,true);							
						if (typeof data2 == "object" && data2.rs.rows[0] != undefined){
							var line2;
							this.sg6.clear();
							for (var i in data2.rs.rows){
								line2 = data2.rs.rows[i];										
								this.sg6.appendData([line2.no_bukti,line2.keterangan,line2.kode_proyek,line2.nama,floatToNilai(line2.ni_agenda),floatToNilai(line2.joincost),floatToNilai(line2.sisa_agenda),floatToNilai(line2.nilai_join)]);
							}
						} else this.sg6.clear(1);					

					}					
				}
			}
		} catch(e) {
			alert(e);
		}
	},
	doJadwal: function(sender){
		try{			
			if (this.periode != "" && this.e_jumlah.getText() != "") {
				this.sg.clear(1);
				
				var tot = totb = 0;
				var jum = nilaiToFloat(this.e_jumlah.getText());
				var nilai = Math.round(nilaiToFloat(this.e_nilai.getText()) / nilaiToFloat(this.e_jumlah.getText()));
				var nilaior = Math.round( (nilaiToFloat(this.e_nilaior.getText())) / nilaiToFloat(this.e_jumlah.getText())) ; 
				
				var period = this.dp_d1.getText().substr(6,4)+this.dp_d1.getText().substr(3,2);				
				for (var i=0;i < jum;i++){
					this.sg.appendData([period,floatToNilai(nilai),floatToNilai(nilaior)]);
					period = getNextPeriode(period);	
					tot += nilai;	
					totb += nilaior;	
				}		
					
				nilai = nilaiToFloat(this.e_nilai.getText()) - tot;
				nilai = nilai + nilaiToFloat(this.sg.cells(1,i-1));
				this.sg.cells(1,i-1,nilai);				
				
				nilaior = nilaiToFloat(this.e_nilaior.getText()) - totb; 
				nilaior = nilaior + nilaiToFloat(this.sg.cells(2,i-1));
				this.sg.cells(2,i-1,nilaior);				
																			
				this.pc1.setActivePage(this.pc1.childPage[2]);			
			} 
			else {
				system.alert(this,"Periode dan jumlah harus valid.","Filter dari tanggal mulai.");
				this.sg1.clear(1);
			}
		}catch(e){
			systemAPI.alert(e);
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
					if (this.stsSimpan == 0) {
						sql.add("delete from prb_proyek where kode_proyek = '"+this.cb_kode.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");			
						sql.add("delete from prb_proyek_d where kode_proyek = '"+this.cb_kode.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");																			
					}
					
					this.e_noapp.setText(this.standarLib.noBuktiOtomatis(this.dbLib,"prb_proyek_app","no_app",this.app._lokasi+"-AP"+this.periode.substr(2,4)+".","0000"));				
					sql.add("update prb_proyek_app set no_appseb = '"+this.e_noapp.getText()+"' where no_appseb ='-' and no_bukti='"+this.cb_rab.getText()+"' and kode_lokasi='"+this.app._lokasi+"' and modul='NTF_RAB' ");
					sql.add("insert into prb_proyek_app (no_app,tanggal,kode_lokasi,periode,nik_user,tgl_input,status,no_bukti,modul,no_appseb,catatan,no_rab,nik_app) values "+
							"('"+this.e_noapp.getText()+"','"+this.dp_d3.getDateString()+"','"+this.app._lokasi+"','"+this.periode+"','"+this.app._userLog+"',getdate(),'"+this.c_status.getText()+"','"+this.cb_kode.getText()+"','NTF_RAB','-','"+this.e_memo.getText()+"','"+this.cb_rab.getText()+"','-')");

					if (this.c_status.getText() == "APPROVE") {						
						sql.add("update prb_rabapp_m set progress='2',kode_proyek='"+this.cb_kode.getText()+"',no_appntf='"+this.e_noapp.getText()+"' where no_rab='"+this.cb_rab.getText()+"' and kode_lokasi='"+this.app._lokasi+"' ");

						sql.add("insert into prb_proyek(kode_proyek,nama,flag_aktif,kode_lokasi,no_pks,kode_pp,kode_cust,tgl_mulai,tgl_selesai,nilai,nilai_or,p_or,kode_jenis,nilai_ppn,pph42,jumlah,  nik_app,progress,no_app, tgl_app,modul,nik_buat, bank,nama_rek,no_rek, tgl_admin, pp_rab,versi) values "+
								"('"+this.cb_kode.getText()+"','"+this.e_nama.getText()+"','1','"+this.app._lokasi+"','"+this.e_dok.getText()+"','"+this.cb_pp.getText()+"','"+this.cb_cust.getText()+"','"+this.dp_d1.getDateString()+"','"+this.dp_d2.getDateString()+"',"+nilaiToFloat(this.e_nilai.getText())+
								","+nilaiToFloat(this.e_nilaior.getText())+","+nilaiToFloat(this.e_persenor.getText())+",'"+this.cb_jenis.getText()+"',"+nilaiToFloat(this.e_ppn.getText())+","+nilaiToFloat(this.e_pph4.getText())+","+nilaiToFloat(this.e_jumlah.getText())+",'-','0','-','"+this.dp_d3.getDateString()+"','PROYEK','"+this.app._userLog+"', '"+
								this.e_bank.getText()+"','"+this.e_namarek.getText()+"','"+this.e_norek.getText()+"','"+this.dp_d4.getDateString()+"','"+this.ppRAB+"','PRO20')"); 
					
						for (var i=0;i < this.sg.getRowCount();i++){
							if (this.sg.rowValid(i)){								
								sql.add("insert into prb_proyek_d(kode_proyek,kode_lokasi,nu,periode,nilai_pend,nilai_beban) values "+
										"('"+this.cb_kode.getText()+"','"+this.app._lokasi+"',"+i+",'"+this.sg.cells(0,i)+"',"+nilaiToFloat(this.sg.cells(1,i))+","+nilaiToFloat(this.sg.cells(2,i))+")");
							}
						}

						//delete data joincost yg pakai rab/update joincost rab [jurnal finalnya di form reklas joincost]						
						sql.add("delete from prb_prbeban_d where no_bukti='"+this.cb_rab.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
						var nilaiSCH = nilaiToFloat(this.sg.cells(2,0));
						for (var i=0;i < this.sg6.getRowCount();i++) {
							if (this.sg6.rowValid(i)) {							
								if (nilaiToFloat(this.sg6.cells(7,i)) != 0) {	
									sql.add("insert into prb_prbeban_d(no_bukti,kode_lokasi,periode,periode_sch,tanggal,kode_akun,kode_pp,kode_drk,keterangan,dc,nilai,tgl_input,kode_proyek,modul,no_ref1,jenis) values "+
											"('"+this.cb_rab.getText()+"','"+this.app._lokasi+"','"+this.sg.cells(0,0)+"','"+this.sg.cells(0,0)+"','"+this.dp_d1.getDateString()+"','-','"+this.cb_pp.getText()+"','-','"+this.e_nama.getText()+"','C',"+nilaiToFloat(this.sg6.cells(7,i))+",getdate(),'"+this.sg6.cells(2,i)+"','AJUBEBAN','-','NONITAJU')");
	
									var j=1000+i;		
									var nilaiBeban = nilaiBDD = 0;
									if (nilaiToFloat(this.sg6.cells(7,i)) > nilaiSCH) {
										nilaiBeban = nilaiSCH;
										nilaiBDD = nilaiToFloat(this.sg6.cells(7,i)) - nilaiSCH;
										nilaiSCH = 0;
	
										sql.add("insert into prb_prbeban_d(no_bukti,kode_lokasi,periode,periode_sch,tanggal,kode_akun,kode_pp,kode_drk,keterangan,dc,nilai,tgl_input,kode_proyek,modul,no_ref1,jenis) values "+
												"('"+this.cb_rab.getText()+"','"+this.app._lokasi+"','"+this.sg.cells(0,0)+"','"+this.sg.cells(0,0)+"','"+this.dp_d1.getDateString()+"','-','"+this.cb_pp.getText()+"','-','"+this.e_nama.getText()+"','D',"+nilaiBDD+",getdate(),'"+this.cb_kode.getText()+"','BDD','"+this.sg6.cells(0,i)+"','NONITAJU')");																
									}
									else {
										nilaiBeban = nilaiToFloat(this.sg6.cells(7,i));
										nilaiSCH = nilaiSCH - nilaiBeban;
									}
	
									if (nilaiBeban != 0) {
										//noref1 diisi dgn nomor agenda utk kontrol saldo agenda terpakai		
										sql.add("insert into prb_prbeban_d(no_bukti,kode_lokasi,periode,periode_sch,tanggal,kode_akun,kode_pp,kode_drk,keterangan,dc,nilai,tgl_input,kode_proyek,modul,no_ref1,jenis) values "+
												"('"+this.cb_rab.getText()+"','"+this.app._lokasi+"','"+this.sg.cells(0,0)+"','"+this.sg.cells(0,0)+"','"+this.dp_d1.getDateString()+"','-','"+this.cb_pp.getText()+"','-','"+this.e_nama.getText()+"','D',"+nilaiBeban+",getdate(),'"+this.cb_kode.getText()+"','AJUBEBAN','"+this.sg6.cells(0,i)+"','NONITAJU')");												
									}
								
								}
							}
						}

					}
					else {
						//prb_rabapp_m/d --> dihapus,karena loncat ke aju rab (ver rab tidak historiskrn 1 aju rab = 1 ver rab)
						//tidak bisa dikoreksi (data sudah di user aju)
						var vSts = "K";					 						
						sql.add("delete from prb_rabapp_m where no_rab='"+this.cb_rab.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
						sql.add("delete from prb_rabapp_d where no_rab='"+this.cb_rab.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
						sql.add("update prb_rab_m set progress='K',no_app_proyek='"+this.e_noapp.getText()+"' where no_rab ='"+this.cb_rab.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
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
	hapus: function(){			
		try{						
			if (this.standarLib.checkEmptyByTag(this, [0,1])){
				try {									
					uses("server_util_arrayList");
					var sql = new server_util_arrayList();
					sql.add("delete from prb_proyek where kode_proyek = '"+this.cb_kode.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");			
					sql.add("delete from prb_proyek_d where kode_proyek = '"+this.cb_kode.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");													
					sql.add("update prb_rabapp_m set progress='1',kode_proyek='-',no_appntf='-' where no_rab='"+this.cb_rab.getText()+"' and kode_lokasi='"+this.app._lokasi+"' ");														
					sql.add("delete from prb_proyek_app where no_app='"+this.noAppLama+"' and kode_lokasi='"+this.app._lokasi+"'");
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
					this.doClick();
					this.stsSimpan = 1;				
					this.e_memo.clear();
					this.sg.clear(1);
					this.sg1mp2.clear(1);
					this.sg3.clear(1);
					this.sgr.clear(1);					
					this.pc1.setActivePage(this.pc1.childPage[0]);	
					this.noAppLama = "-";		
					this.doLoadlistRAB();			
				break;
			case "simpan" :	
			case "ubah" :								
					if (this.c_status.getText() == "APPROVE") {							
						var tot = totb = 0;
						for (var i = 0; i < this.sg.getRowCount();i++){
							if (this.sg.rowValid(i) && this.sg.cells(1,i) != ""){										
								tot += nilaiToFloat(this.sg.cells(1,i));
								totb += nilaiToFloat(this.sg.cells(2,i));					
							}
						}	
						var d = new Date();
						var d1 = d.strToDate(this.dp_d1.getText());
						var d2 = d.strToDate(this.dp_d2.getText());
						var d4 = d.strToDate(this.dp_d4.getText());
						
						if (d1 > d2) {
							system.alert(this,"Tgl Proyek tidak valid.","Tanggal Mulai harus lebih awal dari Tanggal Selesai");
							return false;
						}
						if (d1 > d4) {						
							system.alert(this,"Tgl Max Administrasi tidak valid.","Tgl Max Administrasi tidak boleh lebih awal dari Tgl Mulai Proyek");
							return false;
						}		

						this.app._periode = this.dbLib.getPeriode(this.app._lokasi);
						if (parseFloat(this.app._periode) > parseFloat(this.periode)){
							system.alert(this,"Periode transaksi tidak valid.","Periode transaksi tidak boleh kurang dari periode aktif sistem.["+this.app._periode+"]");
							return false;
						}
						
						this.app._periode = this.dbLib.getPeriode(this.app._lokasi);				
						for (var i=0;i < this.sg.getRowCount();i++){
							if (this.sg.rowValid(i)) {									
								if (this.sg.cells(0,i) < this.app._periode) {	
									system.alert(this,"Periode Schedule tidak valid.","Periode Schedule "+this.sg.cells(0,i)+" tidak boleh kurang dari periode aktif sistem.["+this.app._periode+"]");
									return false;
								}
							}
						}
						if (nilaiToFloat(this.e_nilaior.getText()) < nilaiToFloat(this.e_join.getText())) {
							system.alert(this,"Nilai JoinCost tidak valid.","Nilai JoinCost melebihi Nilai OR.");
							return false;
						}
						if (tot != nilaiToFloat(this.e_nilai.getText())) {
							system.alert(this,"Nilai Proyek tidak valid.","Nilai Proyek dan Total Pendapatan tidak sama.");
							return false;
						}
						if (totb  != nilaiToFloat(this.e_nilaior.getText())) {
							system.alert(this,"Nilai Proyek tidak valid.","Nilai OR dan Total Beban tidak sama.");
							return false;
						}						
						if (this.e_bank.getText() == "-" || this.e_namarek.getText() == "-" || this.e_norek.getText() == "-") {
							system.alert(this,"Data Bank dan Rekening tidak valid.","Data bank dan rekening tidak boleh '-' (strip)");
							return false;
						}
						if (this.sg6.getRowCount() > 0 && this.sg6.rowValid(0)) {
							system.confirm(this, "simpancek", "Terdapat data Saldo Inisiasi","Data yakin akan disimpan?");					
						}			
						else this.simpan();
					}
					else this.simpan();
				break;				
			case "simpancek" : this.simpan();			
				break;
							
			case "hapus" :					
				var totbaru = nilaiToFloat(this.e_nilai.getText()) + nilaiToFloat(this.e_ppn.getText());
				if (totbaru < this.nilaipiu) {
					system.alert(this,"Nilai Proyek tidak valid.","Nilai Proyek kurang dari piutang yang telah di akru (PYT).");
					return false;
				}
				else this.hapus();
				break;				
		}
	},
	doSelectDate: function(sender, y,m,d){
		if (m < 10) m = "0" + m;			
		this.periode = y+""+m;	
		if (this.stsSimpan==1) this.doClick();		
	},
	doSelectDate2: function(sender, y,m,d){		
		var strSQL = "select datediff(month,'"+this.dp_d1.getDateString()+"','"+this.dp_d2.getDateString()+"') + 1  as jml ";																																	 
		var data = this.dbLib.getDataProvider(strSQL,true);
		if (typeof data == "object"){
			var line = data.rs.rows[0];							
			if (line != undefined){														
				this.e_jumlah.setText(floatToNilai(line.jml));								
			}
		}																												 					
	},
	doClick:function(sender){		
		try {
			if (this.stsSimpan==0) {
				this.sg1mp2.clear(1);
				this.cb_rab.setText("");					
				this.sgr.clear(1);		
				this.sg.clear(1);	
				this.noAppLama = "-";
			}
			setTipeButton(tbSimpan);
			this.e_noapp.setText(this.standarLib.noBuktiOtomatis(this.dbLib,"prb_proyek_app","no_app",this.app._lokasi+"-AP"+this.periode.substr(2,4)+".","0000"));				
			this.cb_kode.setText(this.standarLib.noBuktiOtomatis(this.dbLib,"prb_proyek","kode_proyek",this.cb_pp.getText()+"-"+this.periode.substr(2,4)+".","0000"));						
			this.e_dok.setFocus();	
			this.stsSimpan = 1;		
		}
		catch(e) {
			alert(e);
		}
	},					
	doChange: function(sender){
		try{			
			if (sender == this.cb_pp && this.cb_pp.getText() != "" && this.stsSimpan==1) {
				this.doClick();
			}			
			if (sender == this.e_persenor && this.e_persenor.getText() != "") {				
				var nilaiOR = Math.round(nilaiToFloat(this.e_nilai.getText()) * nilaiToFloat(this.e_persenor.getText())/100);
				this.e_nilaior.setText(floatToNilai(nilaiOR));
			}				
		}catch(e){
			systemAPI.alert(e);
		}
	},		
	doChangeCell6: function(sender, col, row){
		if (col == 7 && this.sg6.cells(7,row) != "") this.sg6.validasi();				
	},
	doNilaiChange6: function(){
		try{
			var tot = 0;
			for (var i = 0; i < this.sg6.getRowCount();i++){
				if (this.sg6.cells(7,i) != ""){
					tot += nilaiToFloat(this.sg6.cells(7,i));					
				}
			}						
			this.e_join.setText(floatToNilai(tot));			
		}catch(e)
		{
			alert("doNilaiChange6:"+e);
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
		var strSQL = "select a.no_app,convert(varchar,a.tanggal,103) as tanggal,a.no_bukti "+
					 "from prb_proyek_app a "+
					 "left join ( "+
					 "select x.no_appntf,x.kode_lokasi from prb_rabapp_m x inner join prb_proyek y on x.kode_proyek=y.kode_proyek and x.kode_lokasi=y.kode_lokasi and y.versi='PRO20' where x.kode_lokasi='"+this.app._lokasi+"' and y.progress not in ('0','R') "+
					 ") b on a.no_app=b.no_appntf and a.kode_lokasi=b.kode_lokasi "+
					 "where a.kode_lokasi='"+this.app._lokasi+"' and b.no_appntf is null and a.modul='NTF_RAB' and a.no_appseb='-' and a.status <> 'RETURN' ";	
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
			this.sg3.appendData([line.no_app,line.tanggal,line.no_bukti,"Pilih"]); 
		}
		this.sg3.setNoUrut(start);
	},
	doPager3: function(sender, page) {
		this.doTampilData3(page);
	},
	doSgBtnClick3: function(sender, col, row){
		try{
			if (col === 3) this.doDoubleClick3(this.sg3,0,row);						
		}catch(e){
			alert(e);
		}
	},
	doDoubleClick3: function(sender, col , row) {
		try{
			if (this.sg3.cells(0,row) != "") {										
				this.stsSimpan = 0;							
				setTipeButton(tbUbahHapus);			

				this.pc2.setActivePage(this.pc2.childPage[0]);																		
				this.pc1.setActivePage(this.pc1.childPage[2]);																						
				this.e_noapp.setText(this.sg3.cells(0,row));	
				this.noAppLama = this.sg3.cells(0,row);

				var strSQL = "select a.tanggal,a.status,a.catatan,b.no_rab,isnull(b.kode_pp,'') as kode_pp,isnull(b.kode_proyek,'') as kode_proyek "+
							 			 "from prb_proyek_app a left join prb_rabapp_m b on a.no_app=b.no_appntf and a.kode_lokasi=b.kode_lokasi "+
							 			 "where a.no_app='"+this.e_noapp.getText()+"' and a.kode_lokasi='"+this.app._lokasi+"' ";
				var data = this.dbLib.getDataProvider(strSQL,true);
				if (typeof data == "object"){
					var line = data.rs.rows[0];							
					if (line != undefined) {	
						this.dp_d3.setText(line.tanggal);
						this.c_status.setText(line.status);
						this.e_memo.setText(line.catatan);

						if (this.c_status.getText() == "APPROVE") {
							this.cb_rab.setText(line.no_rab);
							this.cb_kode.setText(line.kode_proyek);
						}
					}
				}

				var strSQL = "select a.* from prb_proyek a where a.kode_proyek ='"+this.cb_kode.getText()+"' and a.kode_lokasi='"+this.app._lokasi+"'";						   
				var data = this.dbLib.getDataProvider(strSQL,true);
				if (typeof data == "object"){
					var line = data.rs.rows[0];							
					if (line != undefined){		
						this.ppRAB = line.pp_rab;
						this.e_nama.setText(line.nama);
						this.e_dok.setText(line.no_pks);						
						this.cb_pp.setText(line.kode_pp);
						this.cb_cust.setText(line.kode_cust);												
						this.dp_d1.setText(line.tgl_mulai);
						this.dp_d2.setText(line.tgl_selesai);	
						this.dp_d4.setText(line.tgl_admin);						
						this.e_nilai.setText(floatToNilai(line.nilai));						
						this.e_persenor.setText(floatToNilai(line.p_or));
						this.e_nilaior.setText(floatToNilai(line.nilai_or));
						this.e_ppn.setText(floatToNilai(line.nilai_ppn));
						this.e_pph4.setText(floatToNilai(line.pph42));

						this.e_bank.setText(line.bank);
						this.e_namarek.setText(line.nama_rek);
						this.e_norek.setText(line.no_rek);
						
						this.doSelectDate(this.dp_d3,this.dp_d3.year,this.dp_d3.month,this.dp_d3.day);
						this.cb_jenis.setText(line.kode_jenis);
						this.e_jumlah.setText(floatToNilai(line.jumlah));
						
						var data = this.dbLib.getDataProvider("select * from prb_proyek_d where kode_proyek = '"+this.cb_kode.getText()+"' and kode_lokasi='"+this.app._lokasi+"' order by nu",true);
						if (typeof data == "object" && data.rs.rows[0] != undefined){
							var line;
							this.sg.clear();
							for (var i in data.rs.rows){
								line = data.rs.rows[i];												
								this.sg.appendData([line.periode,floatToNilai(line.nilai_pend),floatToNilai(line.nilai_beban)]);
							}
						} 
						else this.sg.clear(1);	
						
						var strSQL = "select no_rab,kode_pp from prb_rabapp_m where kode_proyek='"+this.cb_kode.getText()+"' and kode_lokasi='"+this.app._lokasi+"' ";
						var data = this.dbLib.getDataProvider(strSQL,true);
						if (typeof data == "object"){
							var line = data.rs.rows[0];							
							if (line != undefined){									
								this.cb_rab.setText(line.no_rab);

								var data2 = this.dbLib.getDataProvider("select * from prb_rabapp_d where no_rab = '"+this.cb_rab.getText()+"' and kode_lokasi='"+this.app._lokasi+"' order by jenis desc,nu",true);
								if (typeof data2 == "object" && data2.rs.rows[0] != undefined){
									var line;
									this.sgr.clear();
									for (var i in data2.rs.rows){
										line = data2.rs.rows[i];												
										this.sgr.appendData([line.keterangan,floatToNilai(line.jumlah),floatToNilai(line.harga),floatToNilai(line.total),line.jenis]);
									}
								} 
								else this.sgr.clear(1);				
								
								this.sg1mp2.clear();
								var data2 = this.dbLib.getDataProvider(
										"select b.kode_jenis,b.nama,a.no_gambar from prb_rab_dok a inner join prb_dok_jenis b on a.kode_jenis=b.kode_jenis and a.kode_lokasi=b.kode_lokasi "+
										"where a.no_rab = '"+this.cb_rab.getText()+"' and a.kode_lokasi='"+this.app._lokasi+"' order by a.nu",true);
																	
								if (typeof data2 == "object" && data2.rs.rows[0] != undefined){
									var line2;
									this.sg1mp2.clear();
									for (var i in data2.rs.rows){
										line2 = data2.rs.rows[i];										
										this.sg1mp2.appendData([line2.kode_jenis, line2.nama, line2.no_gambar, "DownLoad"]);
									}
								} else this.sg1mp2.clear(1);
								
							}					
						}						
					}					
				}

			}									
		} catch(e) {alert(e);}
	},
	doLoadCtt: function(kode){
		try{
			var strSQL = "select distinct convert(varchar,tanggal,103) as tgl,tanggal from prb_proyek_app "+
						 			 "where no_rab='"+kode+"' and kode_lokasi='"+this.app._lokasi+"' and no_app<>'"+this.noAppLama+"' "+
									 "order by convert(varchar,tanggal,103) desc";	
			
			var Html = "<link rel='stylesheet' type='text/css' href='bs/css/bootstrap.min.css'/>"+
			"<link rel='stylesheet' type='text/css' href='server/bs/css/AdminLTE.min.css'>"+
			"<link rel='stylesheet' type='text/css' href='server/bs/css/font-awesome.css'/>"+
			"<link rel='stylesheet' type='text/css' href='server/bs/css/ionicons.css'/>"+
			"<link rel='stylesheet' type='text/css' href='server/bs/css/sai.css'/>"+
			"<script type='text/javascript' src='server/bs/js/jquery.min.js'></script>"+
			"<script type='text/javascript' src='server/bs/js/bootstrap.min.js'></script>"+
			"<div style='padding-top: 10px;padding-left: 10px;max-height: 300px;margin-right:0px' class='row sai-container-overflow'>"+
			"<div class='col-md-6'>"+
			"  <ul class='timeline' style='padding-bottom:10px'>";
		
			var data = this.dbLib.getDataProvider(strSQL,true);
			if (typeof data == "object" && data.rs.rows[0] != undefined){
				var line;
				for (var i in data.rs.rows){
					line = data.rs.rows[i];	
					var strSQL2 = "select catatan,no_app, convert(varchar,tanggal,103) as tgl,tanggal, convert(varchar,tgl_input,108) as jam,nik_user "+
											  "from prb_proyek_app "+
												"where no_rab='"+kode+"' and tanggal='"+line.tanggal+"' and kode_lokasi='"+this.app._lokasi+"' and no_app<>'"+this.noAppLama+"' "+
												"order by tanggal desc,convert(varchar,tgl_input,108) desc ";	
												
					var outerHtml2 = "";
					var data2 = this.dbLib.getDataProvider(strSQL2,true);
					if (typeof data2 == "object" && data.rs.rows[0] != undefined){
						var line2;
						for (var x in data2.rs.rows){
							line2 = data2.rs.rows[x];	
							outerHtml2 += "<!-- timeline item -->"+
							"    <li>"+
							"      <i class='fa fa-envelope bg-blue'></i>"+
							"      <div class='timeline-item' style='box-sizing: border-box;border: 1px solid #dedcdc;'>"+
							"        <span class='time'><i class='fa fa-clock-o'></i>"+line2.jam+"</span>"+
							"        <h3 class='timeline-header'>"+line2.no_app+" - ["+line2.nik_user+"]</h3>"+
							"        <div class='timeline-body' style='box-sizing: border-box;'>"+line2.catatan+
							"        </div>"+
							"        <div class='timeline-footer' style='box-sizing: border-box;'>"+
							"        </div>"+
							"      </div>"+
							"    </li>"+
							"    <!-- END timeline item -->";
						}
					}		

					Html +=
					"    <li class='time-label'>"+
					"          <span class='bg-red'>"+line.tgl+"          </span>"+
					"    </li>"+
					"    <!-- /.timeline-label -->"+outerHtml2;
				}

				Html +="<li>"+
									"		<i class='fa fa-clock-o bg-gray'></i>"+
									"</li>"+
									"</ul>"+
							"</div>"+
				"<!-- /.col -->"+
				"</div>";

			}else{
				Html += "Catatan tidak ditemukan";
		  }
	
		this.sgctt.setInnerHTML(Html);
		}catch(e) {alert(e);}
					
	}
});