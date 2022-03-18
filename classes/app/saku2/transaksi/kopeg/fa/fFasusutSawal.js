window.app_saku2_transaksi_kopeg_fa_fFasusutSawal = function(owner)
{
	if (owner)
	{
		window.app_saku2_transaksi_kopeg_fa_fFasusutSawal.prototype.parent.constructor.call(this,owner);
		this.className  = "app_saku2_transaksi_kopeg_fa_fFasusutSawal";
		this.itemsValue = new arrayList();
		this.app._mainForm.childFormConfig(this, "mainButtonClick","Form Penyusutan Aktiva Tetap", 0);	
		
		uses("saiCBBL;saiEdit;datePicker;saiGrid;sgNavigator");
		this.bSusut = new portalui_button(this,{bound:[20,11,80,18],caption:"Execute",click:[this,"doHitung"]});		
	
		this.p1 = new panel(this,{bound:[20,23,840,333],caption:"Data Periode"});
		this.sg = new saiGrid(this.p1,{bound:[1,20,this.p1.width-5,this.p1.height-50],colCount:2,tag:9,
		            colTitle:["Periode","Eksekusi"],
					colWidth:[[1,0],[80,80]],
					readOnly: true,autoAppend:false,defaultRow:1});
		this.sgn = new portalui_sgNavigator(this.p1,{bound:[1,this.p1.height-25,this.p1.width-1,25],buttonStyle:3,grid:this.sg});	
		
		this.rearrangeChild(10, 23);
		
		setTipeButton(tbAllFalse);
		this.maximize();		
		this.setTabChildIndex();
		try {
			this.dbLib = new util_dbLib();
			this.dbLib.addListener(this);
			uses("util_standar");
			this.standarLib = new util_standar();
			var data = this.dbLib.getDataProvider("select periode from fa_periode_susut where periode like '2012%' order by periode",true); //<--- UBAH PERIODE <2012, 2012, 2013
			if (typeof data == "object" && data.rs.rows[0] != undefined){
				var line;
				this.sg.clear();
				for (var i in data.rs.rows){
					line = data.rs.rows[i];							
					this.sg.appendData([line.periode,"-"]);
				}
			} else this.sg.clear(1);
						
		}catch(e){
			systemAPI.alert(e);
		}
	}
};
window.app_saku2_transaksi_kopeg_fa_fFasusutSawal.extend(window.childForm);
window.app_saku2_transaksi_kopeg_fa_fFasusutSawal.implement({
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
			if (this.standarLib.checkEmptyByTag(this, [0,1,2])){
				try{													
					uses("server_util_arrayList");
					var sql = new server_util_arrayList();
					
					
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
					this.standarLib.clearByTag(this, new Array("0","1"),undefined);
					setTipeButton(tbSimpan);
				break;
			case "simpan" :	
				this.simpan();
				break;				
			case "simpancek" : this.simpan();			
				break;				
		}
	},
	doHitung: function(sender){
		for (var i=0;i < this.sg.getRowCount();i++){
			if (this.sg.rowValid(i)   ){    
			  this.sg.cells(1,i,this.sg.cells(0,i));
			  var perNext = nextNPeriode(this.sg.cells(0,i),1);
			  var nb = this.app._lokasi+"-FAS"+this.sg.cells(0,i);  
			  this.dbLib.execQuerySync("call sp_fa_susut_ypt_gl ('"+this.app._lokasi+"','"+this.sg.cells(0,i)+"','"+perNext+"','"+nb+"','-')");	
			}
		}
		alert("selesai...");
	},
	doRequestReady: function(sender, methodName, result){
		if (sender == this.dbLib){
			try{   
				switch(methodName){
	    			case "execArraySQL" :	    				
						if (result.toLowerCase().search("error") == -1){
							system.info(this,"Transaksi telah sukses tersimpan (Periode : "+ this.e_periode.getText()+")","");
							this.app._mainForm.bClear.click();
						}else system.info(this,result,"");
	    			break;
	    		}    		
			}
			catch(e){
				systemAPI.alert("step : "+step+"; error = "+e);
			}
	    }
	}
});

/*
-- balikin penyusutan
update a set a.periode_susut = '201301'
from gl_fa_asset a inner join fasusut_d b on a.no_fa=b.no_fa and a.kode_lokasi=b.kode_lokasi
where b.periode ='201301' and b.kode_lokasi ='02';

delete from fasusut_d where kode_lokasi ='02' and periode = '201301';
delete from fasusut_m where kode_lokasi ='02' and periode = '201301';
delete from fasusut_j where kode_lokasi ='02' and periode = '201301';



-- UBAH NILAI SUSUT GEDUNG 240---> 480
update x set x.nilai_susut = y.nilai_susut
from gl_fa_asset x 
inner join 
(select a.no_fa, a.kode_lokasi,case when (a.umur - isnull(c.jmlsusut,0))>0 then round( (a.nilai - ISNULL(b.susut,0)) / (a.umur - isnull(c.jmlsusut,0))  ,0) else 0 end as nilai_susut
from gl_fa_asset a 
left join (select kode_lokasi,no_fa,SUM(nilai) as susut 
           from fasusut_d where kode_lokasi='02' group by no_fa,kode_lokasi) b on a.no_fa=b.no_fa and a.kode_lokasi=b.kode_lokasi
left join (select kode_lokasi,no_fa,COUNT(*) as jmlsusut
           from fasusut_d where kode_lokasi='02' group by no_fa,kode_lokasi) c on a.no_fa=c.no_fa and a.kode_lokasi=c.kode_lokasi
where a.kode_akun = '1212' and a.kode_lokasi='02') y on x.no_fa=y.no_fa and x.kode_lokasi=y.kode_lokasi
where x.kode_akun = '1212'


--- penyusutan


SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
ALTER PROCEDURE  [dbo].[sp_fa_susut_ypt_gl](@in_kode_lokasi varchar(10),@in_periode varchar(6),@in_periodenext varchar(6),@in_no_bukti varchar(20))
as
begin
  insert into fasusut_d(no_fasusut,no_fa,periode,nilai,kode_lokasi,akun_bp,akun_ap,kode_akun,kode_pp,kode_drk,dc,no_del,nilai_aset,umur)
  
  select @in_no_bukti,a.no_fa,@in_periode,
	case when (a.nilai-a.nilai_residu-isnull(b.tot_susut,0)) > a.nilai_susut 
        then a.nilai_susut 
        else (a.nilai-a.nilai_residu-isnull(b.tot_susut,0)) end as nilai_susut,
        @in_kode_lokasi,c.akun_bp,c.akun_deprs,c.kode_akun,a.kode_pp_susut,c.kode_drk,'D','-',a.nilai,a.umur
  from gl_fa_asset a 
	inner join fa_klpakun c on a.kode_klpakun=c.kode_klpakun and a.kode_lokasi=c.kode_lokasi
	left join 
	(select no_fa,kode_lokasi,sum(case dc when 'D' then nilai else -nilai end) as tot_susut 
         from fasusut_d where kode_lokasi = @in_kode_lokasi 
         group by no_fa,kode_lokasi) b on a.no_fa=b.no_fa and a.kode_lokasi=b.kode_lokasi
  where a.umur <> 0 and a.nilai > 0 and progress = '2' and (a.nilai-a.nilai_residu) > isnull(b.tot_susut,0) and a.kode_lokasi=@in_kode_lokasi and a.periode_susut=@in_periode
  
  union all
  
  select @in_no_bukti,a.no_fa,@in_periode,
	case when (abs(a.nilai)-isnull(abs(b.tot_susut),0)) > abs(a.nilai_susut) 
        then abs(a.nilai_susut) 
        else (abs(a.nilai)-isnull(abs(b.tot_susut),0)) end as nilai_susut,
        @in_kode_lokasi,c.akun_bp,c.akun_deprs,c.kode_akun,a.kode_pp_susut,c.kode_drk,'C','-',a.nilai,a.umur
  from gl_fa_asset a 
	inner join fa_klpakun c on a.kode_klpakun=c.kode_klpakun and a.kode_lokasi=c.kode_lokasi
	left join 
	(select no_fa,kode_lokasi,sum(case dc when 'D' then nilai else -nilai end) as tot_susut 
         from fasusut_d where kode_lokasi = @in_kode_lokasi 
         group by no_fa,kode_lokasi) b on a.no_fa=b.no_fa and a.kode_lokasi=b.kode_lokasi
  where a.umur <> 0 and a.nilai < 0 and progress = '2' and (abs(a.nilai)) > isnull(abs(b.tot_susut),0) and a.kode_lokasi=@in_kode_lokasi and a.periode_susut=@in_periode;
  
  
  update a set periode_susut=@in_periodenext
  from gl_fa_asset a inner join fasusut_d b on a.no_fa=b.no_fa and a.kode_lokasi=b.kode_lokasi
  where b.no_fasusut=@in_no_bukti and b.kode_lokasi=@in_kode_lokasi
end





*/