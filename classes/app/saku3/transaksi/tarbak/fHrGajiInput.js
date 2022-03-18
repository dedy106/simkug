window.app_saku3_transaksi_tarbak_fHrGajiInput = function(owner)
{
	if (owner)
	{
		window.app_saku3_transaksi_tarbak_fHrGajiInput.prototype.parent.constructor.call(this,owner);
		this.className  = "app_saku3_transaksi_tarbak_fHrGajiInput";
		this.itemsValue = new arrayList();
		this.app._mainForm.childFormConfig(this, "mainButtonClick","Data Input Proses", 0);	
		
		uses("portalui_uploader;saiCBBL;saiEdit;datePicker;saiGrid;sgNavigator;pageControl;checkBox");
		uses("saiGrid",true);
		this.l_tgl = new portalui_label(this,{bound:[20,11,100,18],caption:"Tanggal - Periode", underline:true});
		this.dp_d1 = new portalui_datePicker(this,{bound:[120,11,100,18],selectDate:[this,"doSelectDate"],date:new Date().getDateStr()}); 		
		this.e_periode = new portalui_saiLabelEdit(this,{bound:[230,11,80,20],caption:"",tag:2,readOnly:true,change:[this,"doChange"],labelWidth:0});
		
		this.pc1 = new pageControl(this,{bound:[20,12,1000,430], childPage:["Daftar Proses","Input Proses"]});				
		this.sg1 = new saiGrid(this.pc1.childPage[0],{bound:[1,5,this.pc1.width-5,this.pc1.height-33],colCount:3,tag:9,
		             colTitle:["No Bukti","Tanggal","Deskripsi"],
					 colWidth:[[2,1,0],[400,100,100]],readOnly:true,
					 dblClick:[this,"doDoubleClick3"],autoAppend:false,defaultRow:1});			
		this.sgn1 = new portalui_sgNavigator(this.pc1.childPage[0],{bound:[1,this.pc1.height-25,this.pc1.width-1,25],buttonStyle:3,grid:this.sg1,pager:[this,"doPager"]});
				
		this.e_nb = new portalui_saiLabelEdit(this.pc1.childPage[1],{bound:[20,12,200,20],caption:"No Bukti",maxLength:30,readOnly:true});
		this.i_gen = new portalui_imageButton(this.pc1.childPage[1],{bound:[225,12,20,20],hint:"Generate",image:"icon/"+system.getThemes()+"/tabCont2.png",click:[this,"doClick"]});
		this.e_ket = new saiLabelEdit(this.pc1.childPage[1],{bound:[20,14,450,20],caption:"Deskripsi", maxLength:150});
		this.bProses = new button(this.pc1.childPage[1],{bound:[890,14,80,20],caption:"Proses",click:[this,"doProses"]});			

		this.pc2 = new pageControl(this.pc1.childPage[1],{bound:[2,12,993,350], childPage:["Input","Proses","Error Msg"]});				
		this.sg = new portalui_saiGrid(this.pc2.childPage[0],{bound:[1,5,this.pc2.width-5,this.pc2.height-33],colCount:15,tag:9,
				colTitle:["NIP","Prestasi","Jml Hari","Jam","Hari Libur","Dinas Luar","Tidak Hadir","Jam Dosen","Jam KJM","Jam Lembur","Jam Inval",
						  "Jam Pmantapn","Jam Remedial","Jam Ekskul","Jam KRS"],
				colWidth:[[14,13,12,11,10,9,8,7,6,5,4,3,2,1,0],[100,100,100,100,100,100,100,100,100,100,100,100,100,80,80]],
				colFormat:[[2,3,4,5,6,7,8,9,10,11,12,13,14],[cfNilai,cfNilai,cfNilai,cfNilai,cfNilai,cfNilai,cfNilai,cfNilai,cfNilai,cfNilai,cfNilai,cfNilai,cfNilai]],
				pasteEnable:true,autoPaging:true,rowPerPage:20,afterPaste:[this,"doAfterPaste"],
				readOnly:true, defaultRow:1
		});		
		this.sgn = new portalui_sgNavigator(this.pc2.childPage[0],{bound:[0,this.pc2.height-25,this.pc2.width-1,25],buttonStyle:3, grid:this.sg, pager:[this,"doPage"]});		
			
		this.sg4 = new portalui_saiGrid(this.pc2.childPage[1],{bound:[1,5,this.pc2.width-5,this.pc2.height-33],colCount:45,tag:9,
				colTitle:["NIP","Nama","Unit","Status","Nama Status","Golongan","MK Gol","MK YTB","Sts Pajak", //9
						  "Gaji/Honor","Insentif","Tunj Jab","Tunj WK","Tunj Koordinator","Tunj MK YTB","Tunj Pengabdian","10% PSP","Peny. UMK","Tunj Pengikat", //19
						  "KJM","THR","Rapel","Bruto", //23
						  "KJM Dosen","Honor Kls Sore","Transport","Konsumsi","Ketidakhadiran","IJHT","BPJS","JP","Lembur","Inval","Pemantapan","Remedial","Ekskul","Lbr/Inv/Pmtp/Rem","Netto", //38
						  "Pajak","Potongan","Biaya Bank","Penerimaan","Pendapatan","Potongan","Dibayarkan"],	//45					  
				colWidth:[[44,43,42,41,40,39,38,  37,36,35,34,33,32,31,30,29,28,27,26,25,24,23,  22,21,20,19, 18,17,16,15,14,13,12,11,10,9,  8,7,6,5,4,3,2,1,0],[ 100,100,100,100,100,100, 100,100,100,100,100,100,100,100,100,100, 100,100,100,100,100,100,100,100,100,100, 100,100,100,100,100,100,100,100,100,100,  80,80,80,80,100,80,80,150,80]],				
				colFormat:[[9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30, 31,32,33,34,35,36,37,38,39,40,41,42,43,44],[cfNilai,cfNilai,cfNilai,cfNilai,cfNilai,cfNilai,cfNilai,cfNilai,cfNilai,cfNilai,cfNilai,cfNilai,cfNilai,cfNilai,cfNilai,cfNilai,cfNilai,cfNilai,cfNilai,cfNilai,cfNilai,cfNilai,cfNilai,cfNilai,cfNilai,cfNilai,cfNilai,cfNilai,cfNilai,cfNilai,cfNilai,cfNilai,cfNilai,cfNilai,cfNilai,cfNilai]],
				readOnly:true, defaultRow:1,autoAppend:false
		});		
		this.sgn4 = new portalui_sgNavigator(this.pc2.childPage[1],{bound:[0,this.pc2.height-25,this.pc2.width-1,25],buttonStyle:bsAll, grid:this.sg4});		
		
		this.sg2 = new portalui_saiGrid(this.pc2.childPage[2],{bound:[1,5,this.pc2.width-5,this.pc2.height-35],colCount:1,tag:9,
				colTitle:["Baris INVALID"],
				colWidth:[[0],[200]],autoAppend:false,
				readOnly:true, defaultRow:1
		});		
		this.sgn2 = new portalui_sgNavigator(this.pc2.childPage[2],{bound:[0,this.pc2.height-25,this.pc2.width-1,25],buttonStyle:3, grid:this.sg2, pager:[this,"doPage2"]});		

		
		this.rearrangeChild(10, 23);
		this.pc1.childPage[1].rearrangeChild(10, 23);		
		
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
			
			this.doLoad();
		}catch(e){
			systemAPI.alert(e);
		}
	}
};
window.app_saku3_transaksi_tarbak_fHrGajiInput.extend(window.childForm);
window.app_saku3_transaksi_tarbak_fHrGajiInput.implement({
	doValidasi: function() {		
		var data = this.dbLib.getDataProvider("select nik from hr_karyawan where kode_lokasi='"+this.app._lokasi+"'",true);
		if (typeof data == "object" && data.rs.rows[0] != undefined){
			this.dataNIK = data;
		}	

		this.inValid = false;
		for (var i=0; i < this.sg.getRowCount();i++){
			this.sg.cells(0,i,"INVALID|"+this.sg.cells(0,i));			
			
			if (this.dataNIK.rs.rows.length > 0) {
				for (var j=0;j < this.dataNIK.rs.rows.length;j++){				
					if (this.sg.cells(0,i).substr(8,10) == this.dataNIK.rs.rows[j].nik) {
						this.sg.cells(0,i,this.sg.cells(0,i).substr(8,10));									
					}													
				}	
				if (this.sg.cells(0,i).substr(0,7) == "INVALID") this.inValid = true;							
			}			
		}	
		if (this.inValid == false) {
			setTipeButton(tbSimpan);	
			this.stsSimpan=2;

			uses("server_util_arrayList");
			var sql = new server_util_arrayList();												
			sql.add("delete from hr_gaji_input where no_bukti='"+this.app._userLog+"' and kode_lokasi ='"+this.app._lokasi+"'");			
			sql.add("delete from hr_gaji_proses where no_bukti='"+this.app._userLog+"' and kode_lokasi ='"+this.app._lokasi+"'");			
			this.dbLib.execQuerySync(sql);			
			
			for (var i=0;i < this.sg.getRowCount();i++){
				if (this.sg.rowValid(i)) {			
					sql.add("insert into hr_gaji_input (no_bukti,nik,kode_lokasi,periode,prestasi,jml_hari,jam,hari_libur,dinas_luar,absen,jam_dosen,jam_kjm,jam_lembur,jam_inval,jam_mantap,jam_remed,jam_ekskul,jam_krs) values "+
							"('"+this.app._userLog+"','"+this.sg.cells(0,i)+"','"+this.app._lokasi+"','"+this.e_periode.getText()+"','"+this.sg.cells(1,i)+"',"+nilaiToFloat(this.sg.cells(2,i))+","+nilaiToFloat(this.sg.cells(3,i))+","+nilaiToFloat(this.sg.cells(4,i))+","+nilaiToFloat(this.sg.cells(5,i))+","+nilaiToFloat(this.sg.cells(6,i))+","+nilaiToFloat(this.sg.cells(7,i))+","+nilaiToFloat(this.sg.cells(8,i))+","+nilaiToFloat(this.sg.cells(9,i))+","+nilaiToFloat(this.sg.cells(10,i))+","+nilaiToFloat(this.sg.cells(11,i))+","+nilaiToFloat(this.sg.cells(12,i))+","+nilaiToFloat(this.sg.cells(13,i))+","+nilaiToFloat(this.sg.cells(14,i))+")");								
				}
			}
			this.dbLib.execArraySQL(sql);	
			this.pc2.setActivePage(this.pc2.childPage[1]);	
			
		}
		else {			
			this.pc2.setActivePage(this.pc2.childPage[2]);	
			this.sg2.clear();
			for (var i=0; i < this.sg.getRowCount();i++) {
				if (this.sg.cells(0,i).substr(0,7) == "INVALID") {
					var j = i+1;
					this.sg2.appendData([j]);						
				}
			}
		}
	},
	doAfterPaste: function(sender,totalRow){
		try {
			this.sgn.setTotalPage(sender.getTotalPage());
			this.sgn.rearrange();	
			this.doValidasi();
		} catch(e) {alert(e);}
	},
	doPage: function(sender,page){
		this.sg.doSelectPage(page);
	},	
	doProses: function(sender){
		try {		
			var sql = "call sp_gaji_proses ('"+this.app._lokasi+"','"+this.e_periode.getText()+"','"+this.app._userLog+"')";
			this.dbLib.execQuerySync(sql);

			var strSQL = "select a.*,a.pdpt-a.totpot as bayar,b.nama,c.nama as nama_sdm "+
						 "from hr_gaji_proses a "+
						 "inner join hr_karyawan b on a.nik=b.nik and a.kode_lokasi=b.kode_lokasi "+
						 "inner join hr_sdm c on a.kode_sdm=c.kode_sdm and a.kode_lokasi=c.kode_lokasi "+ 
						 "where a.kode_lokasi='"+this.app._lokasi+"' and a.no_bukti='"+this.app._userLog+"' and a.periode='"+this.e_periode.getText()+"' "+
						 "order by a.kode_unit desc,a.nik ";
			var data = this.dbLib.getDataProvider(strSQL,true);			
			if (typeof data == "object" && data.rs.rows[0] != undefined){
				var line;
				this.sg4.clear();
				for (var i in data.rs.rows){
					line = data.rs.rows[i];												
					this.sg4.appendData([
						line.nik,line.nama,line.kode_unit,line.kode_sdm,line.nama_sdm,line.kode_gol,line.mk_gol,line.mk_ytb,line.kode_pajak,
						Math.round(line.gaji),Math.round(line.ins),Math.round(line.tjab),Math.round(line.twk),Math.round(line.tkoor),Math.round(line.tytb),Math.round(line.tabdi),
						Math.round(line.psp),Math.round(line.umk),Math.round(line.ikat),			
						Math.round(line.kjm),Math.round(line.thr),Math.round(line.rapel),Math.round(line.bruto),						
						Math.round(line.kjmdosen),Math.round(line.hsore),Math.round(line.trans),Math.round(line.konsumsi),
						Math.round(line.alpa),Math.round(line.ijht),Math.round(line.bpjs),Math.round(line.jp),
						Math.round(line.lembur),Math.round(line.inval),Math.round(line.mantap),Math.round(line.remed),
						Math.round(line.ekskul),Math.round(line.totlimr),Math.round(line.netto),						
						Math.round(line.pajak),Math.round(line.pot),Math.round(line.bbank),Math.round(line.terima),
						Math.round(line.pdpt),Math.round(line.totpot),Math.round(line.bayar)]);
				}
			} else this.sg4.clear(1);							
		}
		catch(e) {
			alert(e);
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

					sql.add("insert into hr_gaji_m(no_gaji,kode_lokasi,periode,tanggal,keterangan,nik_buat,nik_app,posted,tgl_transfer,tgl_input,nik_user) values "+
						    "('"+this.e_nb.getText()+"','"+this.app._lokasi+"','"+this.e_periode.getText()+"','"+this.dp_d1.getDateString()+"','"+this.e_ket.getText()+"','"+this.app._userLog+"','"+this.app._userLog+"','F','"+this.dp_d1.getDateString()+"',getdate(),'"+this.app._userLog+"')");					
					
					sql.add("update hr_gaji_input set no_bukti='"+this.e_nb.getText()+"' where no_bukti='"+this.app._userLog+"' and periode='"+this.e_periode.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
					sql.add("update hr_gaji_proses set no_bukti='"+this.e_nb.getText()+"' where no_bukti='"+this.app._userLog+"' and periode='"+this.e_periode.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");


					sql.add("insert into hr_gaji_d(no_gaji,nik,kode_param,kode_lokasi,kode_akun,periode,nilai,dc) "+
						"select a.no_bukti,a.nik,'GHON',a.kode_lokasi,b.kode_akun,a.periode,a.gaji,b.dc "+
						"from hr_gaji_proses a inner join hr_gaji_param b on b.kode_param = 'GHON' and a.kode_lokasi=b.kode_lokasi "+
						"where a.no_bukti = '"+this.e_nb.getText()+"' and a.kode_lokasi='"+this.app._lokasi+"' "+
						"union "+

						"select a.no_bukti,a.nik,'INS',a.kode_lokasi,b.kode_akun,a.periode,a.ins,b.dc "+
						"from hr_gaji_proses a inner join hr_gaji_param b on b.kode_param = 'INS' and a.kode_lokasi=b.kode_lokasi "+
						"where a.no_bukti = '"+this.e_nb.getText()+"' and a.kode_lokasi='"+this.app._lokasi+"' "+
						"union "+

						"select a.no_bukti,a.nik,'TJAB',a.kode_lokasi,b.kode_akun,a.periode,a.tjab,b.dc "+
						"from hr_gaji_proses a inner join hr_gaji_param b on b.kode_param = 'TJAB' and a.kode_lokasi=b.kode_lokasi "+
						"where a.no_bukti = '"+this.e_nb.getText()+"' and a.kode_lokasi='"+this.app._lokasi+"' "+
						"union "+

						"select a.no_bukti,a.nik,'TWALI',a.kode_lokasi,b.kode_akun,a.periode,a.twali,b.dc "+
						"from hr_gaji_proses a inner join hr_gaji_param b on b.kode_param = 'TWALI' and a.kode_lokasi=b.kode_lokasi "+
						"where a.no_bukti = '"+this.e_nb.getText()+"' and a.kode_lokasi='"+this.app._lokasi+"' "+
						"union "+

						"select a.no_bukti,a.nik,'TKOR',a.kode_lokasi,b.kode_akun,a.periode,a.tkor,b.dc "+
						"from hr_gaji_proses a inner join hr_gaji_param b on b.kode_param = 'TKOR' and a.kode_lokasi=b.kode_lokasi "+
						"where a.no_bukti = '"+this.e_nb.getText()+"' and a.kode_lokasi='"+this.app._lokasi+"' "+
						"union "+

						"select a.no_bukti,a.nik,'TYTB',a.kode_lokasi,b.kode_akun,a.periode,a.tytb,b.dc "+
						"from hr_gaji_proses a inner join hr_gaji_param b on b.kode_param = 'TYTB' and a.kode_lokasi=b.kode_lokasi "+
						"where a.no_bukti = '"+this.e_nb.getText()+"' and a.kode_lokasi='"+this.app._lokasi+"' "+
						"union "+

						"select a.no_bukti,a.nik,'TABDI',a.kode_lokasi,b.kode_akun,a.periode,a.tabdi,b.dc "+
						"from hr_gaji_proses a inner join hr_gaji_param b on b.kode_param = 'TABDI' and a.kode_lokasi=b.kode_lokasi "+
						"where a.no_bukti = '"+this.e_nb.getText()+"' and a.kode_lokasi='"+this.app._lokasi+"' "+
						"union "+

						"select a.no_bukti,a.nik,'PSP',a.kode_lokasi,b.kode_akun,a.periode,a.psp,b.dc "+
						"from hr_gaji_proses a inner join hr_gaji_param b on b.kode_param = 'PSP' and a.kode_lokasi=b.kode_lokasi "+
						"where a.no_bukti = '"+this.e_nb.getText()+"' and a.kode_lokasi='"+this.app._lokasi+"' "+
						"union "+

						"select a.no_bukti,a.nik,'PUMK',a.kode_lokasi,b.kode_akun,a.periode,a.pumk,b.dc "+
						"from hr_gaji_proses a inner join hr_gaji_param b on b.kode_param = 'PUMK' and a.kode_lokasi=b.kode_lokasi "+
						"where a.no_bukti = '"+this.e_nb.getText()+"' and a.kode_lokasi='"+this.app._lokasi+"' "+
						"union "+

						"select a.no_bukti,a.nik,'TIKAT',a.kode_lokasi,b.kode_akun,a.periode,a.ikat,b.dc "+
						"from hr_gaji_proses a inner join hr_gaji_param b on b.kode_param = 'TIKAT' and a.kode_lokasi=b.kode_lokasi "+
						"where a.no_bukti = '"+this.e_nb.getText()+"' and a.kode_lokasi='"+this.app._lokasi+"' "+
						"union "+

						"select a.no_bukti,a.nik,'KJM',a.kode_lokasi,b.kode_akun,a.periode,a.kjm,b.dc "+
						"from hr_gaji_proses a inner join hr_gaji_param b on b.kode_param = 'KJM' and a.kode_lokasi=b.kode_lokasi "+
						"where a.no_bukti = '"+this.e_nb.getText()+"' and a.kode_lokasi='"+this.app._lokasi+"' "+
						"union "+

						"select a.no_bukti,a.nik,'THR',a.kode_lokasi,b.kode_akun,a.periode,a.thr,b.dc "+
						"from hr_gaji_proses a inner join hr_gaji_param b on b.kode_param = 'THR' and a.kode_lokasi=b.kode_lokasi "+
						"where a.no_bukti = '"+this.e_nb.getText()+"' and a.kode_lokasi='"+this.app._lokasi+"' "+
						"union "+

						"select a.no_bukti,a.nik,'RPL',a.kode_lokasi,b.kode_akun,a.periode,a.rpl,b.dc "+
						"from hr_gaji_proses a inner join hr_gaji_param b on b.kode_param = 'RPL' and a.kode_lokasi=b.kode_lokasi "+
						"where a.no_bukti = '"+this.e_nb.getText()+"' and a.kode_lokasi='"+this.app._lokasi+"' "+
						"union "+

						"select a.no_bukti,a.nik,'KJMDOS',a.kode_lokasi,b.kode_akun,a.periode,a.kjmdosen,b.dc "+
						"from hr_gaji_proses a inner join hr_gaji_param b on b.kode_param = 'KJMDOS' and a.kode_lokasi=b.kode_lokasi "+
						"where a.no_bukti = '"+this.e_nb.getText()+"' and a.kode_lokasi='"+this.app._lokasi+"' "+
						"union "+

						"select a.no_bukti,a.nik,'HNSORE',a.kode_lokasi,b.kode_akun,a.periode,a.hsore,b.dc "+
						"from hr_gaji_proses a inner join hr_gaji_param b on b.kode_param = 'HNSORE' and a.kode_lokasi=b.kode_lokasi "+
						"where a.no_bukti = '"+this.e_nb.getText()+"' and a.kode_lokasi='"+this.app._lokasi+"' "+
						"union "+

						"select a.no_bukti,a.nik,'TRANS',a.kode_lokasi,b.kode_akun,a.periode,a.trans,b.dc "+
						"from hr_gaji_proses a inner join hr_gaji_param b on b.kode_param = 'TRANS' and a.kode_lokasi=b.kode_lokasi "+
						"where a.no_bukti = '"+this.e_nb.getText()+"' and a.kode_lokasi='"+this.app._lokasi+"' "+
						"union "+

						"select a.no_bukti,a.nik,'KONS',a.kode_lokasi,b.kode_akun,a.periode,a.konsumsi,b.dc "+
						"from hr_gaji_proses a inner join hr_gaji_param b on b.kode_param = 'KONS' and a.kode_lokasi=b.kode_lokasi "+
						"where a.no_bukti = '"+this.e_nb.getText()+"' and a.kode_lokasi='"+this.app._lokasi+"' "+
						"union "+

						"select a.no_bukti,a.nik,'ABSEN',a.kode_lokasi,b.kode_akun,a.periode,a.alpa,b.dc "+
						"from hr_gaji_proses a inner join hr_gaji_param b on b.kode_param = 'ABSEN' and a.kode_lokasi=b.kode_lokasi "+
						"where a.no_bukti = '"+this.e_nb.getText()+"' and a.kode_lokasi='"+this.app._lokasi+"' "+
						"union "+

						"select a.no_bukti,a.nik,'IJHT',a.kode_lokasi,b.kode_akun,a.periode,a.ijht,b.dc "+
						"from hr_gaji_proses a inner join hr_gaji_param b on b.kode_param = 'IJHT' and a.kode_lokasi=b.kode_lokasi "+
						"where a.no_bukti = '"+this.e_nb.getText()+"' and a.kode_lokasi='"+this.app._lokasi+"' "+
						"union "+

						"select a.no_bukti,a.nik,'BPJS',a.kode_lokasi,b.kode_akun,a.periode,a.bpjs,b.dc "+
						"from hr_gaji_proses a inner join hr_gaji_param b on b.kode_param = 'BPJS' and a.kode_lokasi=b.kode_lokasi "+
						"where a.no_bukti = '"+this.e_nb.getText()+"' and a.kode_lokasi='"+this.app._lokasi+"' "+
						"union "+

						"select a.no_bukti,a.nik,'JP',a.kode_lokasi,b.kode_akun,a.periode,a.jp,b.dc "+
						"from hr_gaji_proses a inner join hr_gaji_param b on b.kode_param = 'JP' and a.kode_lokasi=b.kode_lokasi "+
						"where a.no_bukti = '"+this.e_nb.getText()+"' and a.kode_lokasi='"+this.app._lokasi+"' "+
						"union "+

						"select a.no_bukti,a.nik,'LBR',a.kode_lokasi,b.kode_akun,a.periode,a.lembur,b.dc "+
						"from hr_gaji_proses a inner join hr_gaji_param b on b.kode_param = 'LBR' and a.kode_lokasi=b.kode_lokasi "+
						"where a.no_bukti = '"+this.e_nb.getText()+"' and a.kode_lokasi='"+this.app._lokasi+"' "+
						"union "+

						"select a.no_bukti,a.nik,'INV',a.kode_lokasi,b.kode_akun,a.periode,a.inval,b.dc "+
						"from hr_gaji_proses a inner join hr_gaji_param b on b.kode_param = 'INV' and a.kode_lokasi=b.kode_lokasi "+
						"where a.no_bukti = '"+this.e_nb.getText()+"' and a.kode_lokasi='"+this.app._lokasi+"' "+
						"union "+

						"select a.no_bukti,a.nik,'MTAP',a.kode_lokasi,b.kode_akun,a.periode,a.mantap,b.dc "+
						"from hr_gaji_proses a inner join hr_gaji_param b on b.kode_param = 'MTAP' and a.kode_lokasi=b.kode_lokasi "+
						"where a.no_bukti = '"+this.e_nb.getText()+"' and a.kode_lokasi='"+this.app._lokasi+"' "+
						"union "+

						"select a.no_bukti,a.nik,'RMED',a.kode_lokasi,b.kode_akun,a.periode,a.remed,b.dc "+
						"from hr_gaji_proses a inner join hr_gaji_param b on b.kode_param = 'RMED' and a.kode_lokasi=b.kode_lokasi "+
						"where a.no_bukti = '"+this.e_nb.getText()+"' and a.kode_lokasi='"+this.app._lokasi+"' "+
						"union "+

						"select a.no_bukti,a.nik,'EKS',a.kode_lokasi,b.kode_akun,a.periode,a.ekskul,b.dc "+
						"from hr_gaji_proses a inner join hr_gaji_param b on b.kode_param = 'EKS' and a.kode_lokasi=b.kode_lokasi "+
						"where a.no_bukti = '"+this.e_nb.getText()+"' and a.kode_lokasi='"+this.app._lokasi+"' "+
						"union "+

						"select a.no_bukti,a.nik,'PJK',a.kode_lokasi,b.kode_akun,a.periode,a.pajak,b.dc "+
						"from hr_gaji_proses a inner join hr_gaji_param b on b.kode_param = 'PJK' and a.kode_lokasi=b.kode_lokasi "+
						"where a.no_bukti = '"+this.e_nb.getText()+"' and a.kode_lokasi='"+this.app._lokasi+"' "+
						"union "+

						"select a.no_bukti,a.nik,'POT',a.kode_lokasi,b.kode_akun,a.periode,a.pot,b.dc "+
						"from hr_gaji_proses a inner join hr_gaji_param b on b.kode_param = 'POT' and a.kode_lokasi=b.kode_lokasi "+
						"where a.no_bukti = '"+this.e_nb.getText()+"' and a.kode_lokasi='"+this.app._lokasi+"' "+
						"union "+

						"select a.no_bukti,a.nik,'BANK',a.kode_lokasi,b.kode_akun,a.periode,a.bbank,b.dc "+
						"from hr_gaji_proses a inner join hr_gaji_param b on b.kode_param = 'BANK' and a.kode_lokasi=b.kode_lokasi "+
						"where a.no_bukti = '"+this.e_nb.getText()+"' and a.kode_lokasi='"+this.app._lokasi+"' ");

					sql.add("insert into hr_gaji_j(no_gaji,no_dokumen,tanggal,no_urut,kode_akun,keterangan,dc,nilai,kode_pp,kode_drk,kode_lokasi,modul,jenis,periode,kode_curr,kurs,nik_user,tgl_input) "+
							"select '"+this.e_nb.getText()+"','-','"+this.dp_d1.getDateString()+"',0,a.kode_akun,'"+this.e_ket.getText()+"',a.dc,sum(a.nilai),c.kode_pp,'-','"+this.app._lokasi+"','GAJI','BEBAN','"+this.e_periode.getText()+"','IDR',1,'"+this.app._userLog+"',getdate() "+
							"from hr_gaji_d a inner join hr_karyawan b on a.nik=b.nik and a.kode_lokasi=b.kode_lokasi "+
							" 				  inner join hr_unit c on b.kode_unit=c.kode_unit and c.kode_lokasi=b.kode_lokasi "+							
							"where a.no_gaji='"+this.e_nb.getText()+"' and a.kode_lokasi='"+this.app._lokasi+"' group by a.kode_akun,c.kode_pp,a.dc");												
					sql.add("insert into hr_gaji_j(no_gaji,no_dokumen,tanggal,no_urut,kode_akun,keterangan,dc,nilai,kode_pp,kode_drk,kode_lokasi,modul,jenis,periode,kode_curr,kurs,nik_user,tgl_input) "+
							"select '"+this.e_nb.getText()+"','-','"+this.dp_d1.getDateString()+"',1,kode_akun,'"+this.e_ket.getText()+"','C',sum(case dc when 'D' then nilai else -nilai end),'"+this.app._kodePP+"','-','"+this.app._lokasi+"','GAJI','HUTANG','"+this.e_periode.getText()+"','IDR',1,'"+this.app._userLog+"',getdate() "+
							"from hr_gaji_d where no_gaji='"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"' group by kode_akun,dc");
					
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
					sql.add("delete from hr_gaji_input where no_bukti='"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
					sql.add("delete from hr_gaji_proses where no_bukti='"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
					sql.add("delete from hr_gaji_m where no_gaji='"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
					sql.add("delete from hr_gaji_d where no_gaji='"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
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
				if (modalResult == mrOk) {
					this.standarLib.clearByTag(this, new Array("0","1"),undefined);
					this.sg.clear(1);
					this.sg4.clear(1);
					this.sg2.clear(1);
					setTipeButton(tbAllFalse);
					this.pc1.setActivePage(this.pc1.childPage[0]);
					this.pc2.setActivePage(this.pc2.childPage[0]);
					this.doLoad();
				}
				break;
			case "simpan" :	
				this.stsSimpan = 1;
				this.simpan();
				break;				
			case "simpancek" : this.simpan();			
				break;
			case "hapus" :	
				this.hapus();
				break;				
		}
	},
	doChange: function(sender){
		try{
			
		}catch(e){
			systemAPI.alert(e);
		}
	},	
	doSelectDate: function(sender, y,m,d){
		if (m < 10) m = "0" + m;			
		this.e_periode.setText(y+""+m);	
		if (this.stsSimpan == 1) this.doClick(this.i_gen);
	},
	doClick:function(sender){
		if (sender == this.i_gen) {			
			if (this.stsSimpan == 0) {									
				this.sg.clear(1);this.sg4.clear(1);
				this.e_nilai.setText("0");
				this.bTampil.show();	
				this.sg.show();
				this.sg4.show();
				this.sg2.show();			
			}	
			this.e_nb.setText(this.standarLib.noBuktiOtomatis(this.dbLib,"hr_gaji_m","no_gaji",this.app._lokasi+"-GJ"+this.e_periode.getText().substr(2,4)+".","0000"));
			this.e_ket.setFocus();
			setTipeButton(tbSimpan);
			this.stsSimpan = 1;
		}		
	},	
	doRequestReady: function(sender, methodName, result){
		if (sender == this.dbLib){
			try{   
				switch(methodName){
	    			case "execArraySQL" :	    				
						if (result.toLowerCase().search("error") == -1)	{						
							if (this.stsSimpan != 2) {
								this.app._mainForm.pesan(2,"transaksi telah sukses tereksekusi");							
								this.app._mainForm.bClear.click();
							}
						}else system.info(this,result,"");
	    			break;	      		
	    		}    		
			}
			catch(e){
				systemAPI.alert("step : "+step+"; error = "+e);
			}
	    }
	},
	doDoubleClick3: function(sender, col , row) {
		try{
			if (this.sg1.cells(0,row) != "") {			
				setTipeButton(tbHapus);
				this.bProses.hide();
				this.sg.hide();
				this.sg4.hide();
				this.sg2.hide();
				this.stsSimpan=0;
				this.pc1.setActivePage(this.pc1.childPage[1]);	
				this.pc2.setActivePage(this.pc2.childPage[0]);		
				this.e_nb.setText(this.sg1.cells(0,row));		
				this.e_ket.setText(this.sg1.cells(1,row));												
				
			}
		} catch(e) {alert(e);}
	},
	doLoad:function(sender){						
		var strSQL = "select no_gaji,convert(varchar,tanggal,103) as tanggal,keterangan "+
		             "from hr_gaji_m where kode_lokasi='"+this.app._lokasi+"' and posted='F' order by no_gaji ";		
		var data = this.dbLib.getDataProvider(strSQL,true);		
		if (typeof data == "object" && data.rs.rows[0] != undefined){
			this.dataJU = data;
			this.sgn1.setTotalPage(Math.ceil(data.rs.rows.length/20));
			this.sgn1.rearrange();
			this.doTampilData(1);
		} else this.sg1.clear(1);			
		this.pc1.setActivePage(this.pc1.childPage[0]);
	},		
	doTampilData: function(page) {		
		this.sg1.clear();
		var line;
		this.page = page;
		var start = (page - 1) * 20;
		var finish = (start + 20 > this.dataJU.rs.rows.length? this.dataJU.rs.rows.length:start+20);
		for (var i=start;i<finish;i++){
			line = this.dataJU.rs.rows[i];													
			this.sg1.appendData([line.no_gaji,line.tanggal,line.keterangan]); 
		}
		this.sg1.setNoUrut(start);
	},
	doPager: function(sender, page) {
		this.doTampilData(page);
	}
});

