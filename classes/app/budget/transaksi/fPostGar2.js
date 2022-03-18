window.app_budget_transaksi_fPostGar2 = function(owner)
{
	if (owner)
	{  
		window.app_budget_transaksi_fPostGar2.prototype.parent.constructor.call(this, owner);
		this.className = "app_budget_transaksi_fPostGar2";
		this.app._mainForm.childFormConfig(this, "mainButtonClick","Posting Data Anggaran : Input - Load", 0);	
		
		this.maximize();		
		uses("portalui_uploader;portalui_datePicker;portalui_saiCBBL;portalui_pageControl;portalui_childPage;util_standar;portalui_saiGrid;portalui_sgNavigator");
		uses("portalui_saiGrid",true);		
		
		this.eTahun = new portalui_saiLabelEdit(this,{bound:[20,22,180,20],tag:2,caption:"Tahun Anggaran",tipeText: ttAngka,maxLength:4,change:[this,"doChange"]});								
		this.ed_nb = new portalui_saiLabelEdit(this,{bound:[20,78,230,20],caption:"No Bukti", readOnly:true});					
		this.bGen = new portalui_button(this,{bound:[256,78,80,20],caption:"Gen",icon:"url(icon/"+system.getThemes()+"/process.png)",click:[this,"doClick"]});		   								
		this.bLoad = new portalui_button(this,{bound:[456,78,80,20],caption:"Ambil Data",click:[this,"doLoad"]});		   								
		this.bUpload = new portalui_uploader(this,{bound:[820,78,100,20],param3:"object",param4:"gridupload",afterUpload:[this,"doAfterUpload"],autoSubmit:true});		
		
		this.p1 = new portalui_panel(this,{bound:[20,189,900,420],caption:"Data Jurnal Anggaran"});
		this.sg1 = new portalui_saiGrid(this.p1,{bound:[0,20,900,370],colCount:18,
				//colFormat:[[3,4,5,6,7,8,9,10,11,12,13,14,15],
				//           [cfNilai,cfNilai,cfNilai,cfNilai,cfNilai,cfNilai,cfNilai,cfNilai,cfNilai,cfNilai,cfNilai,cfNilai,cfNilai]],
				colTitle:["Kode Akun","DC","Nama","Jan","Feb","Mar","Apr","Mei","Jun","Jul","Agu","Sep","Okt","Nov","Des","Total","Kode CF","Kode Bidang"],
				readOnly:true, defaultRow:1
		});		
		this.sgn = new portalui_sgNavigator(this.p1,{bound:[0,395,900,25],buttonStyle:4, grid:this.sg1, pager:[this,"selectPage"]});		
		this.bRefresh = new portalui_imageButton(this.sgn,{bound:[this.sgn.width - 25,2,22,22],image:"icon/"+system.getThemes()+"/reload.png", hint:"Clear",click:[this,"doClick"]});
		this.sgn.uploader.setParam3("object");


		this.p2 = new portalui_panel(this,{bound:[20,200,900,420],caption:"Data Jurnal Anggaran"});
		this.sg2 = new portalui_saiGrid(this.p2,{bound:[0,20,900,370],colCount:18,
				colFormat:[[3,4,5,6,7,8,9,10,11,12,13,14,15],
				           [cfNilai,cfNilai,cfNilai,cfNilai,cfNilai,cfNilai,cfNilai,cfNilai,cfNilai,cfNilai,cfNilai,cfNilai,cfNilai]],
				colTitle:["Kode Akun","DC","Nama","Jan","Feb","Mar","Apr","Mei","Jun","Jul","Agu","Sep","Okt","Nov","Des","Total","Kode CF","Kode Bidang"],
				readOnly:true, defaultRow:1
		});		
		this.sgn = new portalui_sgNavigator(this.p2,{bound:[0,395,900,25],buttonStyle:4, grid:this.sg2, pager:[this,"selectPage"]});		

		
		this.dbLib = new util_dbLib();
		this.dbLib.addListener(this);
		this.standarLib = new util_standar();
		this.rearrangeChild(10,23);
		
		var data = this.dbLib.getDataProvider("select year(getdate()) +1 as tahun ");
		eval("data = "+data+";");
		if (typeof data == "object"){
			var line;
			line = data.rs.rows[0];							
			this.eTahun.setText(line.tahun);
		}
		
		setTipeButton(tbSimpan);				
	}
};
window.app_budget_transaksi_fPostGar2.extend(window.portalui_childForm);
window.app_budget_transaksi_fPostGar2.implement({
	doAfterUpload: function(sender, result, data){		
	    try{   			
			this.dataUpload = data;
			if (result) {								
				this.sg1.clear();				
				this.selectPage(undefined, 1);
				this.sgn.setTotalPage(Math.ceil(this.dataUpload.rows.length / 1000));				
				this.sgn.rearrange();
				this.sgn.activePage = 0;								
			}else throw(data);		
   		}catch(e){
   		   this.sg1.hideLoading();
   		   systemAPI.alert(e,"Proses Berhenti.");
        }
	},
	selectPage: function(sender,page){
		var start = (page - 1) * 1000;
		var finish = start + 1000;
		finish = (finish > this.dataUpload.rows.length ? this.dataUpload.rows.length : finish);
		this.sg1.clear();
		for (var i=start; i < finish;i++){
			line = this.dataUpload.rows[i];
			this.sg1.appendData([
			line.kode_akun, line.dc, line.nama, parseFloat(line.jan), parseFloat(line.feb), parseFloat(line.mar), 
			parseFloat(line.apr), parseFloat(line.mei), parseFloat(line.jun), parseFloat(line.jul), parseFloat(line.agu), 
			parseFloat(line.sep), parseFloat(line.okt), parseFloat(line.nov), parseFloat(line.des),parseFloat(line.total),line.kode_cf,line.kode_bidang]);
		}
		this.sg1.setNoUrut(start);
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
					this.standarLib.clearByTag(this, [0,1],undefined);				
					this.sg1.clear(); this.sg1.appendRow(); 
				}
				break;
			case "simpan" :
					
					try{
						this.ed_nb.setText(this.standarLib.noBuktiOtomatis(this.dbLib,'agg_abaupost_m','no_post',this.app._lokasi+"-POST"+this.eTahun.getText().substr(2,2)+".",'0000'));
						uses("server_util_arrayList");
						var sql = new server_util_arrayList();						
						
						sql.add("delete from agg_abaupost_m where keterangan = 'POST' and periode like '"+this.eTahun.getText()+"%'");
						sql.add("delete from agg_gldt where modul = 'POST' and periode like '"+this.eTahun.getText()+"%'");

						sql.add("insert into agg_abaupost_m(no_post, kode_lokasi, keterangan, tgl_input, nik_user, periode)"+
								"                values('"+this.ed_nb.getText()+"','"+this.app._lokKonsol+"','POST',now(), '"+this.app._userLog+"','"+this.eTahun.getText()+"')");
											 
						var idx=0;
						for (var i=0;i< this.sg1.getRowCount();i++){
							if (this.sg1.rowValid(i)){
								idx++;
								for (var j=1;j< 13;j++){
									var k=j+2;
									if (this.sg1.cells(k,i) != "0") {
										this.periode = this.eTahun.getText() + (j<10?"0":"")+j;
										var tgl = this.eTahun.getText()+"-"+(j<10?"0":"")+j+"-01";
										var nilai = parseFloat(this.sg1.cells(k,i));
										sql.add("insert into agg_gldt(no_bukti,no_urut,kode_lokasi,modul,jenis,no_dokumen,tanggal,kode_akun,dc,nilai,keterangan,kode_pp,periode,kode_drk,kode_curr,kurs,nilai_curr,tgl_input,nik_user,kode_cust,kode_proyek,kode_task,kode_vendor,kode_lokarea,nik,kode_cf) values "+
												"('"+this.ed_nb.getText()+"',"+idx+",'"+this.app._lokKonsol+"','POST','-','-','"+tgl+"','"+this.sg1.cells(0,i)+"','"+this.sg1.cells(1,i)+"',"+nilai+",'"+this.sg1.cells(2,i)+"','"+this.sg1.cells(17,i)+"','"+this.periode+"','-','IDR',1,"+nilai+",now(),'"+this.app._userLog+"','-','-','-','-','-','-','"+this.sg1.cells(16,i)+"')");
									}
								
								}
							}
						}
						
						//KOMA
						sql.add("insert into agg_gldt(no_bukti,no_urut,kode_lokasi,modul,jenis,no_dokumen,tanggal,kode_akun,dc,nilai,keterangan,kode_pp,periode,kode_drk,kode_curr,kurs,nilai_curr,tgl_input,nik_user,kode_cust,kode_proyek,kode_task,kode_vendor,kode_lokarea,nik) "+
								"select '"+this.ed_nb.getText()+"',99,'"+this.app._lokKonsol+"','POST','KOMA','-',substring(periode,1,4)+'-'+substring(periode,5,2)+'-01','5402000002',case when sum(case dc when 'D' then nilai else -nilai end)<0 then 'D' else 'C' end,abs(sum(case dc when 'D' then nilai else -nilai end)),'-','0',periode,'-','IDR',1,abs(sum(case dc when 'D' then nilai else -nilai end)),now(),'"+this.app._userLog+"','-','-','-','-','-','-' "+
								"from agg_gldt where periode like '"+this.eTahun.getText()+"%'  and modul ='POST' group by periode");

						this.dbLib.execArraySQL(sql);
					}catch(e){
						systemAPI.alert(e);
					}
				break;
		}
	},
	doChange: function(sender)	{
		if (sender == this.ePP && this.ePP.getText()!="") {
			this.kodeBidang = this.ePP.dataFromList[2];
		}
	},
	doClick: function(sender){
		if (sender == this.bGen)
			this.ed_nb.setText(this.standarLib.noBuktiOtomatis(this.dbLib,'agg_abaupost_m','no_post',this.app._lokasi+"-POST"+this.eTahun.getText().substr(2,2)+".",'0000'));
		if (sender == this.bRefresh) {			
			this.sg1.clear(1);
		}
	},	
	doLoad: function(sender){
		var data = this.dbLib.getDataProvider(
		"select a.kode_neraca,a.nama, case when substring(a.kode_neraca,1,1) = '3' then 'C' else 'D' end as dc, "+
			"cast(round(isnull(b.jan,0),0) as decimal) as jan, "+
			"cast(round(isnull(c.feb,0),0) as decimal) as feb, "+
			"cast(round(isnull(d.mar,0),0) as decimal) as mar, "+
			"cast(round(isnull(e.apr,0),0) as decimal) as apr, "+
			"cast(round(isnull(f.mei,0),0) as decimal) as mei, "+
			"cast(round(isnull(g.jun,0),0) as decimal) as jun, "+
			"cast(round(isnull(h.jul,0),0) as decimal) as jul, "+
			"cast(round(isnull(i.agu,0),0) as decimal) as agu, "+
			"cast(round(isnull(j.sep,0),0) as decimal) as sep, "+
			"cast(round(isnull(k.okt,0),0) as decimal) as okt, "+
			"cast(round(isnull(l.nov,0),0) as decimal) as nov, "+
			"cast(round(isnull(m.des,0),0) as decimal) as des, "+
			"cast(round(isnull(b.jan,0)+isnull(c.feb,0)+isnull(d.mar,0)+isnull(e.apr,0)+isnull(f.mei,0)+isnull(g.jun,0)+isnull(h.jul,0)+isnull(i.agu,0)+isnull(j.sep,0)+isnull(k.okt,0)+isnull(l.nov,0)+isnull(m.des,0),0) as decimal) as total "+
			"from agg_neracagar a  "+
			"left join  "+
			"( "+
			"select x.kode_neraca,sum(y.nilai) as jan from agg_relakungarinv x inner join agg_d y on x.kode_akun=y.kode_akun and x.kode_lokasi='00' "+
			"where y.tahun = '"+this.eTahun.getText()+"' and y.bulan='01' and substring(y.kode_pp,3,1) <> '4' "+
			"group by x.kode_neraca "+
			") b on a.kode_neraca=b.kode_neraca "+
			"left join  "+
			"( "+
			"select x.kode_neraca,sum(y.nilai) as feb from agg_relakungarinv x inner join agg_d y on x.kode_akun=y.kode_akun and x.kode_lokasi='00' "+
			"where y.tahun = '"+this.eTahun.getText()+"' and y.bulan='02' and substring(y.kode_pp,3,1) <> '4' "+
			"group by x.kode_neraca "+
			") c on a.kode_neraca=c.kode_neraca "+
			"left join  "+
			"( "+
			"select x.kode_neraca,sum(y.nilai) as mar from agg_relakungarinv x inner join agg_d y on x.kode_akun=y.kode_akun and x.kode_lokasi='00' "+
			"where y.tahun = '"+this.eTahun.getText()+"' and y.bulan='03' and substring(y.kode_pp,3,1) <> '4' "+
			"group by x.kode_neraca "+
			") d on a.kode_neraca=d.kode_neraca "+
			"left join  "+
			"( "+
			"select x.kode_neraca,sum(y.nilai) as apr from agg_relakungarinv x inner join agg_d y on x.kode_akun=y.kode_akun and x.kode_lokasi='00' "+
			"where y.tahun = '"+this.eTahun.getText()+"' and y.bulan='04' and substring(y.kode_pp,3,1) <> '4' "+
			"group by x.kode_neraca "+
			") e on a.kode_neraca=e.kode_neraca "+
			"left join  "+
			"( "+
			"select x.kode_neraca,sum(y.nilai) as mei from agg_relakungarinv x inner join agg_d y on x.kode_akun=y.kode_akun and x.kode_lokasi='00' "+
			"where y.tahun = '"+this.eTahun.getText()+"' and y.bulan='05' and substring(y.kode_pp,3,1) <> '4' "+
			"group by x.kode_neraca "+
			") f on a.kode_neraca=f.kode_neraca "+
			"left join  "+
			"( "+
			"select x.kode_neraca,sum(y.nilai) as jun from agg_relakungarinv x inner join agg_d y on x.kode_akun=y.kode_akun and x.kode_lokasi='00' "+
			"where y.tahun = '"+this.eTahun.getText()+"' and y.bulan='06' and substring(y.kode_pp,3,1) <> '4' "+
			"group by x.kode_neraca "+
			") g on a.kode_neraca=g.kode_neraca "+
			"left join "+
			"( "+
			"select x.kode_neraca,sum(y.nilai) as jul from agg_relakungarinv x inner join agg_d y on x.kode_akun=y.kode_akun and x.kode_lokasi='00' "+
			"where y.tahun = '"+this.eTahun.getText()+"' and y.bulan='07' and substring(y.kode_pp,3,1) <> '4' "+
			"group by x.kode_neraca "+
			") h on a.kode_neraca=h.kode_neraca "+
			"left join "+
			"( "+
			"select x.kode_neraca,sum(y.nilai) as agu from agg_relakungarinv x inner join agg_d y on x.kode_akun=y.kode_akun and x.kode_lokasi='00' "+
			"where y.tahun = '"+this.eTahun.getText()+"' and y.bulan='08' and substring(y.kode_pp,3,1) <> '4' "+
			"group by x.kode_neraca "+
			") i on a.kode_neraca=i.kode_neraca "+
			"left join "+
			"( "+
			"select x.kode_neraca,sum(y.nilai) as sep from agg_relakungarinv x inner join agg_d y on x.kode_akun=y.kode_akun and x.kode_lokasi='00' "+
			"where y.tahun = '"+this.eTahun.getText()+"' and y.bulan='09' and substring(y.kode_pp,3,1) <> '4' "+
			"group by x.kode_neraca "+
			") j on a.kode_neraca=j.kode_neraca "+
			"left join  "+
			"( "+
			"select x.kode_neraca,sum(y.nilai) as okt from agg_relakungarinv x inner join agg_d y on x.kode_akun=y.kode_akun and x.kode_lokasi='00' "+
			"where y.tahun = '"+this.eTahun.getText()+"' and y.bulan='10' and substring(y.kode_pp,3,1) <> '4' "+
			"group by x.kode_neraca "+
			") k on a.kode_neraca=k.kode_neraca "+
			"left join  "+
			"( "+
			"select x.kode_neraca,sum(y.nilai) as nov from agg_relakungarinv x inner join agg_d y on x.kode_akun=y.kode_akun and x.kode_lokasi='00' "+
			"where y.tahun = '"+this.eTahun.getText()+"' and y.bulan='11' and substring(y.kode_pp,3,1) <> '4' "+
			"group by x.kode_neraca "+
			") l on a.kode_neraca=l.kode_neraca "+
			"left join "+
			"( "+
			"select x.kode_neraca,sum(y.nilai) as des from agg_relakungarinv x inner join agg_d y on x.kode_akun=y.kode_akun and x.kode_lokasi='00' "+
			"where y.tahun = '"+this.eTahun.getText()+"' and y.bulan='12' and substring(y.kode_pp,3,1) <> '4' "+
			"group by x.kode_neraca "+
			") m on a.kode_neraca=m.kode_neraca "+
			"where a.kode_lokasi= '00' and a.tipe ='posting' "+
			"order by a.rowindex",true);
			
		if (typeof data == "object" && data.rs.rows[0] != undefined){
			var line;
			this.sg2.clear();
			for (var i in data.rs.rows){
				line = data.rs.rows[i];				
				this.sg2.appendData([line.kode_neraca,line.dc.toUpperCase(),line.nama,floatToNilai(line.jan),floatToNilai(line.feb),floatToNilai(line.mar),floatToNilai(line.apr),floatToNilai(line.mei),floatToNilai(line.jun),floatToNilai(line.jul),floatToNilai(line.agu),floatToNilai(line.sep),floatToNilai(line.okt),floatToNilai(line.nov),floatToNilai(line.des),floatToNilai(line.total),'-','0']);
			}
		} else this.sg2.clear();
		//-----------------
		var data = this.dbLib.getDataProvider(
		"select a.kode_neraca,a.nama, case when substring(a.kode_neraca,1,1) = '3' then 'C' else 'D' end as dc, "+
			"cast(round(isnull(b.jan,0),0) as decimal) as jan, "+
			"cast(round(isnull(c.feb,0),0) as decimal) as feb, "+
			"cast(round(isnull(d.mar,0),0) as decimal) as mar, "+
			"cast(round(isnull(e.apr,0),0) as decimal) as apr, "+
			"cast(round(isnull(f.mei,0),0) as decimal) as mei, "+
			"cast(round(isnull(g.jun,0),0) as decimal) as jun, "+
			"cast(round(isnull(h.jul,0),0) as decimal) as jul, "+
			"cast(round(isnull(i.agu,0),0) as decimal) as agu, "+
			"cast(round(isnull(j.sep,0),0) as decimal) as sep, "+
			"cast(round(isnull(k.okt,0),0) as decimal) as okt, "+
			"cast(round(isnull(l.nov,0),0) as decimal) as nov, "+
			"cast(round(isnull(m.des,0),0) as decimal) as des, "+
			"cast(round(isnull(b.jan,0)+isnull(c.feb,0)+isnull(d.mar,0)+isnull(e.apr,0)+isnull(f.mei,0)+isnull(g.jun,0)+isnull(h.jul,0)+isnull(i.agu,0)+isnull(j.sep,0)+isnull(k.okt,0)+isnull(l.nov,0)+isnull(m.des,0),0) as decimal) as total "+
			"from agg_neracagar a  "+
			"left join  "+
			"( "+
			"select x.kode_neraca,sum(y.nilai) as jan from agg_relakungarinv x inner join agg_d y on x.kode_akun=y.kode_akun and x.kode_lokasi='00' "+
			"where y.tahun = '"+this.eTahun.getText()+"' and y.bulan='01' and substring(y.kode_pp,3,1) = '4'  "+ //and y.kode_akun in ('4122080004','4122090004','4122090002','4122090003')
			"group by x.kode_neraca "+
			") b on a.kode_neraca=b.kode_neraca "+
			"left join  "+
			"( "+
			"select x.kode_neraca,sum(y.nilai) as feb from agg_relakungarinv x inner join agg_d y on x.kode_akun=y.kode_akun and x.kode_lokasi='00' "+
			"where y.tahun = '"+this.eTahun.getText()+"' and y.bulan='02' and substring(y.kode_pp,3,1) = '4' "+
			"group by x.kode_neraca "+
			") c on a.kode_neraca=c.kode_neraca "+
			"left join  "+
			"( "+
			"select x.kode_neraca,sum(y.nilai) as mar from agg_relakungarinv x inner join agg_d y on x.kode_akun=y.kode_akun and x.kode_lokasi='00' "+
			"where y.tahun = '"+this.eTahun.getText()+"' and y.bulan='03' and substring(y.kode_pp,3,1) = '4' "+
			"group by x.kode_neraca "+
			") d on a.kode_neraca=d.kode_neraca "+
			"left join  "+
			"( "+
			"select x.kode_neraca,sum(y.nilai) as apr from agg_relakungarinv x inner join agg_d y on x.kode_akun=y.kode_akun and x.kode_lokasi='00' "+
			"where y.tahun = '"+this.eTahun.getText()+"' and y.bulan='04' and substring(y.kode_pp,3,1) = '4' "+
			"group by x.kode_neraca "+
			") e on a.kode_neraca=e.kode_neraca "+
			"left join  "+
			"( "+
			"select x.kode_neraca,sum(y.nilai) as mei from agg_relakungarinv x inner join agg_d y on x.kode_akun=y.kode_akun and x.kode_lokasi='00' "+
			"where y.tahun = '"+this.eTahun.getText()+"' and y.bulan='05' and substring(y.kode_pp,3,1) = '4' "+
			"group by x.kode_neraca "+
			") f on a.kode_neraca=f.kode_neraca "+
			"left join  "+
			"( "+
			"select x.kode_neraca,sum(y.nilai) as jun from agg_relakungarinv x inner join agg_d y on x.kode_akun=y.kode_akun and x.kode_lokasi='00' "+
			"where y.tahun = '"+this.eTahun.getText()+"' and y.bulan='06' and substring(y.kode_pp,3,1) = '4' "+
			"group by x.kode_neraca "+
			") g on a.kode_neraca=g.kode_neraca "+
			"left join "+
			"( "+
			"select x.kode_neraca,sum(y.nilai) as jul from agg_relakungarinv x inner join agg_d y on x.kode_akun=y.kode_akun and x.kode_lokasi='00' "+
			"where y.tahun = '"+this.eTahun.getText()+"' and y.bulan='07' and substring(y.kode_pp,3,1) = '4' "+
			"group by x.kode_neraca "+
			") h on a.kode_neraca=h.kode_neraca "+
			"left join "+
			"( "+
			"select x.kode_neraca,sum(y.nilai) as agu from agg_relakungarinv x inner join agg_d y on x.kode_akun=y.kode_akun and x.kode_lokasi='00' "+
			"where y.tahun = '"+this.eTahun.getText()+"' and y.bulan='08' and substring(y.kode_pp,3,1) = '4' "+
			"group by x.kode_neraca "+
			") i on a.kode_neraca=i.kode_neraca "+
			"left join "+
			"( "+
			"select x.kode_neraca,sum(y.nilai) as sep from agg_relakungarinv x inner join agg_d y on x.kode_akun=y.kode_akun and x.kode_lokasi='00' "+
			"where y.tahun = '"+this.eTahun.getText()+"' and y.bulan='09' and substring(y.kode_pp,3,1) = '4' "+
			"group by x.kode_neraca "+
			") j on a.kode_neraca=j.kode_neraca "+
			"left join  "+
			"( "+
			"select x.kode_neraca,sum(y.nilai) as okt from agg_relakungarinv x inner join agg_d y on x.kode_akun=y.kode_akun and x.kode_lokasi='00' "+
			"where y.tahun = '"+this.eTahun.getText()+"' and y.bulan='10' and substring(y.kode_pp,3,1) = '4' "+
			"group by x.kode_neraca "+
			") k on a.kode_neraca=k.kode_neraca "+
			"left join  "+
			"( "+
			"select x.kode_neraca,sum(y.nilai) as nov from agg_relakungarinv x inner join agg_d y on x.kode_akun=y.kode_akun and x.kode_lokasi='00' "+
			"where y.tahun = '"+this.eTahun.getText()+"' and y.bulan='11' and substring(y.kode_pp,3,1) = '4' "+
			"group by x.kode_neraca "+
			") l on a.kode_neraca=l.kode_neraca "+
			"left join "+
			"( "+
			"select x.kode_neraca,sum(y.nilai) as des from agg_relakungarinv x inner join agg_d y on x.kode_akun=y.kode_akun and x.kode_lokasi='00' "+
			"where y.tahun = '"+this.eTahun.getText()+"' and y.bulan='12' and substring(y.kode_pp,3,1) = '4' "+
			"group by x.kode_neraca "+
			") m on a.kode_neraca=m.kode_neraca "+
			"where a.kode_lokasi= '00' and a.tipe ='posting' "+
			"order by a.rowindex",true);
			
		if (typeof data == "object" && data.rs.rows[0] != undefined){
			var line;
			for (var i in data.rs.rows){
				line = data.rs.rows[i];				
				this.sg2.appendData([line.kode_neraca,line.dc.toUpperCase(),line.nama,floatToNilai(line.jan),floatToNilai(line.feb),floatToNilai(line.mar),floatToNilai(line.apr),floatToNilai(line.mei),floatToNilai(line.jun),floatToNilai(line.jul),floatToNilai(line.agu),floatToNilai(line.sep),floatToNilai(line.okt),floatToNilai(line.nov),floatToNilai(line.des),floatToNilai(line.total),'-','4']);
			}
		} else this.sg2.clear(1);		
	},		
	doRequestReady: function(sender, methodName, result){
		if (sender == this.dbLib){
			switch(methodName){
				case "execArraySQL":
					if (result.toLowerCase().search("error") == -1){
						this.app._mainForm.pesan(2,"Transaksi Sukses ("+ this.ed_nb.getText()+")");
						this.app._mainForm.bClear.click();              
					}else
						system.info(this, result,"");											
				break;
			}
		}		
	}
});
