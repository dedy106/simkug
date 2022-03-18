/**
 * @author dweexfuad
 */
window.app_assetsap_transaksi_fBA = function(owner) {
	if (owner){
		window.app_assetsap_transaksi_fBA.prototype.parent.constructor.call(this,owner);
		this.maximize();
		this.className  = "app_assetsap_transaksi_fBA";		
		this.app._mainForm.childFormConfig(this, "mainButtonClick","Approval Berita Acara Inventarisasi", 0);	
		uses("uploader;saiMemo;util_file;datePicker;uploader;checkBox;server_report_report;reportViewer;util_filterRep;pageControl");
		this.l_tgl = new label(this,{bound:[20,1,100,20],caption:"Tanggal",underline:true});
		this.dp_tgl = new datePicker(this,{bound:[120,1,100,18], selectDate:[this,"doSelectedDate"]});
		this.ed_kode = new saiLabelEdit(this,{bound:[20,2,200,20],caption:"No BA",readOnly:true});
		this.bGen = new button(this,{bound:[230,2,80,20],caption:"Generate",click:"doClick"});
		this.l_tgl = new label(this,{bound:[20,1,100,20],caption:"Tgl. Inv",underline:true});
		this.dp_tgl2 = new datePicker(this,{bound:[120,1,100,18], selectDate:[this,"doSelectedDate"]});		
		this.dp_tgl3 = new datePicker(this,{bound:[230,1,100,18], selectDate:[this,"doSelectedDate"]});		
		this.ed_jenis = new saiCB(this,{bound:[20,3,200,20], caption:"Jenis",items:["TB","NTB"], change:[this,"doChange"]});
		this.ed_lokfa = new saiCBBL(this, {
			bound: [20, 30, 200, 20],
			caption: "Area Bisnis",
			multiSelection: false,
			text:this.app._kodeLokfa,
			rightLabel: this.app._namaLokfa,
			sql:["select kode_lokfa, nama from amu_lokasi where kode_lokasi = '"+this.app._lokasi+"' ", ["kode_lokfa","nama"],false, ["Lokasi","Nama Lokasi"],"and","Data Area Bisnis",true],
			change:[this,"doChange"]
		});		
		this.ed_nik1 = new saiCBBL(this, {
			bound: [20, 3, 200, 20],
			caption: "Pembuat",
			multiSelection: false,
			sql:["select nik, nama from amu_karyawan where kode_lokasi = '"+this.app._lokasi+"' ", ["nik","nama"],false, ["NIK","Nama"],"and","Data Karyawan",true]
		});
		this.ed_nik2 = new saiCBBL(this, {
			bound: [20, 4, 200, 20],
			caption: "Reviewer",
			multiSelection: false,
			sql:["select nik, nama from amu_karyawan where kode_lokasi = '"+this.app._lokasi+"' ", ["nik","nama"],false, ["NIK","Nama"],"and","Data Karyawan",true]
		});							
		/*this.ed_nik3 = new saiCBBL(this, {
			bound: [20, 5, 200, 20],
			caption: "Disetujui",
			multiSelection: false,
			sql:["select nik, nama from amu_karyawan where kode_lokasi = '"+this.app._lokasi+"' ", ["nik","nama"],false, ["NIK","Nama"],"and","Data Karyawan",true]
		});*/					
		this.ed_tempat = new saiLabelEdit(this, {
			bound: [20, 6, 500, 50],
			caption: "Tempat",
			maxLength: 150
		});		
		this.ed_alamat = new saiLabelEdit(this, {
			bound: [20, 7, 500, 50],
			caption: "Alamat",
			maxLength: 150
		});		
		this.ed_ket = new saiMemo(this, {
			bound: [20, 9, 500, 50],
			caption: "Keterangan",
			maxLength: 150
		});
		this.bTampil = new button(this, {
			bound: [540, 9, 80, 20],
			caption: "Tampil",
			click:[this,"doTampil"]
		});
		this.p1 = new pageControl(this,{bound:[20,11,600,230],childPage:["Data Asset","Data Aset Anomali"]});
		this.sg = new saiGrid(this.p1.childPage[0], {
			bound: [1, 20, 596, 180],
			colCount: 4,
			colTitle: ["Kode Status","Nama Status","Jumlah Kartu Asset","Nilai Buku"],
			colWidth: [[3,2,1,0],[120,120,200,100]],
			colReadOnly:[true,[0,1,2,3],[]],			
			rowCount: 1,
			tag: 9,						
			colFormat:[[3],[cfNilai]]			
		});		
		this.sgn = new sgNavigator(this.p1.childPage[0], {
			bound: [1, this.p1.height - 25, 596, 25],
			buttonStyle: 3,
			grid: this.sg,
			pager:[this,"doPager"]
		});		
		
		this.sg2 = new saiGrid(this.p1.childPage[1], {
			bound: [1, 20, 596, 180],
			colCount: 9,
			colTitle: "NKA,SN,Class Aset,Deskripsi,Deskripsi Alamat,Tgl Perolehan,Nilai,Nilai AP, Nilai Buku",
			colWidth: [[8,7,6,5,4,3,2,1,0],[100,100,100,100,150,150,120,50,120]],
			colReadOnly:[true,[0,1,2,3],[]],			
			rowCount: 1,
			tag: 99,						
			colFormat:[[3],[cfNilai]]			
		});		
		this.sgn2 = new sgNavigator(this.p1.childPage[1], {
			bound: [1, this.p1.height - 25, 596, 25],
			buttonStyle: 3,
			grid: this.sg2,
			pager:[this,"doPager"]
		});
		this.rearrangeChild(10,23);			
		this.p1.childPage[1].rearrangeChild(5,23);
		this.p1.childPage[0].rearrangeChild(5,23);
		this.setTabChildIndex();
		this.dbLib = new util_dbLib();
		this.dbLib.addListener(this);
		this.standarLib = new util_standar();
		setTipeButton(tbSimpan);						
		this.onClose.set(this,"doClose");
		this.doClick();
		this.viewer = new reportViewer(this,{bound:[0,0,this.width, this.height],visible:false});
		this.app._mainForm.initReport(this, this.viewer,"doSelectedPage","doCloseReportClick", "doRowPerPageChange", "doPdfClick",true);
		this.report = new server_report_report();
		this.report.addListener(this);
		this.filterRep = new util_filterRep();		
	}
};
window.app_assetsap_transaksi_fBA.extend(window.childForm);
window.app_assetsap_transaksi_fBA.implement({
	doClose: function(sender){				
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
	doModalResult: function(event, result){				
		try{
			if (result != mrOk) return;
			var sql = new server_util_arrayList();			
			switch(event){
				case "clear" :
					if (result == mrOk){
						this.standarLib.clearByTag(this, new Array("0","1","9"),this.ed_kode);		
						this.sg.clear(1);
					}
				break;
				case "simpan" :
					//if (!this.dataSama){ //untuk training
					//	system.alert(this,"Jumlah kartu yg diinput ("+this.dataBanding.kkil+ ")  masih  belum sama dgn jumlah distribusi kartu("+this.dataBanding.dist+ ") .","");
					//	return;
					//}
					if (this.standarLib.checkEmptyByTag(this,[0,1,2])){
						this.doClick();
						//this.ed_nik3.getText()
						sql.add("insert into amu_ba_m (no_ba,kode_lokasi, kode_lokfa, tgl_ba,tgl_inv_mulai, tgl_inv_selesai,  nik_user, tgl_input, keterangan, nik_app1, nik_app2, nik_app3, jenis, periode, jenis_ba, alamat, tempat, progress)"+
							" values('"+this.ed_kode.getText()+"','"+this.app._lokasi+"','"+this.ed_lokfa.getText()+"','"+this.dp_tgl.getDateString()+"','"+this.dp_tgl2.getDateString()+"','"+this.dp_tgl3.getDateString()+"',"+
							" '"+this.app._userLog+"',now(),'"+this.ed_ket.getText()+"','"+this.ed_nik1.getText()+"','"+this.ed_nik2.getText()+"','-' ,'"+this.ed_jenis.getText()+"', '"+this.app._periode+"','KKIL', '"+this.ed_alamat.getText()+"','"+this.ed_tempat.getText()+"','0')");
						var line;
						for (var i=0;i < this.sg.getRowCount();i++){													
							sql.add("insert into amu_ba_d (no_ba, kode_lokasi, kode_status, jml, nilai_buku) "+
								" values('"+this.ed_kode.getText()+"','"+this.app._lokasi+"','"+this.sg.cells(0,i)+"','"+this.sg.cells(2,i)+"','"+parseNilai(this.sg.cells(3,i))+"') ");
						}
						for (var i in this.dataINV.rs.rows){
							line = this.dataINV.rs.rows[i];
							sql.add("insert into amu_ba_inv(no_ba, no_inv, no_gabung, jenis_ba)values('"+this.ed_kode.getText()+"','"+line.no_inv+"','"+line.no_gabung+"','KKIL') ");
						}
						this.dbLib.execArraySQL(sql);
					}
				break;
				case "ubah" :
					
				break;
				case "delete" :
					
				break;
			}			
		}catch(e){
			systemAPI.alert(e);
		}
	},
	doSelectedDate: function(sender, y, m, d){       
    },
	doFindBtnClick: function(sender){		
	},
	doChange: function(sender){
		if (sender == this.ed_lokfa){
			this.sg.clear(1);			
			this.ed_nik1.setSQL("select nik, nama from amu_karyawan where kode_lokasi = '"+this.app._lokasi+"' and  kode_lokfa like '"+(this.app._userStatus == "A" || this.app._userStatus == "U"? sender.getText() : "%")+"' ", ["nik","nama"],false, ["NIK","Nama"],"and","Data Karyawan",true);							
			this.ed_nik2.setSQL("select nik, nama from amu_karyawan where kode_lokasi = '"+this.app._lokasi+"' and  kode_lokfa like '"+(this.app._userStatus == "A" || this.app._userStatus == "U"? sender.getText() : "%")+"' ", ["nik","nama"],false, ["NIK","Nama"],"and","Data Karyawan",true);							
			//this.ed_nik3.setSQL("select nik, nama from amu_karyawan where kode_lokasi = '"+this.app._lokasi+"' and kode_lokfa = '"+sender.getText()+"' ", ["nik","nama"],false, ["NIK","Nama"],"and","Data Karyawan",true);
		}		
		if (sender == this.ed_jenis){
			this.sg.clear(1);
		}
	},
	doClick: function(sender){
		this.ed_kode.setText(this.standarLib.noBuktiOtomatis(this.dbLib,'amu_ba_m','no_ba',"BA.KKL/"+this.dp_tgl.getYear()+"/",'0000'));
	},
	doRequestReady: function(sender, methodName, result){		
		if (sender == this.report){			
			this.allHtml=this.getStringHeader()+loadCSS("server_util_laporan")+result+"</body></html>";
			switch (methodName)
			{
				case "preview" :
					this.viewer.preview(result);			
					this.viewer.hideLoading();
					break;
			}
						
		}
		if (sender == this.dbLib)
		{
			try
			{   				
				switch(methodName)
	    		{
	    			case "execArraySQL" :	    				
						if (result.toLowerCase().search("error") == -1)					
						{							
							this.filter = "where a.no_ba = '"+this.ed_kode.getText()+"' ";
											
							this.filter2 = "";			
							this.pageHtml = new arrayMap();						
							this.page = 1;
							this.pager = 1;
							this.showFilter = false;
							this.lokasi = "";
							this.nama_report = "server_report_amu_rptBAInv";
							this.viewer.setTotalPage(this.report.getTotalPage(this.nama_report,this.filter,1,this.filter2));
							this.app._mainForm.reportNavigator.setTotalPage(this.viewer.getTotalPage());
							this.app._mainForm.reportNavigator.rearrange();
							this.report.preview(this.nama_report,this.filter, 1, this.pager, this.showFilter, this.lokasi,this.filter2);
							this.page = 1;
							this.allBtn = false;			
			
							this.app._mainForm.pesan(2,"transaksi telah sukses tersimpan (ID : "+ this.ed_kode.getText()+")");
							this.app._mainForm.bClear.click();							                                                       
						}else system.info(this,result,"");
	    			break;
	    		}
			}
			catch(e)
			{
				systemAPI.alert("error = "+e,result);
			}
		}else if (sender == this.fileUtil){	        
        }
	},	
	doGridChange: function(sender, col, row,param1,result, data){		
    },
	doTampil: function(sender){
		try {
			var diva = this.ed_lokfa.getText().substr(0,2) == "TD" ||  this.ed_lokfa.getText().substr(0,2) == "TC";
			var TB = this.ed_jenis.getText() == "TB" ? " and a.kode_klpfa like '101%'":" and not a.kode_klpfa like '101%' ";			
			
			var data = this.dbLib.getMultiDataProvider(new server_util_arrayList({items:["select e.kode_status, e.nama, sum(case when f.no_gabung is null then 0 else 1 end) as jml, sum(ifnull(f.nilai_buku,0)) as buku "+
			" from amu_status e "+			
			" left outer join (select distinct b.status_nka as kode_status, a.no_gabung, a.nilai_buku from amu_asset a  "+
			"	inner join amu_lokasi f on f.kode_lokfa = a.kode_lokfa and f.kode_induk = '00' "+
			"	inner join amu_kkl_d b on a.no_gabung = b.no_gabung and b.kode_lokasi = '" +this.app._lokasi +"'" +			
			"	inner join amu_kkl_m c on c.no_inv = b.no_inv and a.kode_lokasi = b.kode_lokasi and c.jenis = '"+this.ed_jenis.getText()+"' " +			
			"	left outer join amu_ba_inv d on d.no_inv = c.no_inv and d.no_gabung = a.no_gabung and d.jenis_ba = 'KKIL'  "+
			"	left outer join amu_ba_m e on e.no_ba = d.no_ba and e.periode = a.periode and e.jenis_ba = 'KKIL' and e.jenis = c.jenis "+
			"	where a.kode_lokfa = '"+this.ed_lokfa.getText()+"' and c.progress = '2' and d.no_gabung is null "+
			" union "+			
			"	select distinct b.status_nka as kode_status, a.no_gabung, a.nilai_buku from amu_asset a  "+
			"	inner join amu_lokasi f on f.kode_lokfa = a.kode_lokfa "+
			"	inner join amu_lokasi g on g.kode_lokfa = f.kode_induk and g.kode_induk = '00' "+
			"	inner join amu_kkl_d b on a.no_gabung = b.no_gabung and b.kode_lokasi = '" +this.app._lokasi +"'" +			
			"	inner join amu_kkl_m c on c.no_inv = b.no_inv and a.kode_lokasi = b.kode_lokasi and c.jenis = '"+this.ed_jenis.getText()+"' " +			
			"	left outer join amu_ba_inv d on d.no_inv = c.no_inv and d.no_gabung = a.no_gabung and d.jenis_ba = 'KKIL'  "+
			"	left outer join amu_ba_m e on e.no_ba = d.no_ba and e.periode = a.periode and e.jenis_ba = 'KKIL' and e.jenis = c.jenis "+
			"	where a.kode_lokfa = '"+this.ed_lokfa.getText()+"' and c.progress = '2' and d.no_gabung is null "+
			" union "+			
			"	select distinct b.status_nka as kode_status, a.no_gabung, a.nilai_buku from amu_asset a  "+
			"	inner join amu_lokasi f on f.kode_lokfa = a.kode_lokfa "+
			"	inner join amu_lokasi g on g.kode_lokfa = f.kode_induk "+
			"	inner join amu_lokasi h on h.kode_lokfa = g.kode_induk and h.kode_induk = '00' "+
			"	inner join amu_kkl_d b on a.no_gabung = b.no_gabung and b.kode_lokasi = '" +this.app._lokasi +"'" +			
			"	inner join amu_kkl_m c on c.no_inv = b.no_inv and a.kode_lokasi = b.kode_lokasi and c.jenis = '"+this.ed_jenis.getText()+"' " +			
			"	left outer join amu_ba_inv d on d.no_inv = c.no_inv and d.no_gabung = a.no_gabung and d.jenis_ba = 'KKIL'  "+
			"	left outer join amu_ba_m e on e.no_ba = d.no_ba and e.periode = a.periode and e.jenis_ba = 'KKIL' and e.jenis = c.jenis "+
			"	where g.kode_lokfa = '"+this.ed_lokfa.getText()+"' and c.progress = '2' and d.no_gabung is null ) f on f.kode_status = e.kode_status "+
			" where e.jenis  = '"+this.ed_jenis.getText()+"' "+
			"group by e.kode_status, e.nama order by e.kode_status ",
			
			" select distinct c.no_inv, b.no_gabung from amu_asset a  "+
			"	inner join amu_kkl_d b on a.no_gabung = b.no_gabung and b.kode_lokasi = '" +this.app._lokasi +"'" +			
			"	inner join amu_kkl_m c on c.no_inv = b.no_inv and a.kode_lokasi = b.kode_lokasi and c.jenis = '"+this.ed_jenis.getText()+"' " +			
			"	left outer join amu_ba_inv d on d.no_inv = c.no_inv and d.no_gabung = a.no_gabung and d.jenis_ba = 'KKIL' "+
			"	left outer join amu_ba_m e on e.no_ba = d.no_ba and e.periode = a.periode and e.jenis_ba = 'KKIL' and e.jenis = c.jenis "+
			"	where a.kode_lokfa = '"+this.ed_lokfa.getText()+"' and c.progress = '2' and d.no_gabung is null",
			
			" select count(*) as total from ( select distinct a.no_gabung, a.nilai_buku from amu_asset a  "+
			"	inner join amu_kkl_d b on a.no_gabung = b.no_gabung and b.kode_lokasi = '" +this.app._lokasi +"'" +			
			"	inner join amu_kkl_m c on c.no_inv = b.no_inv and a.kode_lokasi = b.kode_lokasi and c.jenis = '"+this.ed_jenis.getText()+"' " +			
			"	inner join amu_lokasi f on f.kode_lokfa = a.kode_lokfa and f.kode_induk = '00' "+
			//"	left outer join amu_ba_inv d on d.no_inv = c.no_inv and d.no_gabung = a.no_gabung and d.jenis_ba = 'KKIL'  "+
			//"	left outer join amu_ba_m e on e.no_ba = d.no_ba and e.periode = a.periode and e.jenis_ba = 'KKIL'  and e.jenis = c.jenis "+
			"	where (a.kode_lokfa = '"+this.ed_lokfa.getText()+"' or a.ref1 = '"+(diva ? this.ed_lokfa.getText() :"" )+"' ) and c.progress = '3'  "+ TB +
			" union "+
			" select distinct a.no_gabung, a.nilai_buku from amu_asset a  "+
			"	inner join amu_kkl_d b on a.no_gabung = b.no_gabung and b.kode_lokasi = '" +this.app._lokasi +"'" +			
			"	inner join amu_kkl_m c on c.no_inv = b.no_inv and a.kode_lokasi = b.kode_lokasi and c.jenis = '"+this.ed_jenis.getText()+"' " +			
			"	inner join amu_lokasi f on f.kode_lokfa = a.kode_lokfa  "+
			"	inner join amu_lokasi g on g.kode_lokfa = f.kode_induk and g.kode_induk = '00' "+
			//"	left outer join amu_ba_inv d on d.no_inv = c.no_inv and d.no_gabung = a.no_gabung and d.jenis_ba = 'KKIL'  "+
			//"	left outer join amu_ba_m e on e.no_ba = d.no_ba and e.periode = a.periode and e.jenis_ba = 'KKIL' and e.jenis = c.jenis "+
			"	where a.kode_lokfa = '"+this.ed_lokfa.getText()+"' and c.progress = '2' "+TB +
			" union "+
			" select distinct a.no_gabung, a.nilai_buku from amu_asset a  "+
			"	inner join amu_kkl_d b on a.no_gabung = b.no_gabung and b.kode_lokasi = '" +this.app._lokasi +"'" +			
			"	inner join amu_kkl_m c on c.no_inv = b.no_inv and a.kode_lokasi = b.kode_lokasi and c.jenis = '"+this.ed_jenis.getText()+"' " +			
			"	inner join amu_lokasi f on f.kode_lokfa = a.kode_lokfa  "+
			"	inner join amu_lokasi g on g.kode_lokfa = f.kode_induk  "+
			"	inner join amu_lokasi h on h.kode_lokfa = g.kode_induk and h.kode_induk = '00' "+
			//"	left outer join amu_ba_inv d on d.no_inv = c.no_inv and d.no_gabung = a.no_gabung and d.jenis_ba = 'KKIL'  "+
			//"	left outer join amu_ba_m e on e.no_ba = d.no_ba and e.periode = a.periode and e.jenis_ba = 'KKIL' and e.jenis = c.jenis "+
			"	where g.kode_lokfa = '"+this.ed_lokfa.getText()+"' and c.progress = '2'  " + TB +" ) a  ",
			
			"select count(*) as total from (select a.no_gabung from amu_asset a  "+
			"	inner join (select distinct kode_klpfa, jenis_proc from amu_bagiklp_d ) c on c.kode_klpfa = a.kode_klpfa and c.jenis_proc = 'FISIK' "+
			"	inner join amu_lokasi c on c.kode_lokfa = a.kode_lokfa and c.kode_induk = '00' "+			
			"	where (a.kode_lokfa = '"+this.ed_lokfa.getText()+"' or a.ref1 = '"+(diva ? this.ed_lokfa.getText() : "")+"' )  "+TB +
			" union  "+
			"select a.no_gabung from amu_asset a  "+
			"	inner join (select distinct kode_klpfa, jenis_proc from amu_bagiklp_d ) c on c.kode_klpfa = a.kode_klpfa and c.jenis_proc = 'FISIK' "+
			"	inner join amu_lokasi c on c.kode_lokfa = a.kode_lokfa "+
			"	inner join amu_lokasi d on d.kode_lokfa = c.kode_induk and d.kode_induk = '00' "+
			"	where a.kode_lokfa = '"+this.ed_lokfa.getText()+"' "+TB +
			" union  "+
			"select a.no_gabung from amu_asset a  "+
			"	inner join (select distinct kode_klpfa, jenis_proc from amu_bagiklp_d ) c on c.kode_klpfa = a.kode_klpfa and c.jenis_proc = 'FISIK' "+
			"	inner join amu_lokasi c on c.kode_lokfa = a.kode_lokfa "+
			"	inner join amu_lokasi d on d.kode_lokfa = c.kode_induk "+
			"	inner join amu_lokasi e on e.kode_lokfa = d.kode_induk and e.kode_induk = '00' "+
			"	where d.kode_lokfa = '"+this.ed_lokfa.getText()+"' "+TB +" ) a  ",
			
			"select a.no_gabung, a.no_fa, a.no_sn, a.kode_klpfa, a.kode_lokfa, a.nama, a.nama2, a.tgl,a.nilai, a.nilai_ap, a.nilai_buku,count(kode_status) as tot_status "+
			" from ( select distinct b.kode_status, a.no_gabung, a.no_fa, a.no_sn, a.kode_klpfa, a.kode_lokfa, a.nama, a.nama2, date_format(a.tgl_perolehan,'%d-%m-%Y') as tgl "+
			"	, a.nilai, a.nilai_ap, a.nilai_buku "+
			" from amu_asset a  "+
			"	inner join amu_kkl_d b on a.no_gabung = b.no_gabung and b.kode_lokasi = '" +this.app._lokasi +"'" +			
			"	inner join amu_kkl_m c on c.no_inv = b.no_inv and a.kode_lokasi = b.kode_lokasi and c.jenis = '"+this.ed_jenis.getText()+"' " +			
			"	left outer join amu_ba_inv d on d.no_inv = c.no_inv and d.no_gabung = a.no_gabung and d.jenis_ba = 'KKIL'  "+
			"	left outer join amu_ba_m e on e.no_ba = d.no_ba and e.periode = a.periode and e.jenis_ba = 'KKIL' "+
			"	where a.kode_lokfa = '"+this.ed_lokfa.getText()+"' and c.progress = '2' and d.no_gabung is null) a "+
			"group by a.no_gabung, a.no_fa, a.no_sn, a.kode_klpfa, a.kode_lokfa, a.nama, a.nama2, a.tgl,a.nilai, a.nilai_ap, a.nilai_buku"+
			" having count(kode_status) > 1 "+
			"  order by no_gabung "]}), true);			
			
			this.dataSama  = false;
			this.sg.clear();			
			if (typeof data != "string") {
				var result = data.result;				
				this.dataINV = data.result[1];
				this.doStatusDouble(data.result[4]);
				data = data.result[0];
				var line;
				for (var i in data.rs.rows){
					line = data.rs.rows[i];
					this.sg.appendData([line.kode_status, line.nama, line.jml, floatToNilai(line.buku)]);					
				}
				this.dataBanding = {kkil:result[2].rs.rows[0].total, dist:result[3].rs.rows[0].total};
				if (result[2].rs.rows[0].total != result[3].rs.rows[0].total){
					system.alert(this,"Jumlah kartu yg diinput ("+result[2].rs.rows[0].total+ ")  masih  belum sama dgn jumlah distribusi kartu("+result[3].rs.rows[0].total+ ") .","");									
				}else this.dataSama  = true;
				
				this.sgn.setTotalPage(1);
				this.sgn.rearrange();									
			}
			else 
				systemAPI.alert(data);
		}catch(e){
			alert(e);
			
		}		
	},
	doStatusDouble: function(data){
		this.dataDouble = data;
		var line;
		this.sg2.clear();
		for (var i in data.rs.rows){
			line = data.rs.rows[i];
			this.sg2.appendData([line.no_fa, line.no_sn, line.kode_klpfa, line.kode_lokfa, line.nama, line.nama2, floatToNilai(line.nilai), floatToNilai(line.nilai_ap) , floatToNilai(line.nilai_buku)]);
		}
	},
	doPager: function(sender, page){
		this.doLoadData(page);
	},
	doLoadData: function(page){		
	},
	doSelectedPage: function(sender, page){
		if (this.pageHtml.get(page) === undefined){
			this.dbLib.getDataProviderPageA(this.sql,page,this.pager);
		}else{
			this.viewer.preview(this.pageHtml.get(page));
		}
		this.page = page;
		this.allBtn = false;
		
	},
	doCloseReportClick: function(sender){		
	  switch(sender.getName())
	  {
	    case "allBtn" :
			this.page = 1;
			this.allBtn = true;
			this.viewer.useIframe(this.report.previewWithHeader(this.nama_report,this.filter, this.page, this.viewer.getTotalPage() * this.pager, this.showFilter, this.lokasi,this.filter2));
			break;
	    case "pdfBtn" :
	      this.viewer.useIframe(this.report.createPdf(this.nama_report,this.filter, this.page,this.allBtn ? this.viewer.getTotalPage() * this.pager:this.pager, this.showFilter, this.lokasi,this.filter2));
	      break;
	    case "MailBtn" :
			sender.owner = new ConfirmMail(this);
			sender.owner.setBound((this.width/2)-125,this.height/2-100,250,100);
			sender.owner.setCaption(sender.owner.title);
			sender.owner.setBorder(3);
		break;
	    default :
	        this.viewer.setVisible(false);
	      	this.p1.setVisible(true);
	      	this.app._mainForm.pButton.setVisible(true);
	      	this.app._mainForm.reportNavigator.setVisible(false);  
	      break;
	  
	  }
	},
	doRowPerPageChange: function(sender, rowperpage){
		this.pager = rowperpage;
		this.viewer.setTotalPage(this.report.getTotalPage(this.nama_report,this.filter,this.pager,this.filter2));
		this.app._mainForm.reportNavigator.setTotalPage(this.viewer.getTotalPage());
		this.app._mainForm.reportNavigator.rearrange();
		this.report.preview(this.nama_report,this.filter, 1, this.pager, this.showFilter, this.lokasi,this.filter2);
		this.page = 1;
		this.allBtn = false;
		this.doSelectedPage(undefined, 1);
	}
});
